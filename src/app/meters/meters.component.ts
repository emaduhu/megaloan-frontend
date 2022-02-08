import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import {MetersService} from './meters.service';
import {Meter} from './meter'
import {Token} from '../token-list/token'
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { endWith } from 'rxjs/operators';

@Component({
  selector: 'app-meters',
  templateUrl: './meters.component.html',
  styleUrls: ['./meters.component.css']
})
export class MetersComponent implements OnInit {

  displayedColumns = ['id', 'metername', 'meterNumber', 'msisdn', 'createdAt', 'actions' ];
  dataSource: MatTableDataSource<Meter>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  minDate: Date;
  maxDate: Date;
  
  constructor(
    private meterService: MetersService,
    private _formBuilder: FormBuilder,
  ) {
    this.maxDate = new Date();
  }
 
  meter: any = {};
  filterForm: FormGroup;

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  ngOnInit() {
    this.meterService.allMeters().subscribe(
			(resp) => {
				console.log("Meters");
				console.log(resp);

				if (resp.status == "TPDCS") {

					this.dataSource = new MatTableDataSource(resp.data as Meter[]);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

				} else {

          console.log("Unsucessfull request");
          
					// this.notification.error("Unsucessful request");
				}
			},
			(error) => { 
        console.log("error on meter retrive");
        // this.notification.error("We have experianced an error.") 
      }
		);

    this.filterForm = this._formBuilder.group({
			      nickName: ['',''],
            meterNumber: ['',''],
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
    console.log("Meter ");
    console.log(this.meter);
    

    this.meterService.forwardToken(this.meter)
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error));
  }

  filter(value){

    console.log("Form Value: " + JSON.stringify(value));

        this.meterService.filterMeters(value)
        .subscribe(
          (resp) => {

            console.log("Filtered Meters");
            console.log(resp);
    
            if (resp.status == "TPDCS") {
    
              this.dataSource = new MatTableDataSource(resp.data as Meter[]);
    
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
    
            } else {
    
              console.log("Unsucessfull request");
              
              // this.notification.error("Unsucessful request");
            }
          },
          (error) => { 
            console.log("error on meter retrive");
            // this.notification.error("We have experianced an error.") 
          }
        );


  }

  clearFilter() {
    this.filterForm.reset();
  }

}

