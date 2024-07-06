export interface IPayments {
  paymentId: number;
  payerId: number;
  payeeId: number;
  groupId: number;
  amount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
