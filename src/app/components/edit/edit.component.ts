import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  @Input() order!: Order;
  @Input() orderIdx!: number;
  @Input() showModal!: boolean;
  @Output() closeModal = new EventEmitter<boolean>();
  items: Item[] = [];

  createUserForm!: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrderService) { }

  ngOnInit(): void {
    this.items = [...this.order.items];

    this.createUserForm = this.fb.group({
      customerName: [this.order ? this.order.customerName : '', {validators: [Validators.required]}],
      email: [this.order ? this.order.email : '', {validators: [Validators.required, Validators.email]}],
    });
  }

  changedItemHandler(data: any): void {
    this.items[data.idx] = data.item;
  }

  addNewItem(): void {
    const newItem = new Item('', '', 0);
    this.items.push(newItem);
  }

  removeItem(idx: number): void {
    this.items = this.items.filter((_, i) => idx != i);
  }

  modalHandler(): void {
    this.closeModal.emit(false);
  }

  submitHandler(): void {
    let calculatePrice: number = 0;

    this.items.forEach(item => {
      calculatePrice += item.price
    });

    const newOrder: Order = new Order(calculatePrice, this.createUserForm.value.customerName, this.createUserForm.value.email, this.items);

    this.orderService.onEditChanges(newOrder, this.orderIdx);
    this.orderService.sendClickEvent();
    this.modalHandler();
  }

}
