export default defineEventHandler(async event => {
  // Lies den Body der eingehenden POST-Anfrage
  const payload = await readBody(event);

  console.log('🎉 Nuxt Webhook empfangen!');
  console.log(payload);

  // Deine Logik zur Verarbeitung des Payloads kommt hier hin...
  // z.B. Benachrichtigung an den Nutzer senden.

  // Sende eine Erfolgsantwort an den Webhook-Absender
  setResponseStatus(event, 200);
  return { received: true };
});
