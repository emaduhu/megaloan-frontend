import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TokenListComponent } from '../../token-list/token-list.component';
import { MetersComponent } from '../../meters/meters.component';

import { TransactionsComponent } from '../../transactions/transactions.component';
import { UsersComponent } from '../../users/users.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {CdkTableModule} from '@angular/cdk/table';
import { MatListModule } from '@angular/material/list';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
// import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';

// import { ForwardSmsDialog } from '../../sms/sms.component';
import { BillComponent } from '../../bill/bill.component';
import { PaymentComponent } from '../../payment/payment.component';
import { TokenComponent } from '../../token/token.component';
import { SmsComponent } from '../../sms/sms.component';
import { ReconciliationComponent } from '../../reconciliation/reconciliation.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    CdkTableModule,
    // MatAutocompleteModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    MatStepperModule,
    // MatDatepickerModule,
    MatDialogModule,
    // MatExpansionModule,
    // MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    // MatNativeDateModule,
    MatPaginatorModule,
    // MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    // MatRippleModule,
    MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    // DateRangePickerModule,
    MatDatepickerModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TokenListComponent,
    MetersComponent,
    SmsComponent,
    TransactionsComponent,
    UsersComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    BillComponent,
    PaymentComponent,
    TokenComponent,
    ReconciliationComponent,
  ]
})

export class AdminLayoutModule {}
