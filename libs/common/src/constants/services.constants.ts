export const SERVICES = {
  AUTH_SERVICE: 'auth-service',
  API_GATEWAY: 'api-gateway',
  USER_SERVICE: 'user-service',
  EVENT_SERVICE: 'event-service',
  TICKETS_SERVICE: 'tickets-service',
  PAYMENT_SERVICE: 'payment-service',
  NOTIFICATION_SERVICE: 'notification-service',
} as const;

export const SERVICES_PORTS = {
  API_GATEWAY: 3000,
  AUTH_SERVICE: 3001,
  USER_SERVICE: 3002,
  EVENT_SERVICE: 3003,
  TICKETS_SERVICE: 3004,
  PAYMENT_SERVICE: 3005,
  NOTIFICATION_SERVICE: 3006,
} as const;
