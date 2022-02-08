import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import {TransactionsService} from './transactions.service';
import {Transaction} from './transaction'
import {Token} from '../token-list/token'
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { endWith } from 'rxjs/operators';

// import {SatDatepickerInputEvent, SatDatepickerRangeValue} from 'saturn-datepicker';

interface Filter {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  displayedColumns = ['id','customerName', 'meterNumber', 'controlNumber', 'billAmount','phoneNumber','gepgReceipt','pspReceipt','paidAmount','token','billedAt', 'actions' 
];

  dataSource: MatTableDataSource<Transaction>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

    minDate: Date;
    maxDate: Date;

  constructor(
    private transactionService: TransactionsService,
    private _formBuilder: FormBuilder,
  ) {
  this.maxDate = new Date();
  }

  meter: any = {};

  filters: Filter[] = [
    {value: '1', viewValue: 'Token'},
    {value: '2', viewValue: 'Meter Number'},
    {value: '3', viewValue: 'PSP Receipt'},
    {value: '4', viewValue: 'Control Number'},
    {value: '5', viewValue: 'Phone Number'}
  ];

  selected = '0';
  filterForm: FormGroup;

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  ngOnInit() {
    this.transactionService.latestTransactions().subscribe(
			(resp) => {
				console.log("Transactions");
				console.log(resp);

				if (resp.status == "TPDCS") {

					this.dataSource = new MatTableDataSource(resp.data as Transaction[]);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

				} else {

          console.log("Unsucessfull request");
          
					// this.notification.error("Unsucessful request");
				}
			},
			(error) => { 
        console.log("error on transaction retrive");
        // this.notification.error("We have experianced an error.") 
      }
		);

    this.filterForm = this._formBuilder.group({
			filterSelect: ['', ''],
			token: ['',''],
            meterNumber: ['',''],
            pspReceipt: ['',''],
            gepgReceipt:['',''],
            controlNumber: ['',''],
            phoneNumber: ['',''],
            startDate:['',[Validators.required]],
            endDate:['',[Validators.required]]
		});
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  forwardToken(meterNumber: string) {
    this.meter.meter = meterNumber;
    console.log("Transaction Meter number ");
    console.log(this.meter);
    

    this.transactionService.forwardToken(this.meter)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));
  }

  filter(value){

    console.log("Form Value: " + JSON.stringify(value));

        this.transactionService.filterTransactions(value)
        .subscribe(
          (resp) => {
            console.log("Filtered Transactions");
            console.log(resp);
    
            if (resp.status == "TPDCS") {
    
              this.dataSource = new MatTableDataSource(resp.data as Transaction[]);
    
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
    
            } else {
    
              console.log("Unsucessfull request");
              
              // this.notification.error("Unsucessful request");
            }
          },
          (error) => { 
            console.log("error on transaction retrive");
            // this.notification.error("We have experianced an error.") 
          }
        );


  }

  clearFilter() {
    this.filterForm.reset();
  }

  getGepgBill(billId: string) {
    console.log("Bill Id");
    console.log(billId);
    

    this.transactionService.getGepgBill(billId)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));

  }
  getGepgPayment(billId: string) {
    console.log("Bill Id");
    console.log(billId);
    

    this.transactionService.getGepgPayment(billId)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));
        
  }

  getBillToken(billId: string) {
    console.log("Bill Id");
    console.log(billId);
    
    this.transactionService.getBillToken(billId)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));
        
  }

}

