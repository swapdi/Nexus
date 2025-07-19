<script setup lang="ts">
  definePageMeta({
    middleware: ['auth'],
    title: 'Nachrichten',
    layout: 'authenticated'
  });

  const messagesStore = useMessagesStore();
  const userStore = useUserStore();

  // Filter und Sortierung
  const filterType = ref<'all' | 'unread' | 'system'>('all');
  const sortOrder = ref<'newest' | 'oldest'>('newest');

  // Computed für gefilterte und sortierte Nachrichten
  const filteredMessages = computed(() => {
    let messages = [...messagesStore.messages];

    // Filter anwenden
    switch (filterType.value) {
      case 'unread':
        messages = messages.filter(m => !m.isRead);
        break;
      case 'system':
        messages = messages.filter(m => !m.sender);
        break;
    }

    // Sortierung anwenden
    messages.sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();
      return sortOrder.value === 'newest' ? bTime - aTime : aTime - bTime;
    });

    return messages;
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

  const formatDateTime = (date: string | Date) => {
    return new Date(date).toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  onMounted(async () => {
    await userStore.init();

    try {
      await messagesStore.loadMessages();
    } catch (error) {
      console.error('Fehler beim Laden der Nachrichten:', error);
    }
  });
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-white">Nachrichten</h1>
        <p class="text-gray-400 mt-1">
          {{ messagesStore.messages.length }}
          {{
            messagesStore.messages.length === 1 ? 'Nachricht' : 'Nachrichten'
          }}, {{ messagesStore.unreadCount }} ungelesen
        </p>
      </div>

      <div class="flex items-center gap-4 mt-4 sm:mt-0">
        <button
          v-if="messagesStore.hasUnreadMessages"
          @click="handleMarkAllAsRead"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2">
          <Icon name="heroicons:check-circle" class="w-4 h-4" />
          Alle als gelesen markieren
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div
      class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Filter Type -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Filter
          </label>
          <select
            v-model="filterType"
            class="w-full px-3 py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200">
            <option value="all">Alle Nachrichten</option>
            <option value="unread">Nur ungelesene</option>
            <option value="system">Nur System-Nachrichten</option>
          </select>
        </div>

        <!-- Sort Order -->
        <div class="flex-1">
          <label class="block text-sm font-medium text-gray-300 mb-2">
            Sortierung
          </label>
          <select
            v-model="sortOrder"
            class="w-full px-3 py-2 bg-gray-900/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200">
            <option value="newest">Neueste zuerst</option>
            <option value="oldest">Älteste zuerst</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Messages List -->
    <div v-if="filteredMessages.length > 0" class="space-y-4">
      <div
        v-for="message in filteredMessages"
        :key="message.id"
        class="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden hover:border-purple-500/30 transition-all duration-300 group"
        :class="{
          'ring-2 ring-purple-500/20 bg-purple-900/10': !message.isRead
        }">
        <div class="p-6">
          <div class="flex items-start gap-4">
            <!-- Sender Avatar/Icon -->
            <div class="flex-shrink-0">
              <div
                v-if="!message.sender"
                class="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Icon name="heroicons:server" class="w-6 h-6 text-white" />
              </div>
              <div
                v-else
                class="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {{
                  message.sender.display_name?.charAt(0).toUpperCase() || 'U'
                }}
              </div>
            </div>

            <!-- Message Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-2">
                <h3 class="text-lg font-semibold text-white">
                  {{ message.sender?.display_name || 'System' }}
                </h3>
                <span class="text-sm text-gray-400">
                  {{ formatDateTime(message.createdAt) }}
                </span>
                <div
                  v-if="!message.isRead"
                  class="px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                  Neu
                </div>
              </div>

              <div class="text-gray-300 whitespace-pre-wrap mb-4">
                {{ message.text }}
              </div>

              <!-- Media (if exists) -->
              <div v-if="message.media" class="mb-4">
                <img
                  :src="message.media"
                  alt="Anhang"
                  class="max-w-md rounded-lg border border-gray-600" />
              </div>
            </div>

            <!-- Actions -->
            <div class="flex-shrink-0">
              <div class="flex items-center gap-2">
                <button
                  v-if="!message.isRead"
                  @click="handleMarkAsRead(message.id)"
                  class="px-3 py-2 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                  title="Als gelesen markieren">
                  <Icon name="heroicons:check" class="w-4 h-4" />
                  Als gelesen markieren
                </button>

                <button
                  @click="handleDeleteMessage(message.id)"
                  class="px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                  title="Nachricht löschen">
                  <Icon name="heroicons:trash" class="w-4 h-4" />
                  Löschen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <div
        class="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-12 max-w-md mx-auto">
        <Icon
          name="heroicons:inbox"
          class="w-16 h-16 text-gray-400 mx-auto mb-6" />
        <h3 class="text-2xl font-bold text-white mb-4">
          {{
            filterType === 'unread'
              ? 'Keine ungelesenen Nachrichten'
              : 'Keine Nachrichten gefunden'
          }}
        </h3>
        <p class="text-gray-400 mb-8">
          {{
            filterType === 'unread'
              ? 'Alle deine Nachrichten wurden gelesen.'
              : 'Nachrichten über neue Deals für deine Wishlist werden hier angezeigt.'
          }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            v-if="filterType !== 'all'"
            @click="filterType = 'all'"
            class="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200">
            Alle Nachrichten anzeigen
          </button>
          <NuxtLink
            to="/wishlist"
            class="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center gap-2">
            <Icon name="heroicons:heart" class="w-5 h-5" />
            Zur Wishlist
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
