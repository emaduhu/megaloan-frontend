import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { BillService } from '../bill/bill.service';
import { Meter } from '../meters/meter'
import { Bill } from '../bill/bill'
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import * as QRCode from 'qrcode';
import { PrintService } from './print.service'
import { v4 as uuid } from 'uuid';
import { UsersService } from 'app/users/users.service';
import { MetersService } from 'app/meters/meters.service';
import { User } from 'app/users/user';
import { Settings } from 'app/_models/settings';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private billService: BillService,
    private printService: PrintService,
    private usersService: UsersService,
    private metersService: MetersService,
  ) {

  }

  bill: any = {};

  user: User;
  meter:Meter;
  settings:Settings;

  ngOnInit() {

    this.getGepgBill(this.route.snapshot.params['bill_id']);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.getUser(currentUser.id);
    this.getSettings();
  
  }

  ngAfterViewInit() {

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

          this.getMeter(this.bill.meterNumber);

        },
        error => console.log(error));

  }

  printBill(billId: string) {

    console.log("Print Bill Id");
    console.log(billId);

    this.billService.getGepgBill(billId)
      .subscribe(
        data => {
          // this.bill = Object.assign(data.data as Bill);
          console.log("DATA: " + data.data.controlNumber);

          let qrCodeData: string = '{"opType":"2","shortCode":"001001","billReference":'
            + data.data.controlNumber + ',"amount":'
            + data.data.amount + ',"billCcy":"TZS","billExprDt":'
            + data.data.expireDate + ',"billPayOpt":"'
            + data.data.gepgPayType + '","billRsv01":"' + data.data.payerName + '"}';

          QRCode.toDataURL(qrCodeData).then(url => {
            console.log("url");
            console.log(url);

            this.printService.printGePGGovBill(data.data as Bill, "Tanzania Petroleum Development Corporation", url, this.meter, this.user, this.settings);
          })
            .catch(err => {
              console.log("url error");
              console.error(err);
            });

          console.log("qrCodeData");
          console.log(qrCodeData);

        },
        error => console.log(error));

  }

  cancelBill(billId: string) {

    console.log("Bill Id");
    console.log(billId);

    this.bill.trnxId = uuid();
    this.bill.payTransactionId = billId;

    console.log(this.bill);

    this.billService.cancelGepgBill(this.bill)
      .subscribe(
        data => {

          console.log("DATA: " + data.data.controlNumber);

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

  getMeter(meterNumber: string) {

    console.log("meterNumber");
    console.log(meterNumber);

    this.metersService.getMeter(meterNumber)
      .subscribe(
        data => {

          console.log("DATA: " + data);

          this.meter = data.data as Meter;

          console.log("Meter: " + this.meter.customerName);

        },
        error => console.log(error));

  }

  getSettings() {

    console.log("Settings");

    this.billService.getSettings()
      .subscribe(
        data => {

          console.log("DATA: " + data);

          this.settings = data.data as Settings;

          console.log("Settings: " + this.settings);

        },
        error => console.log(error));

  }

  reActivateBill(billId: string) {

    console.log("Bill Id");
    console.log(billId);

    this.bill.trnxId = uuid();
    this.bill.payTransactionId = billId;

    this.billService.reActivateGepgBill(this.bill)
      .subscribe(
        data => {

          console.log("DATA: " + data.data.controlNumber);

        },
        error => console.log(error));

  }

}

