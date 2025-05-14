<script setup lang="ts">
  import { NotificationType } from '#imports'; // Stellt sicher, dass dieser Import korrekt ist
  import { storeToRefs } from 'pinia';

  const notifyStore = useNotifyStore();
  const { notifications } = storeToRefs(notifyStore);

  interface NotificationVariantStyle {
    iconName: string;
    iconColorClass: string;
    textColorClass: string;
    accentBorderColorClass: string; // Nur die Farbklasse, z.B. 'border-blue-500'
  }

  const getNotificationVariantStyle = (
    type: NotificationType
  ): NotificationVariantStyle => {
    switch (type) {
      case NotificationType.Info:
        return {
          iconName: 'heroicons:information-circle-20-solid',
          iconColorClass: 'text-blue-400',
          textColorClass: 'text-blue-100',
          accentBorderColorClass: 'border-blue-500'
        };
      case NotificationType.Success:
        return {
          iconName: 'heroicons:check-circle-20-solid',
          iconColorClass: 'text-green-400',
          textColorClass: 'text-green-100',
          accentBorderColorClass: 'border-green-500'
        };
      case NotificationType.Warning:
        return {
          iconName: 'heroicons:exclamation-triangle-20-solid',
          iconColorClass: 'text-yellow-400',
          textColorClass: 'text-yellow-100',
          accentBorderColorClass: 'border-yellow-500'
        };
      case NotificationType.Error:
        return {
          iconName: 'heroicons:x-circle-20-solid',
          iconColorClass: 'text-red-400',
          textColorClass: 'text-red-100',
          accentBorderColorClass: 'border-red-500'
        };
      default: // Fallback
        return {
          iconName: 'heroicons:bell-alert-20-solid',
          iconColorClass: 'text-gray-400',
          textColorClass: 'text-gray-100',
          accentBorderColorClass: 'border-gray-500'
        };
    }
  };
</script>

<template>
  <div
    class="fixed top-6 right-6 z-[200] w-full max-w-xs sm:max-w-sm md:max-w-md">
    <transition-group name="toast-notification" tag="div" class="space-y-3">
      <div
        v-for="notification in notifications"
        :key="notification.notifyTime"
        :class="[
          'p-4 rounded-lg shadow-2xl bg-gray-800/80 backdrop-blur-md border border-gray-700/70 relative flex items-start gap-x-3 border-l-4',
          // Die Klasse 'transform transition-all duration-300 ease-in-out' wurde hier entfernt,
          // da die Transition-Group die Animation von transform und opacity übernimmt.
          // Wenn sie für andere Hover-Effekte etc. benötigt wird, kann sie bleiben, sollte aber nicht mit den Leave-Properties kollidieren.
          getNotificationVariantStyle(notification.type).accentBorderColorClass,
          getNotificationVariantStyle(notification.type).textColorClass
        ]"
        role="alert">
        <div class="flex-shrink-0 mt-0.5">
          <Icon
            :name="getNotificationVariantStyle(notification.type).iconName"
            :class="[
              'h-6 w-6',
              getNotificationVariantStyle(notification.type).iconColorClass
            ]"
            aria-hidden="true" />
        </div>
        <div class="flex-grow text-sm font-medium leading-relaxed">
          <span>{{ notification.message }}</span>
        </div>
        <div class="flex-shrink-0 ml-auto -mr-1 -mt-1">
          <button
            @click.prevent="notifyStore.removeNotification(notification)"
            type="button"
            class="inline-flex rounded-md p-1 text-gray-400 hover:text-gray-100 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 transition-colors"
            aria-label="Benachrichtigung schließen">
            <span class="sr-only">Benachrichtigung schließen</span>
            <Icon
              name="heroicons:x-mark-20-solid"
              class="h-5 w-5"
              aria-hidden="true" />
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
  /* Enter Animation */
  .toast-notification-enter-active {
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
  }
  .toast-notification-enter-from {
    opacity: 0;
    transform: translateX(100%);
  }

  .toast-notification-leave-active {
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    position: absolute;
    width: 100%;
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .toast-notification-leave-to {
    opacity: 0;
    transform: translateX(100%) scale(0.95); /* Endzustand: Unsichtbar, nach rechts verschoben und leicht skaliert */
  }

  /* Move Animation für verbleibende Elemente */
  .toast-notification-move {
    transition: transform 0.3s ease-out;
  }
</style>
