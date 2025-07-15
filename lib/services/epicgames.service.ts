export namespace EpicGamesService {
  // Die Basis-URL deines Docker/Flask-Backends
  // Für die Produktion sollte dies aus der Nuxt-Konfiguration kommen
  const backendUrl = 'http://localhost:5000';

  export interface EpicGamesAuthData {
    auth_token: string;
    user_id: string;
  }

  export const completeAuth = async (authData: EpicGamesAuthData) => {
    try {
      const data = await $fetch<{ status: string }>(
        `${backendUrl}/auth/complete`,
        {
          method: 'POST',
          body: { auth_token: authData.auth_token, user_id: authData.user_id }
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

  export const checkConfig = async (userId: string) => {
    try {
      const response = await $fetch(`${backendUrl}/auth/status/${userId}`);
      return response;
    } catch (error) {
      console.error('Fehler beim Überprüfen der Konfiguration:', error);
      return false;
    }
  };
}
