export type Order = {
  id: number;
  id_security_detail: number;
  order_ref_no: string;
  order_status: 'Cancelled' | 'Completed' | string;
  transaction_type: 'BUY' | 'SELL' | string;
  order_value: string;
  created_on: string;
  created_by: number;
};
