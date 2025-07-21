export const useMessagesStore = defineStore('messages', () => {
  const notifyStore = useNotifyStore();
  const { $client } = useNuxtApp();
  const { loading } = useLoading();

  // State
  const messages = ref<FullMessage[]>([]);
  const unreadMessages = ref<FullMessage[]>([]);
  const unreadCount = ref<number>(0);

  // Computed
  const hasUnreadMessages = computed(() => unreadCount.value > 0);
  const sortedMessages = computed(() =>
    [...messages.value].sort((a, b) => {
      // Erst nach Gelesen-Status sortieren (ungelesen zuerst)
      if (a.isRead !== b.isRead) {
        return a.isRead ? 1 : -1;
      }
      // Dann nach Datum sortieren (neuste zuerst)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    })
  );

  // Actions
  const loadMessages = async () => {
    try {
      const result = await $client.messages.getUserMessages.query();
      messages.value = result;
      return result;
    } catch (error) {
      console.error('Error loading messages:', error);
      notifyStore.notify(
        'Fehler beim Laden der Nachrichten. Bitte versuche es später erneut.',
        3
      );
      throw error;
    }
  };

  const loadUnreadCount = async () => {
    try {
      const count = await $client.messages.getUnreadMessageCount.query();
      unreadCount.value = count;
      return count;
    } catch (error) {
      console.error('Error loading unread count:', error);
      // Kein Notify hier, da es im Hintergrund läuft
      throw error;
    }
  };

  const createMessage = async (
    receiverId: number,
    text: string,
    media?: string
  ) => {
    return await loading(
      'create-message',
      'Nachricht wird gesendet...',
      async () => {
        try {
          const message = await $client.messages.createMessage.mutate({
            receiverId,
            text,
            media
          });

          // Nachrichten neu laden
          await loadMessages();
          notifyStore.notify('Nachricht erfolgreich gesendet', 1);
          return message;
        } catch (error) {
          console.error('Error creating message:', error);
          notifyStore.notify('Fehler beim Senden der Nachricht', 3);
          throw error;
        }
      },
      'process'
    );
  };

  const markAsRead = async (messageId: number) => {
    try {
      await $client.messages.markAsRead.mutate({ messageId });

      // Local state aktualisieren
      const message = messages.value.find(m => m.id === messageId);
      if (message) {
        message.isRead = true;
      }

      // Ungelesene Nachrichten neu laden
      await loadUnreadCount();

      return true;
    } catch (error) {
      console.error('Error marking message as read:', error);
      notifyStore.notify('Fehler beim Markieren der Nachricht', 2);
      throw error;
    }
  };

  const markAllAsRead = async () => {
    return await loading(
      'mark-all-read',
      'Nachrichten werden als gelesen markiert...',
      async () => {
        try {
          const result = await $client.messages.markAllAsRead.mutate();

          // Local state aktualisieren
          messages.value.forEach(message => {
            message.isRead = true;
          });
          unreadMessages.value = [];
          unreadCount.value = 0;

          notifyStore.notify(
            `${result.markedCount} Nachrichten als gelesen markiert`,
            1
          );
          return result;
        } catch (error) {
          console.error('Error marking all messages as read:', error);
          notifyStore.notify('Fehler beim Markieren der Nachrichten', 3);
          throw error;
        }
      },
      'process'
    );
  };

  const deleteMessage = async (messageId: number) => {
    return await loading(
      'delete-message',
      'Nachricht wird gelöscht...',
      async () => {
        try {
          await $client.messages.deleteMessage.mutate({ messageId });

          // Aus lokaler Liste entfernen
          messages.value = messages.value.filter(m => m.id !== messageId);
          unreadMessages.value = unreadMessages.value.filter(
            m => m.id !== messageId
          );

          // Ungelesene Anzahl aktualisieren
          await loadUnreadCount();

          notifyStore.notify('Nachricht erfolgreich gelöscht', 1);
          return true;
        } catch (error) {
          console.error('Error deleting message:', error);
          notifyStore.notify('Fehler beim Löschen der Nachricht', 3);
          throw error;
        }
      },
      'process'
    );
  };

  // Automatisches Laden der ungelesenen Anzahl (für Header-Badge)
  const refreshUnreadCount = async () => {
    try {
      await loadUnreadCount();
    } catch (error) {
      // Stille Behandlung für Background-Updates
    }
  };

  const reset = () => {
    messages.value = [];
    unreadMessages.value = [];
    unreadCount.value = 0;
  };

  return {
    // State
    messages,
    unreadMessages,
    unreadCount,

    // Computed
    hasUnreadMessages,
    sortedMessages,

    // Actions
    loadMessages,
    loadUnreadCount,
    createMessage,
    markAsRead,
    markAllAsRead,
    deleteMessage,
    refreshUnreadCount,
    reset
  };
});
