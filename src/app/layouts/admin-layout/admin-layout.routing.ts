import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TokenListComponent } from '../../token-list/token-list.component';
import { MetersComponent } from '../../meters/meters.component';
import { BillComponent } from '../../bill/bill.component';
import { PaymentComponent } from '../../payment/payment.component';
import { TokenComponent } from '../../token/token.component';
import { SmsComponent } from '../../sms/sms.component';
import { TransactionsComponent } from '../../transactions/transactions.component';
import { UsersComponent } from '../../users/users.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import {ReconciliationComponent} from '../../reconciliation/reconciliation.component'

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent },
    // { path: 'user-profile',   component: UserProfileComponent },
    { path: 'token-list/:meter',     component: TokenListComponent },
    { path: 'bill/:bill_id',     component: BillComponent },
    { path: 'payment/:bill_id',     component: PaymentComponent },
    { path: 'token/:bill_id',     component: TokenComponent },
    { path: 'sms/:token',     component: SmsComponent },
    { path: 'transactions',     component: TransactionsComponent },
    { path: 'meters',     component: MetersComponent },
    { path: 'reconciliation',     component: ReconciliationComponent },
    { path: 'users',     component: UsersComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
];

