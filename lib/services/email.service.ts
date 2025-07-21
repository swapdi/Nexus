import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import { PrismaClient } from '~/prisma/client';

const prisma = new PrismaClient();

export interface DealEmailData {
  gameName: string;
  deals: Array<{
    storeName: string;
    price: number;
    originalPrice?: number;
    discountPercent?: number;
    url: string;
  }>;
  userEmail: string;
  userName?: string;
}

export namespace EmailService {
  /**
   * HTML E-Mail-Template aus Datei laden und personalisieren
   * Grund: Professionelles Design verwenden statt Fallback
   */
  async function loadEmailTemplate(emailData: DealEmailData): Promise<string> {
    try {
      const templatePath = join(
        process.cwd(),
        'email-templates',
        'deal-notification.html'
      );
      const templateContent = readFileSync(templatePath, 'utf-8');

      // Template-Variablen ersetzen
      const personalizedContent = templateContent
        .replace(/\{\{\s*\.GameName\s*\}\}/g, emailData.gameName)
        .replace(/\{\{\s*\.UserName\s*\}\}/g, emailData.userName || 'Gamer')
        .replace(
          /\{\{\s*\.SiteUrl\s*\}\}/g,
          process.env.SITE_URL || 'http://localhost:3000'
        )
        .replace(
          /\{\{\s*\.UnsubscribeUrl\s*\}\}/g,
          `${process.env.SITE_URL || 'http://localhost:3000'}/settings`
        )
        .replace(/\{\{\s*\.Deals\s*\}\}/g, generateDealsHtml(emailData.deals))
        .replace(/\{\{\s*\.Year\s*\}\}/g, new Date().getFullYear().toString());

      return personalizedContent;
    } catch (error) {
      console.warn(
        'Konnte E-Mail-Template nicht laden, verwende Fallback:',
        error
      );
      // Fallback zu einfachem HTML
      return generateFallbackEmailContent({
        gameName: emailData.gameName,
        deals: emailData.deals,
        siteUrl: process.env.SITE_URL || 'http://localhost:3000'
      });
    }
  }

  /**
   * HTML für Deals-Liste generieren
   * Grund: Strukturierte Deal-Anzeige im E-Mail-Template
   */
  function generateDealsHtml(deals: DealEmailData['deals']): string {
    return deals
      .map(deal => {
        const priceText =
          deal.price === 0
            ? '<span style="color: #10b981; font-weight: bold;">KOSTENLOS</span>'
            : `<span style="font-size: 24px; font-weight: bold;">${deal.price.toFixed(2)}€</span>`;

        const discountBadge = deal.discountPercent
          ? `<span style="background: #ef4444; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">-${Math.round(deal.discountPercent)}%</span>`
          : '';

        const originalPriceText =
          deal.originalPrice && deal.originalPrice > deal.price
            ? `<span style="text-decoration: line-through; color: #9ca3af; margin-left: 10px;">${deal.originalPrice.toFixed(2)}€</span>`
            : '';

        return `
        <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; margin: 15px 0; border-radius: 12px; border-left: 4px solid #8b5cf6;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
            <div>
              <h3 style="margin: 0; color: #8b5cf6; font-size: 18px;">${deal.storeName}</h3>
              <div style="margin-top: 8px;">
                ${priceText}
                ${originalPriceText}
                ${discountBadge}
              </div>
            </div>
            <div style="margin-top: 10px;">
              <a href="${deal.url}" style="background: linear-gradient(135deg, #8b5cf6, #3b82f6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Deal ansehen
              </a>
            </div>
          </div>
        </div>
      `;
      })
      .join('');
  }

  /**
   * E-Mail über Resend API versenden
   * Grund: Professioneller E-Mail-Versand mit Zustellbarkeit
   */
  async function sendEmailViaResend(
    to: string,
    subject: string,
    htmlContent: string,
    userName?: string
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
   * Deal-Benachrichtigung per E-Mail senden
   * Grund: Reichweite über interne Nachrichten hinaus
   */
  export async function sendDealNotificationEmail(
    emailData: DealEmailData
  ): Promise<boolean> {
    try {
      const { gameName, deals, userEmail, userName } = emailData;

      // E-Mail-Subject erstellen
      const hasFreeGames = deals.some(deal => deal.price === 0);
      const hasDiscounts = deals.some(
        deal => deal.discountPercent && deal.discountPercent > 0
      );

      let subject = `🎮 ${gameName} ist im Angebot!`;

      if (hasFreeGames) {
        subject = `🆓 ${gameName} ist jetzt kostenlos!`;
      } else if (hasDiscounts) {
        const maxDiscount = Math.max(
          ...deals
            .filter(d => d.discountPercent)
            .map(d => d.discountPercent || 0)
        );
        subject = `🔥 ${gameName} mit bis zu ${maxDiscount}% Rabatt!`;
      }

      // Professionelles E-Mail-Template laden
      const htmlContent = await loadEmailTemplate(emailData);

      // Versuche echten E-Mail-Versand mit Resend
      const emailSent = await sendEmailViaResend(
        userEmail,
        subject,
        htmlContent,
        userName
      );

      if (emailSent) {
        console.log(
          `✅ E-Mail an ${userEmail} erfolgreich versendet: "${subject}"`
        );
        return true;
      } else {
        // Fallback: Development-Logging wenn E-Mail-Versand fehlschlägt
        console.log(
          '📧 E-Mail-Versand fehlgeschlagen, nutze Development-Logging:'
        );
        console.log(`An: ${userEmail}`);
        console.log(`Betreff: ${subject}`);
        console.log(`Spiel: ${gameName}`);
        console.log(`Deals: ${deals.length}`);
        return false;
      }
    } catch (error) {
      console.error('Fehler beim Senden der Deal-E-Mail:', error);
      return false;
    }
  }

  /**
   * Fallback-E-Mail-Content als Plain HTML
   * Grund: Sicherstellung dass immer eine E-Mail versendet werden kann
   */
  function generateFallbackEmailContent(data: {
    gameName: string;
    deals: DealEmailData['deals'];
    siteUrl: string;
  }): string {
    const dealsList = data.deals
      .map(deal => {
        const priceText =
          deal.price === 0
            ? 'KOSTENLOS'
            : `${deal.price.toFixed(2)}€${
                deal.discountPercent
                  ? ` (-${Math.round(deal.discountPercent)}%)`
                  : ''
              }`;

        return `• ${deal.storeName}: ${priceText}`;
      })
      .join('\n');

    return `
      <html>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #8b5cf6;">🎮 ${data.gameName} ist im Angebot!</h1>
          
          <p>Hallo!</p>
          <p>Ein Spiel aus deiner Wishlist ist jetzt im Angebot:</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">${data.gameName}</h2>
            <pre style="margin: 0; font-family: Arial, sans-serif;">${dealsList}</pre>
          </div>
          
          <p>
            <a href="${data.siteUrl}/wishlist" style="background: #8b5cf6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Zur Wishlist
            </a>
          </p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 12px;">
            Du erhältst diese E-Mail, weil "${data.gameName}" auf deiner Nexus-Wishlist steht.<br>
            <a href="${data.siteUrl}/settings">E-Mail-Benachrichtigungen verwalten</a>
          </p>
        </body>
      </html>
    `;
  }

  /**
   * Benutzer-E-Mail-Präferenzen prüfen
   * Grund: GDPR-Konformität und Benutzerwunsch respektieren
   */
  export async function shouldSendDealEmail(userId: number): Promise<boolean> {
    try {
      // Prüfe Benutzer-Einstellungen (wird später implementiert)
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true // TODO: email_notifications Feld zur DB hinzufügen
        }
      });

      // Standard: E-Mails aktiviert (opt-out Modell)
      // TODO: Implementiere email_notifications Feld in der Datenbank
      return user !== null;
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

      const { data: user, error } =
        await supabase.auth.admin.getUserById(supabaseUid);

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
