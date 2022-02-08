import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import {MetersService} from '../meters/meters.service';
import {Meter} from '../meters/meter'
import {Token} from '../token-list/token'
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-token-list',
  templateUrl: './token-list.component.html',
  styleUrls: ['./token-list.component.css']
})
export class TokenListComponent implements OnInit {

  displayedColumns = ['id', 'token', 'rechargeVolume', 'sent', 'sentTime', 'createdAt'];

  dataSource: MatTableDataSource<Token>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
		private router: Router,
    private meterService: MetersService,
  ) {
  
  }

  meter: any = {};

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  ngOnInit() {

    this.meter.meter = this.route.snapshot.params['meter'];

    this.meterService.meterTokens(this.meter).subscribe(
			(resp) => {
				console.log("Meters");
				console.log(resp.data);

				if (resp.status == "TPDCS") {

					this.dataSource = new MatTableDataSource(resp.data as Token[]);

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

}

