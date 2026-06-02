export interface Order {
  id: string;
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
  from_districtid: number;
  from_ward_code: string;
  to_districtid: number;
  to_ward_code: string;
  cod_amount: number;
  created_at: string;
  delivered_at: string;
  completed_at: string;
}
