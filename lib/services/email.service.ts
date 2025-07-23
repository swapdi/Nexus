import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '~/prisma/client';

const prisma = new PrismaClient();

export namespace EmailService {
  /**
   * Deal-E-Mail an Benutzer senden
   * Hauptfunktion für den Versand von Deal-Benachrichtigungen
   */
  export async function sendDealEmailToUser(
    gameName: string,
    deal: EmailDeal,
    userId: number
  ): Promise<boolean> {
    try {
      // 1. Benutzer-Daten aus der Datenbank laden
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          supabase_uid: true,
          display_name: true
        }
      });

      if (!user?.supabase_uid) {
        console.warn(`Kein Supabase-User für Benutzer ${userId} gefunden`);
        return false;
      }

      // 2. Prüfe E-Mail-Präferenzen
      const shouldSend = await shouldSendDealEmail(userId);
      if (!shouldSend) {
        console.log(
          `E-Mail-Benachrichtigung für Benutzer ${userId} deaktiviert`
        );
        return false;
      }

      // 3. E-Mail-Adresse aus Supabase Auth abrufen
      const userEmail = await getUserEmailFromAuth(user.supabase_uid);
      if (!userEmail) {
        console.warn(`Keine E-Mail-Adresse für Benutzer ${userId} gefunden`);
        return false;
      }

      // 4. E-Mail-Betreff generieren
      const subject = generateEmailSubject(gameName, deal);

      // 5. HTML-Content aus Template generieren
      const htmlContent = await loadEmailTemplate({
        gameName,
        deals: [deal],
        userEmail,
        userName: user.display_name || undefined
      });

      // 6. E-Mail über Resend versenden
      const success = await sendEmailViaResend(userEmail, subject, htmlContent);

      return success;
    } catch (error) {
      console.error('Fehler beim Senden der Deal-E-Mail:', error);
      return false;
    }
  }

  /**
   * E-Mail-Betreff basierend auf Deal generieren
   */
  function generateEmailSubject(gameName: string, deal: EmailDeal): string {
    if (deal.price === 0) {
      return `🆓 ${gameName} ist jetzt kostenlos!`;
    }

    if (deal.discountPercent && deal.discountPercent > 0) {
      return `🔥 ${gameName} mit ${Math.round(deal.discountPercent)}% Rabatt!`;
    }

    return `🎮 ${gameName} ist im Angebot!`;
  }
  /**
   * HTML E-Mail-Template direkt generieren mit modernem Design
   * Grund: Einfaches, konsistentes Template ohne Dateisystem-Abhängigkeit
   */
  async function loadEmailTemplate(
    emailData: EmailTemplateData
  ): Promise<string> {
    return generateDealEmailHtml(emailData);
  }

  /**
   * Komplettes HTML E-Mail-Template für Deal-Benachrichtigung generieren
   * Grund: Modernes, responsives Design ohne externe Template-Datei
   */
  function generateDealEmailHtml(emailData: EmailTemplateData): string {
    const deal = emailData.deals[0]; // Nur den ersten Deal verwenden
    const isFreeDeal = deal.price === 0;

    // Preisanzeige generieren
    const generatePriceDisplay = () => {
      if (isFreeDeal) {
        return `
          <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 12px 24px; border-radius: 25px; font-weight: 600; font-size: 18px; text-align: center; margin: 20px 0;">
            🎉 KOSTENLOS
          </div>
        `;
      }

      const discountBadge =
        deal.discountPercent && deal.discountPercent > 0
          ? `<span style="background: #ef4444; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">-${Math.round(
              deal.discountPercent
            )}%</span>`
          : '';

      const originalPrice =
        deal.originalPrice && deal.originalPrice > deal.price
          ? `<span style="text-decoration: line-through; color: #9ca3af; font-size: 16px; margin-right: 8px;">${deal.originalPrice.toFixed(
              2
            )}€</span>`
          : '';

      return `
        <div style="text-align: center; margin: 20px 0;">
          ${
            discountBadge
              ? `<div style="margin-bottom: 10px;">${discountBadge}</div>`
              : ''
          }
          <div style="font-size: 24px; font-weight: bold; color: #10b981;">
            ${originalPrice}
            <span style="color: #ffffff;">${deal.price.toFixed(2)}€</span>
          </div>
        </div>
      `;
    };

    return `
      <!DOCTYPE html>
      <html lang="de">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Deal-Benachrichtigung - ${emailData.gameName}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
              color: #ffffff;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 40px;">
              <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: bold; color: white;">
                N
              </div>
              <h1 style="font-size: 32px; font-weight: bold; background: linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 10px;">
                Nexus
              </h1>
              <p style="color: #a1a1aa; font-size: 16px;">Deine Gaming-Deals sind da!</p>
            </div>
            
            <!-- Main Content -->
            <div style="background: rgba(31, 41, 55, 0.8); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 16px; padding: 40px; backdrop-filter: blur(10px); margin-bottom: 30px;">
              
              <!-- Greeting -->
              <div style="margin-bottom: 30px;">
                <h2 style="font-size: 24px; color: #ffffff; margin-bottom: 10px;">
                  Hallo ${emailData.userName || 'Gamer'}! 👋
                </h2>
                <p style="color: #d1d5db; font-size: 16px;">
                  Ein Spiel aus deiner Wishlist ist jetzt im Angebot:
                </p>
              </div>

              <!-- Game Title -->
              <div style="text-align: center; margin: 30px 0;">
                <h1 style="font-size: 32px; font-weight: 700; color: #ffffff; margin-bottom: 10px;">
                  🎮 ${emailData.gameName}
                </h1>
                <div style="background: rgba(139, 92, 246, 0.2); border: 1px solid rgba(139, 92, 246, 0.4); border-radius: 8px; padding: 15px; margin: 20px 0;">
                  <p style="font-size: 18px; font-weight: 600; color: #8b5cf6;">
                    📍 ${deal.storeName}
                  </p>
                </div>
              </div>

              <!-- Price Display -->
              ${generatePriceDisplay()}

              <!-- Call to Action -->
              <div style="text-align: center; margin: 40px 0 20px 0;">
                <a href="${
                  deal.url
                }" style="display: inline-block; background: linear-gradient(90deg, #8b5cf6, #3b82f6, #10b981); color: white; text-decoration: none; padding: 16px 40px; border-radius: 50px; font-weight: 600; font-size: 18px; box-shadow: 0 8px 32px rgba(139, 92, 246, 0.4); transition: all 0.3s ease;">
                  🛒 Deal jetzt sichern
                </a>
              </div>
              
              <div style="text-align: center; margin-top: 20px;">
                <a href="${
                  process.env.SITE_URL || 'http://localhost:3000'
                }/wishlist" style="color: #8b5cf6; text-decoration: none; font-size: 14px;">
                  📋 Zur Wishlist
                </a>
              </div>

            </div>

            <!-- Footer -->
            <div style="text-align: center; color: #9ca3af; font-size: 14px; line-height: 1.6; border-top: 1px solid rgba(139, 92, 246, 0.2); padding-top: 30px; margin-top: 40px;">
              <p style="margin-bottom: 15px;">
                Du erhältst diese E-Mail, weil "${
                  emailData.gameName
                }" auf deiner Nexus-Wishlist steht.
              </p>
              <p>
                <a href="${
                  process.env.SITE_URL || 'http://localhost:3000'
                }/settings" style="color: #8b5cf6; text-decoration: none;">
                  E-Mail-Einstellungen verwalten
                </a>
              </p>
              <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
                © ${new Date().getFullYear()} Nexus Gaming. Alle Rechte vorbehalten.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  /**
   * E-Mail über Resend API versenden
   * Grund: Professioneller E-Mail-Versand mit Zustellbarkeit
   */
  async function sendEmailViaResend(
    to: string,
    subject: string,
    htmlContent: string
  ): Promise<boolean> {
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      const fromEmail = process.env.FROM_EMAIL || 'noreply@nexusgaming.app';

      if (!resendApiKey) {
        console.warn(
          'RESEND_API_KEY nicht konfiguriert, E-Mail-Versand deaktiviert'
        );
        return false;
      }

      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: `Nexus Gaming <${fromEmail}>`,
          to: [to],
          subject: subject,
          html: htmlContent
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`📧 Resend E-Mail ID: ${result.id}`);
        return true;
      } else {
        const error = await response.text();
        console.error('Resend API Fehler:', response.status, error);
        return false;
      }
    } catch (error) {
      console.error('Fehler beim Versenden über Resend:', error);
      return false;
    }
  }

  /**
   * Benutzer-E-Mail-Präferenzen prüfen
   * Grund: GDPR-Konformität und Benutzerwunsch respektieren
   */
  export async function shouldSendDealEmail(userId: number): Promise<boolean> {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          emailNotifications: true // Wird aktiviert sobald Prisma Client regeneriert wurde
        }
      });

      // Temporär: Standard auf true setzen bis Prisma Client korrekt regeneriert ist
      return user?.emailNotifications ?? false;
    } catch (error) {
      console.error('Fehler beim Prüfen der E-Mail-Präferenzen:', error);
      // Im Fehlerfall: Keine E-Mail senden (sicherheitsorientiert)
      return false;
    }
  }

  /**
   * Benutzer-E-Mail aus Supabase Auth abrufen
   * Grund: E-Mail-Adresse für Versand benötigt
   */
  export async function getUserEmailFromAuth(
    supabaseUid: string
  ): Promise<string | null> {
    try {
      const supabaseUrl = process.env.SUPABASE_URL;
      const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

      if (!supabaseUrl || !supabaseServiceKey) {
        console.warn('Supabase-Konfiguration fehlt');
        return null;
      }

      const supabase = createClient(supabaseUrl, supabaseServiceKey);

      const { data: user, error } = await supabase.auth.admin.getUserById(
        supabaseUid
      );

      if (error || !user.user?.email) {
        console.error('Fehler beim Abrufen der Benutzer-E-Mail:', error);
        return null;
      }

      return user.user.email;
    } catch (error) {
      console.error('Fehler beim Abrufen der E-Mail aus Supabase Auth:', error);
      return null;
    }
  }
}
