// Server-Sent Events (SSE) endpoint für Progress-Updates

// Globaler Store für Progress-Updates
interface ProgressUpdate {
  current: number;
  total: number;
  message: string;
  timestamp: number;
}

const progressStore = new Map<string, ProgressUpdate[]>();

export default defineEventHandler(async event => {
  const operationId = getRouterParam(event, 'operationId');

  if (!operationId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Operation ID erforderlich'
    });
  }

  // SSE-Headers setzen
  setHeader(event, 'Content-Type', 'text/event-stream');
  setHeader(event, 'Cache-Control', 'no-cache');
  setHeader(event, 'Connection', 'keep-alive');
  setHeader(event, 'Access-Control-Allow-Origin', '*');
  setHeader(event, 'Access-Control-Allow-Headers', 'Cache-Control');

  // Initiale Nachricht senden
  const send = (data: string) => {
    return `data: ${data}\n\n`;
  };

  // Verbindung aufbauen
  let response = send('{"type":"connected"}');

  // Bestehende Progress-Updates senden
  const existingUpdates = progressStore.get(operationId) || [];
  for (const update of existingUpdates) {
    response += send(JSON.stringify({ type: 'progress', ...update }));
  }

  // Streaming-Response mit regelmäßigen Updates
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(response));

      const interval = setInterval(() => {
        const updates = progressStore.get(operationId) || [];
        if (updates.length > existingUpdates.length) {
          const newUpdates = updates.slice(existingUpdates.length);
          for (const update of newUpdates) {
            const data = send(JSON.stringify({ type: 'progress', ...update }));
            controller.enqueue(new TextEncoder().encode(data));
            existingUpdates.push(update);
          }
        }
      }, 100); // Alle 100ms prüfen

      // Cleanup nach 5 Minuten
      setTimeout(() => {
        clearInterval(interval);
        progressStore.delete(operationId);
        controller.close();
      }, 5 * 60 * 1000);
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    }
  });
});

// Hilfsfunktion für das Senden von Progress-Updates
export function sendProgressUpdate(
  operationId: string,
  current: number,
  total: number,
  message: string
) {
  const updates = progressStore.get(operationId) || [];
  updates.push({
    current,
    total,
    message,
    timestamp: Date.now()
  });
  progressStore.set(operationId, updates);
}
