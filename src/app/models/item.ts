export class Item {
  category: string;
  name: string;
  price: number;

  constructor(category: string, name: string, price: number) {
    this.category = category;
    this.name = name;
    this.price = price;
  }
}
