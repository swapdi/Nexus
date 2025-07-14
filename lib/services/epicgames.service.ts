export namespace EpicGamesService {
  // Die Basis-URL deines Docker/Flask-Backends
  // Für die Produktion sollte dies aus der Nuxt-Konfiguration kommen
  const backendUrl = 'http://localhost:5000';

  export interface EpicGamesAuthData {
    activation_url: string;
    activation_code: string;
  }

  export const beginAuth = async () => {
    try {
      const data = await $fetch<{
        activation_url: string;
        activation_code: string;
      }>(`${backendUrl}/auth/begin`);
      return data;
    } catch (error) {
      console.error('Fehler beim Starten der Authentifizierung:', error);
      return null;
    }
  };

  export const completeAuth = async (authToken: string, userId: string) => {
    try {
      const data = await $fetch<{ status: string }>(
        `${backendUrl}/auth/complete`,
        {
          method: 'POST',
          body: { auth_token: authToken, user_id: userId }
        }
      );
      return data;
    } catch (error) {
      console.error('Fehler beim Abschließen der Authentifizierung:', error);
      return null;
    }
  };

  export const getGames = async (userId: string) => {
    try {
      const games = await $fetch<any[]>(`${backendUrl}/games/${userId}`);
      return games;
    } catch (error) {
      console.error('Fehler beim Abrufen der Spiele:', error);
      return [];
    }
  };
}
