export interface IExpense {
  expenseId: number;
  groupId: number;
  userId: number;
  amount: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
