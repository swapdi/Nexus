export interface Notification {
  message: string;
  type: NotificationType;
  notifyTime: number;
}
export enum NotificationType {
  Info,
  Success,
  Warning,
  Error
}
export const useNotifyStore = defineStore('notify', () => {
  const notifications = ref<Notification[]>([]);
  const notificationsArchive = ref<Notification[]>([]);
  const notify = (messageOrError: unknown, type: NotificationType) => {
    let message: string = '';
    if (messageOrError instanceof Error) message = messageOrError.message;
    if (typeof messageOrError === 'string') message = messageOrError;
    const notification: Notification = {
      message,
      type,
      notifyTime: Date.now()
    };
    notifications.value.push(notification);
    setTimeout(removeNotification.bind(this), 5000, notification);
  };
  const removeNotification = (notification: Notification) => {
    notifications.value = notifications.value.filter(
      n => n.notifyTime != notification.notifyTime
    );
  };
  return {
    notifications,
    notificationsArchive,
    notify,
    removeNotification
  };
});
