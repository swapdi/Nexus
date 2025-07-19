<script setup lang="ts">
  import { computed, onMounted } from 'vue';

  const messagesStore = useMessagesStore();

  // Props
  interface Props {
    maxMessages?: number;
    showAll?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    maxMessages: 5,
    showAll: false
  });

  // Computed für angezeigte Nachrichten
  const displayedMessages = computed(() => {
    const messages = messagesStore.sortedMessages;
    return props.showAll ? messages : messages.slice(0, props.maxMessages);
  });

  // Actions
  const handleMarkAsRead = async (messageId: number) => {
    try {
      await messagesStore.markAsRead(messageId);
    } catch (error) {
      console.error('Fehler beim Markieren der Nachricht:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await messagesStore.markAllAsRead();
    } catch (error) {
      console.error('Fehler beim Markieren aller Nachrichten:', error);
    }
  };

  const handleDeleteMessage = async (messageId: number) => {
    try {
      await messagesStore.deleteMessage(messageId);
    } catch (error) {
      console.error('Fehler beim Löschen der Nachricht:', error);
    }
  };

  const formatRelativeTime = (date: string | Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffMs = now.getTime() - messageDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return 'Gerade eben';
    if (diffMinutes < 60) return `vor ${diffMinutes} Min.`;
    if (diffHours < 24) return `vor ${diffHours} Std.`;
    if (diffDays < 7) return `vor ${diffDays} Tag${diffDays === 1 ? '' : 'en'}`;

    return messageDate.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  onMounted(async () => {
    try {
      await messagesStore.loadMessages();
    } catch (error) {
      console.error('Fehler beim Laden der Nachrichten:', error);
    }
  });
</script>

<template>
  <div
    class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
    <!-- Header -->
    <div class="p-6 border-b border-gray-700/50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="p-2 bg-purple-600/20 rounded-lg">
            <Icon name="heroicons:envelope" class="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 class="text-lg font-bold text-white">Nachrichten</h3>
            <p class="text-sm text-gray-400">
              {{ messagesStore.unreadCount }} ungelesen
            </p>
          </div>
        </div>

        <!-- Header Actions -->
        <div class="flex items-center gap-2">
          <button
            v-if="messagesStore.hasUnreadMessages"
            @click="handleMarkAllAsRead"
            class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
            title="Alle als gelesen markieren">
            <Icon name="heroicons:check-circle" class="w-5 h-5" />
          </button>

          <NuxtLink
            to="/messages"
            class="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
            title="Alle Nachrichten anzeigen">
            <Icon name="heroicons:arrow-top-right-on-square" class="w-5 h-5" />
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Messages List -->
    <div class="max-h-96 overflow-y-auto">
      <div
        v-if="displayedMessages.length > 0"
        class="divide-y divide-gray-700/50">
        <div
          v-for="message in displayedMessages"
          :key="message.id"
          class="p-4 hover:bg-gray-700/20 transition-colors duration-200 group"
          :class="{
            'bg-purple-900/10 border-l-2 border-purple-500': !message.isRead
          }">
          <div class="flex items-start gap-3">
            <!-- Sender Avatar/Icon -->
            <div class="flex-shrink-0">
              <div
                v-if="!message.sender"
                class="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Icon name="heroicons:server" class="w-5 h-5 text-white" />
              </div>
              <div
                v-else
                class="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {{
                  message.sender.display_name?.charAt(0).toUpperCase() || 'U'
                }}
              </div>
            </div>

            <!-- Message Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <p class="text-sm font-medium text-white">
                  {{ message.sender?.display_name || 'System' }}
                </p>
                <span class="text-xs text-gray-400">
                  {{ formatRelativeTime(message.createdAt) }}
                </span>
                <div
                  v-if="!message.isRead"
                  class="w-2 h-2 bg-purple-400 rounded-full"></div>
              </div>

              <p class="text-sm text-gray-300 line-clamp-2">
                {{ message.text }}
              </p>

              <!-- Media (if exists) -->
              <div v-if="message.media" class="mt-2">
                <img
                  :src="message.media"
                  alt="Anhang"
                  class="max-w-48 rounded-lg border border-gray-600" />
              </div>
            </div>

            <!-- Actions -->
            <div
              class="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div class="flex items-center gap-1">
                <button
                  v-if="!message.isRead"
                  @click="handleMarkAsRead(message.id)"
                  class="p-1 text-gray-400 hover:text-green-400 transition-colors duration-200"
                  title="Als gelesen markieren">
                  <Icon name="heroicons:check" class="w-4 h-4" />
                </button>

                <button
                  @click="handleDeleteMessage(message.id)"
                  class="p-1 text-gray-400 hover:text-red-400 transition-colors duration-200"
                  title="Nachricht löschen">
                  <Icon name="heroicons:trash" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="p-8 text-center">
        <Icon
          name="heroicons:inbox"
          class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-400">Keine Nachrichten vorhanden</p>
        <p class="text-sm text-gray-500 mt-1">
          Deal-Benachrichtigungen für deine Wishlist werden hier angezeigt.
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div
      v-if="!showAll && messagesStore.messages.length > maxMessages"
      class="p-4 border-t border-gray-700/50">
      <NuxtLink
        to="/messages"
        class="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors duration-200">
        {{ messagesStore.messages.length - maxMessages }} weitere Nachrichten
        anzeigen
        <Icon name="heroicons:arrow-right" class="w-4 h-4" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-clamp: 2;
  }
</style>
