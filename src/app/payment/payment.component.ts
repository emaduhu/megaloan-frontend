import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import {PaymentService} from '../payment/payment.service';
import {Meter} from '../meters/meter'
import {Payment} from '../payment/payment'
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import * as QRCode from 'qrcode';
import { PrintService } from './print.service'
import { Bill } from 'app/bill/bill';
import { BillService } from 'app/bill/bill.service';
import { MetersService } from 'app/meters/meters.service';
import { UsersService } from 'app/users/users.service';
import { User } from 'app/users/user';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
		private router: Router,
    private paymentService: PaymentService,
    private printService: PrintService,
    private billService: BillService,
    private usersService: UsersService,
    private metersService: MetersService,
  ) {
  
  }

  payment: any = {};
  bill:Bill;
  user:User;

  ngOnInit() {

    this.getGepgPayment(this.route.snapshot.params['bill_id']);
    // this.getGepgBill(this.route.snapshot.params['bill_id']);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.getUser(currentUser.id);
  
  }

  ngAfterViewInit() {
    
  }

  getGepgPayment(paymentId: string) {

    console.log("Payment Id");
    console.log(paymentId);
    
    this.paymentService.getGepgPayment(paymentId)
      .subscribe(
        data => {
          // this.payment = Object.assign(data.data as Payment);
          this.payment = data.data as Payment;

          console.log(data);
        },
        error => console.log(error));

  }

  printReceipt(paymentId: string) {

    console.log("Print payment Id");
    console.log(paymentId);

    this.paymentService.getGepgPayment(paymentId)
      .subscribe(
        data => {
          // this.bill = Object.assign(data.data as Bill);
          console.log("DATA: " + data.data);

            this.printService.printGePGReceipt(data.data, this.user, this.bill);
        },
        error => console.log(error));
  }

  getGepgBill(billId: string) {

    console.log("Bill Id");
    console.log(billId);

    this.billService.getGepgBill(billId)
      .subscribe(
        data => {
          // this.bill = Object.assign(data.data as Bill);
          this.bill = data.data as Bill;

          console.log(data.data);

        },
        error => console.log(error));

  }

  getUser(id: string) {

    console.log("Id");
    console.log(id);

    this.usersService.getUser(id)
      .subscribe(
        data => {

          console.log("DATA: " + data);

          this.user = data.data as User;

        },
        error => console.log(error));
  }

}

