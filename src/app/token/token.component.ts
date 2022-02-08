import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import {TokenService} from '../token/token.service';
import {Meter} from '../meters/meter'
import {Token} from '../token/token'
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
		private router: Router,
    private tokenService: TokenService,
  ) {

  }

  token: any = {};

  ngOnInit() {

    this.getGepgToken(this.route.snapshot.params['bill_id']);
  }

  ngAfterViewInit() {

  }

  getGepgToken(tokenId: string) {

    console.log("Token Id");
    console.log(tokenId);

    this.tokenService.getGepgToken(tokenId)
      .subscribe(
        data => {
          // this.token = Object.assign(data.data as Token);
          this.token = data.data as Token;

          console.log(data);
        },
        error => console.log(error));

  }

}

