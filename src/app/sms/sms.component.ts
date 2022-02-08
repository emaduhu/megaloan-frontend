import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { SmsService } from '../sms/sms.service';
import { Meter } from '../meters/meter'
import { Sms } from '../sms/sms'
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

export interface DialogData {
  phone: string;
}

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.css']
})
export class SmsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private smsService: SmsService,
    public dialog: MatDialog,
    // private _formBuilder: FormBuilder,
  ) {

  }

  sms: any = {};
  phone: string;
  forwardSmsDto: any = {};
  //  forwardForm: FormGroup;


  ngOnInit() {
    this.getTokenSms(this.route.snapshot.params['token']);
    this.forwardSmsDto.token = this.route.snapshot.params['token'];
  }

  ngAfterViewInit() {
  }

  getTokenSms(smsId: string) {
    console.log("Sms Id");
    console.log(smsId);
    this.smsService.getTokenSms(smsId)
      .subscribe(
        data => {
          // this.sms = Object.assign(data.data as Sms);
          this.sms = data.data as Sms;

          console.log(data);
        },
        error => console.log(error));

  }

  reSendSms(token: string) {

    console.log("Sms Id");
    console.log(token);

    this.smsService.reSendSms(token)
      .subscribe(
        data => {
          // this.sms = Object.assign(data.data as Sms);
          //           this.sms = data.data as Sms;

          console.log(data);
        },
        error => console.log(error));
  }


  forwardSms(value: any) {

    console.log("Sms Id");
    console.log(value);

    this.smsService.forwardSms(value)
      .subscribe(
        data => {
          // this.sms = Object.assign(data.data as Sms);
          this.sms = data.data as Sms;

          console.log(data);
        },
        error => console.log(error));
  }

  //Dialog code
  openDialog(): void {
    const dialogRef = this.dialog.open(ForwardSmsDialog, {
      width: '300px',
      data: { phone: this.phone }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.phone = result;

      if (this.phone != null) {

        this.forwardSmsDto.msisdn = this.phone;

        this.forwardSms(this.forwardSmsDto);

        console.log('Phone: ' + this.phone);
        console.log('forwardSmsDto: ' + this.forwardSmsDto);
      }
    });

    // this.forwardForm = this._formBuilder.group({
    //         phoneNumber:['',[Validators.required]]
    // });

  }
}

@Component({
  selector: 'sms-forward-dialog',
  templateUrl: 'sms-forward-dialog.html',
})
export class ForwardSmsDialog {

  constructor(
    public dialogRef: MatDialogRef<ForwardSmsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

