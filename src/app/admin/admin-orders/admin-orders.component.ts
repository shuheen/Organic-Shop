import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from './../../services/order.service';
import { Order } from './../../model/order';
import { Subscription } from 'rxjs/Subscription';
import { DataTableResource } from 'angular5-data-table';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
 
  orders$;
  
  constructor(private orderService: OrderService, private userService: UserService) { }

  async ngOnInit() {
    this.orders$ = this.orderService.getAllOrders();
  }

}
