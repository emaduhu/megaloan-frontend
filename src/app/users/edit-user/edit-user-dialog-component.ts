import { Component, Inject, OnInit } from '@angular/core';
// import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Role } from '../role';
import { UsersService } from '../users.service';
import { NotificationService } from 'app/_services/notification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';

@Component({
  templateUrl: 'edit-user-dialog.component.html',
  styleUrls: ['edit-user-dialog.component.scss'
  ]
})
export class EditUserDialogComponent {

  editUserForm: FormGroup;
  roles: Role[];
  loading = false;
  user: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    private usersService: UsersService,
    public notificationService: NotificationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    console.log("this.data");
    console.log(this.data);

    this.editUserForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      middlename: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("^((\\+91-?))?[0-9]{9}$")]],
      role: ['', [Validators.required]]
    });

    this.roles = [{ "id": "1", "name": "Moderator" }, { "id": "2", "name": "Administrator" }];

    this.usersService.getUser(this.data.id)
      .subscribe(
        data => {
          console.log("Server response: ");
          console.log(data);
          this.user = data.data;
          
          this.editUserForm.patchValue({
            firstname: this.user.firstName,
            middlename: this.user.middleName,
            lastname: this.user.lastName,
            email: this.user.email,
            phone: + '0' + this.user.msisdn.substring(this.user.msisdn.length -9),
            role: this.roles ? this.roles[0] : 'None'
          });

        },
        error => {
          this.loading = false;
          console.log(error);
        });


  }

  onCloseDialog() {
    this.dialogRef.close();
  }

  onSubmit(value) {

    value.role = value.role.id;
    value.id = this.user.id;

    console.log("User value ");
    console.log(value);

    console.log("User Password");
    console.log(this.generatePassword(4));
    this.loading = true;

    this.usersService.updateUser(value)
      .subscribe(
        data => {
          console.log("Server response: ");
          console.log(data);
          this.loading = false;
          this.notificationService.openSnackBar(data.message, 'Close', 'success-snackbar', 10000);
        },
        error => {
          this.loading = false;
          console.log(error);
          this.notificationService.openSnackBar(error.message, 'Close', 'error-snackbar', 10000);
        });

    this.dialogRef.close();
  }

  generatePassword(passwordLength) {
    var numberChars = "0123456789";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var allChars = numberChars + upperChars + lowerChars;
    var randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return this.shuffleArray(randPasswordArray.map(function (x) { return x[Math.floor(Math.random() * x.length)] })).join('');
  }

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }



}