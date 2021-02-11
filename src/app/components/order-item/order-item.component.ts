import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Item } from 'src/app/models/item';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() item!: Item;
  @Input() length!: number;
  @Input() idx!: number;
  @Input() isLastIdx!: boolean;
  @Output() watchChangedItem = new EventEmitter<any>();
  @Output() removeItemByIndex = new EventEmitter<number>();
  @Output() storeItem = new EventEmitter();

  categories: string[] = [];
  itemList: Item[] = [];

  form!: FormGroup;

  constructor(private orderService: OrderService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.categories = [...this.orderService.categories];
    this.itemList = this.orderService.setItem(this.item.category);

    this.form = this.fb.group({
      category: [this.item.category],
      name: [this.item.name],
      price: [{value: this.item.price, disabled: true}],
    });

    this.form.valueChanges.subscribe(val => {
      this.getPrice(val);
      this.watchChangedItem.emit({ item: val, idx: this.idx });
    });
  }

  getPrice(val: any): void {
    if (this.itemList.length != 0) {
      this.itemList.forEach(item => {
        if (item.name == val.name) {
          this.form.value.price = item.price;
        }
      });
    }
  }

  addItem(): void {
    this.storeItem.emit();
  }

  removeItem(): void {
    this.removeItemByIndex.emit(this.idx);
  }
}
