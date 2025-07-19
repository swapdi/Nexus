import { MessagesService } from '~/lib/services/messages.service';

export default defineEventHandler(async event => {
  try {
    // Lies den Body der eingehenden POST-Anfrage
    const payload = await readBody(event);

    console.log('🎉 Webhook empfangen!');
    console.log('Headers:', getHeaders(event));
    console.log('Payload:', payload);

    await handleITADWebhook(payload);

    // Sende eine Erfolgsantwort an den Webhook-Absender
    setResponseStatus(event, 200);
    return {
      received: true,
      timestamp: new Date().toISOString(),
      processed: true
    };
  } catch (error) {
    console.error('❌ Webhook-Verarbeitungsfehler:', error);

    // Sende Fehler-Response
    setResponseStatus(event, 500);
    return {
      received: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    };
  }
});

/**
 * ITAD-Webhook verarbeiten
 */
async function handleITADWebhook(payload: any) {
  try {
    console.log(`🎯 ITAD ${payload.event} für "${payload.game.title}"`);

    switch (payload.event) {
      case 'price_drop':
        await handlePriceDropWebhook(payload);
        break;
      case 'new_deal':
        await handleNewDealWebhook(payload);
        break;
      case 'free_game':
        await handleFreeGameWebhook(payload);
        break;
      default:
        console.log(`⚠️ Unbekannter ITAD-Event: ${payload.event}`);
    }
  } catch (error) {
    console.error('Error handling ITAD webhook:', error);
    throw error;
  }
}

/**
 * Preisverfall-Webhook verarbeiten
 */
async function handlePriceDropWebhook(payload: any) {
  const { game, deal } = payload;

  console.log(`💰 Preisverfall für "${game.title}": ${deal.price_formatted}`);

  // Finde alle Nutzer, die dieses Spiel auf der Wishlist haben
  const usersWithGameInWishlist = await findUsersWithGameInWishlist(game.plain);

  for (const userId of usersWithGameInWishlist) {
    const message = `💰 Preisverfall für "${game.title}"! Jetzt ${deal.price_cut}% günstiger bei ${deal.shop.name} für ${deal.price_formatted} (war ${deal.price_old_formatted})`;

    await MessagesService.createServerMessage(userId, message);
    console.log(`📨 Benachrichtigung an Nutzer ${userId} gesendet`);
  }
}

/**
 * Neuer Deal-Webhook verarbeiten
 */
async function handleNewDealWebhook(payload: any) {
  const { game, deal } = payload;

  console.log(
    `🆕 Neuer Deal für "${game.title}": ${deal.price_formatted} bei ${deal.shop.name}`
  );

  // Ähnlich wie Preisverfall, aber für neue Deals
  const usersWithGameInWishlist = await findUsersWithGameInWishlist(game.plain);

  for (const userId of usersWithGameInWishlist) {
    const message = `🆕 Neuer Deal für "${game.title}"! Jetzt verfügbar bei ${deal.shop.name} für ${deal.price_formatted}`;

    await MessagesService.createServerMessage(userId, message);
    console.log(`📨 Benachrichtigung an Nutzer ${userId} gesendet`);
  }
}

/**
 * Kostenloses Spiel-Webhook verarbeiten
 */
async function handleFreeGameWebhook(payload: any) {
  const { game, deal } = payload;

  console.log(`🎉 Kostenloses Spiel: "${game.title}" bei ${deal.shop.name}`);

  const usersWithGameInWishlist = await findUsersWithGameInWishlist(game.plain);

  for (const userId of usersWithGameInWishlist) {
    const message = `🎉 Großartige Neuigkeiten! "${game.title}" ist jetzt kostenlos bei ${deal.shop.name} verfügbar!`;

    await MessagesService.createServerMessage(userId, message);
    console.log(`📨 Kostenlos-Benachrichtigung an Nutzer ${userId} gesendet`);
  }
}

/**
 * Finde alle Nutzer, die ein bestimmtes Spiel auf der Wishlist haben
 * TODO: Diese Funktion muss noch implementiert werden, je nachdem wie die Wishlist-Daten gespeichert werden
 */
async function findUsersWithGameInWishlist(
  gamePlain: string
): Promise<number[]> {
  try {
    // Hier müsste eine Abfrage zur Wishlist-Tabelle gemacht werden
    // Das hängt davon ab, wie Sie die ITAD plain IDs mit Ihren Game-IDs verknüpfen

    // Für jetzt als Platzhalter:
    console.log(`🔍 Suche Nutzer mit "${gamePlain}" auf der Wishlist...`);

    // TODO: Implementierung der Wishlist-Suche
    // Beispiel-Rückgabe:
    return []; // Keine Nutzer gefunden
  } catch (error) {
    console.error('Error finding users with game in wishlist:', error);
    return [];
  }
}
