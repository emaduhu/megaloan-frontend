import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import {ReconciliationService} from './reconciliation.service';
import {Reconciliation} from './reconciliation'
import {Token} from '../token-list/token'
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { endWith } from 'rxjs/operators';

interface Filter {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-reconciliation',
  templateUrl: './reconciliation.component.html',
  styleUrls: ['./reconciliation.component.css']
})
export class ReconciliationComponent implements OnInit {


    minDate: Date;
    maxDate: Date;

  constructor(
    private reconciliationService: ReconciliationService,
    private _formBuilder: FormBuilder,
  ) {
  this.maxDate = new Date();
  }

  reconciliation: any = {};

  selected = '0';
  filterForm: FormGroup;
  dte = new Date();

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  ngOnInit() {

    this.getReconciliation();
    
    this.filterForm = this._formBuilder.group({
            date:['',[Validators.required]]
		});

    this.dte.setDate(this.dte.getDate() - 1);
    console.log("Jana: --> " + this.dte.toString());

  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }


  filter(value){

    console.log("Form Value: " + JSON.stringify(value));

        this.reconciliationService.filterReconciliation(value)
        .subscribe(
          (resp) => {
            console.log("Filtered Reconciliation");
            console.log(resp);
    
            if (resp.status == "TPDCS") {
    
            } else {
    
              console.log("Unsucessfull request");
              
            }
          },
          (error) => { 
            console.log("error on transaction retrive");
          }
        );


  }

  clearFilter() {
    this.filterForm.reset();
  }

  getReconciliation() {
    
    this.reconciliationService.latestReconciliation()
      .subscribe(
        data => {
          this.reconciliation = data.data as Reconciliation;
          console.log(data);
        },
        error => console.log(error));

  }

  requestReconciliationFile( value){
    console.log("Requesting recon file of " + JSON.stringify(value));

    this.reconciliationService.requestReconciliationFile(value)
      .subscribe(
        data => {
          // this.reconciliation = data.data as Reconciliation;
          console.log("Reconciliatio file Data");
          console.log(data);
        },
        error => console.log(error));
  }


}

