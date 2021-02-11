import { Item } from './item';

export class Order {
  totalPrice: number;
  customerName: string;
  email: string;
  items: Item[];

  constructor(totalPrice: number, customerName: string, email: string, items: Item[]) {
    this.totalPrice = totalPrice;
    this.customerName = customerName;
    this.email = email;
    this.items = items;
  }
}
