import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  clickEventSubscription: Subscription;
  orders: Order[] = [];
  order!: Order;
  orderIdx!: number;
  showModalCreate: boolean = false;
  showModal: boolean = false;

  constructor(private ordersService: OrderService) {
    this.clickEventSubscription = this.ordersService.getClickEvent().subscribe(() => {
      this.orders = this.ordersService.orders;
    });
  }

  ngOnInit(): void {
    this.orders = [...this.ordersService.orders];
  }

  editPlaylistHandler(showModal: boolean) {
    this.showModal = showModal;
  }

  editHandler(order: Order, idx: number, showModal: boolean): void {
    this.showModal = showModal;
    this.order = order;
    this.orderIdx = idx;
  }

  setModal():void {
    this.showModalCreate = true;
  }

  closeModal(e: boolean) {
    this.showModal = e;
  }

  closeModalCreate(e: boolean){
    this.showModalCreate = e;
  }

  deleteHandler(idx: number) {
    this.orders = this.orders.filter((_, i) => idx != i);

    this.ordersService.deleteOrder(idx);
  }
}
