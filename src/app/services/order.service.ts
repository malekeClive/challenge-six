import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Item } from '../models/item';
import { Order } from '../models/order';



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Order[] = [
    {
      totalPrice: 323,
      customerName: 'PewDiePie',
      email: 'PewDiePie@gmail.com',
      items: [
        {
          category: 'CPU',
          name: 'AMD RYZEN 5 3600',
          price: 194
        },
        {
          category: 'Motherboard',
          name: 'MSI PRO Z390-A',
          price: 129
        },
      ]
    },
    {
      totalPrice: 306,
      customerName: 'Filthy Frank',
      email: 'georgemiller@gmail.com',
      items: [
        {
          category: 'Video Card',
          name: 'ZOTAC GeForce GTX 1060',
          price: 209
        },
        {
          category: 'Memory',
          name: 'CORSAIR Vengeance RGB Pro 16GB',
          price: 97
        },
      ]
    },
  ];

  categories: string[] = ['CPU', 'Motherboard', 'Video Card', 'Memory'];

  cpuList: Item[] = [
    { category: 'CPU', name: 'AMD Ryzen 5 2600', price: 117 },
    { category: 'CPU', name: 'Intel Core i5-9600K', price: 229 },
    { category: 'CPU', name: 'AMD RYZEN 5 3600', price: 194 },
  ]

  motherBoardList: Item[] = [
    { category: 'Motherboard', name: 'MSI PRO Z390-A', price: 129 },
    { category: 'Motherboard', name: 'ASUS PRIME B360M-A', price: 84 },
    { category: 'Motherboard', name: 'ASRock B450M PRO4 AM4', price: 79 },
  ]

  videoCardList: Item[] = [
    { category: 'Video Card', name: 'ZOTAC GeForce GTX 1060', price: 209 },
    { category: 'Video Card', name: 'MSI Radeon RX 580', price: 189 },
    { category: 'Video Card', name: 'GIGABYTE GeForce RTX 2070', price: 499 },
  ];

  memoryList: Item[] = [
    { category: 'Memory', name: 'CORSAIR Vengeance RGB Pro 16GB', price: 97 },
    { category: 'Memory', name: 'G.SKILL TridentZ RGB Series 16GB', price: 86 },
    { category: 'Memory', name: 'G.SKILL Ripjaws Series 8GB', price: 42 },
  ];

  private subject = new Subject<any>();

  constructor() { }

  sendClickEvent() {
    this.subject.next();
  }

  storeNewOrder(newOrder:Order) {
    this.orders.push(newOrder);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  setItem(categoryName: string): Item[] {
    let selectedItem: Item[] = []

    switch (categoryName) {
      case 'CPU':
        selectedItem = this.cpuList;
        break;
      case 'Motherboard':
        selectedItem = this.motherBoardList;
        break;
      case 'Video Card':
        selectedItem = this.videoCardList;
        break;
      case 'Memory':
        selectedItem = this.memoryList;
        break;
      default:
        console.log("Oops...");
        break;
    }

    return selectedItem;
  }

  onEditChanges(newOrder: Order, idx: number): void {
    this.orders[idx] = newOrder;
  }

  deleteOrder(idx: number) {
    this.orders = this.orders.filter((_, i) => idx != i);
  }
}
