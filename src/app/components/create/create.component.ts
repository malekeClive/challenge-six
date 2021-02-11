import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/item';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @Input() showModal!: boolean;
  @Output() closeModal = new EventEmitter<boolean>();

  items: Item[] = [];
  createUserForm!: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrderService) { }

  ngOnInit(): void {
    this.createUserForm = this.fb.group({
      customerName: ['', [
        Validators.required,
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
      ]],
    });

    this.addNewItem();
  }

  addNewItem(): void {
    const newItem = new Item('', '', 0);
    this.items.push(newItem);
  }

  changedItemHandler(data: any): void {
    this.items[data.idx] = data.item;
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

    this.orderService.sendClickEvent();
    this.orderService.storeNewOrder(newOrder);
  }

}
