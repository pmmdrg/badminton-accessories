export interface Order {
  _id: string;
  userId: string;
  fullname: string;
  totalQuantity: number;
  totalCart: number;
  shippingFee: number;
  totalCartOrder: number;
  address: string;
  phonenumber: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'completed';
  namePayment: string;
  from_district_id: number;
  from_ward_code: string;
  to_district_id: number;
  to_ward_code: string;
  cod_amount: number;
  created_at: string;
  delivered_at: string;
  completed_at: string;
}
