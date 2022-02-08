import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TokenListComponent } from './token-list/token-list.component';
import { MetersComponent } from './meters/meters.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
// import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import { ForwardSmsDialog } from './sms/sms.component';
import { AddUserDialogComponent } from './users/add-user/add-user-dialog-component';
import { PaymentComponent } from './payment/payment.component';
import { TokenComponent } from './token/token.component';
import { SmsComponent } from './sms/sms.component';
import { BillComponent } from './bill/bill.component';
import { ReconciliationComponent } from './reconciliation/reconciliation.component';

//for login
// import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule } from '@angular/forms';
// import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

// import { AppComponent } from './app.component';
// import { AppRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
// import { HomeComponent } from './home';
import { LoginComponent } from './login';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EditUserDialogComponent } from './users/edit-user/edit-user-dialog-component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        AgmCoreModule.forRoot({
            apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
        }),
        CdkTableModule,
        // MatAutocompleteModule,
        // MatButtonModule,
        // MatButtonToggleModule,
        // MatCardModule,
        // MatCheckboxModule,
        // MatChipsModule,
        MatStepperModule,
        MatDatepickerModule,
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
        MatSnackBarModule,
        // DateRangePickerModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        // BillComponent,
        //for login
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        ForwardSmsDialog,
        AddUserDialogComponent,
        EditUserDialogComponent,
        // BillComponent,
        // PaymentComponent,
        // TokenComponent,
        // SmsComponent,
        LoginComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provider used to create fake backend
        // fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
