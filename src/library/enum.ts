export const OrderStatus = {
  Cancelled: 'Cancelled',
  Completed: 'Completed',
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export const TransectionStatus = {
  BUY: 'BUY',
  SELL: 'SELL',
};

export type TransectionStatus =
  (typeof TransectionStatus)[keyof typeof TransectionStatus];
