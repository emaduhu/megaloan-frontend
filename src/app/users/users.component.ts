import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from './users.service';
import { User } from './user'
import { MatTooltipModule, TooltipPosition } from '@angular/material/tooltip';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { AddUserDialogComponent } from './add-user/add-user-dialog-component';
import { NotificationService } from 'app/_services/notification.service';
import { EditUserDialogComponent } from './edit-user/edit-user-dialog-component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns = ['id', 'firstName', 'middleName', 'lastName', 'msisdn', 'email', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<User>;
  addUserDialogRef: MatDialogRef<AddUserDialogComponent>;
  editUserDialogRef: MatDialogRef<EditUserDialogComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    public notificationService: NotificationService,
  ) {
  }

  user: any = {};
  phone: string;

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);

  ngOnInit() {
    this.usersService.allUsers().subscribe(
      (resp) => {
        console.log("Users");
        console.log(resp.data);

        if (resp.status == "TPDCS") {

          this.dataSource = new MatTableDataSource(resp.data as User[]);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        } else {

          console.log("Unsucessfull request");

          // this.notification.error("Unsucessful request");
        }
      },
      (error) => {
        console.log("error on user retrive");
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

  addUser(value) {
    console.log("User value ");
    console.log(value);

    this.usersService.addUser(value)
      .subscribe(
        data => {
          console.log("Server response: ");
          console.log(data);
        },
        error => console.log(error));
  }

  // editUser(id: number) {
  //   this.user.id = id;
  //   console.log("User ");
  //   console.log(this.user);

  //   this.usersService.editUser(this.user)
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //       },
  //       error => console.log(error));
  // }

  openAddUserDialog() {
    this.addUserDialogRef = this.dialog.open(AddUserDialogComponent, {
      // minHeight:'400px',
      minWidth: '700px'
    });

    this.addUserDialogRef.afterClosed().subscribe(() => {
      this.reloadUsers();
    }
    );
  }

  openEditUserDialog(id) {
    this.editUserDialogRef = this.dialog.open(EditUserDialogComponent, {
      // minHeight:'400px',
      minWidth: '700px',
      data: {
        'id': id
      }
    });

    this.editUserDialogRef.afterClosed().subscribe(() => {
      this.reloadUsers();

    }
    );
  }

  deleteUser(id: number) {
    this.user.id = id;
    console.log("User ");
    console.log(this.user);

    this.usersService.deleteUser(this.user)
      .subscribe(
        data => {
          console.log(data);
          this.notificationService.openSnackBar(data.message, 'Close', 'success-snackbar', 10000);
          this.reloadUsers();
        },
        error => {
          console.log(error);
          this.notificationService.openSnackBar(error.message, 'Close', 'error-snackbar', 10000);
        });
  }


  reloadUsers() {
    console.log("Reloading users");
    this.usersService.allUsers().subscribe(
      (resp) => {
        console.log("Users");
        console.log(resp.data);

        if (resp.status == "TPDCS") {

          this.dataSource = new MatTableDataSource(resp.data as User[]);

          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        } else {

          console.log("Unsucessfull request");
          // this.notificationService.openSnackBar("Refreshed", 'Close', 'success-snackbar', 10000);
        }
      },
      (error) => {
        console.log("error on user retrieve");
        // this.notificationService.openSnackBar(error.message, 'Close', 'error-snackbar', 10000);
      }
    );
  }
}
