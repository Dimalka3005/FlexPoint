import { Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {PagesComponent} from './components/pages/pages.component';
import {NotFoundComponent} from './components/pages/not-found/not-found.component';
import {DashboardComponent} from './components/pages/dashboard/dashboard.component';
import {UsersComponent} from './components/pages/users/users.component';
import {ProductsComponent} from './components/pages/products/products.component';
import {SalesComponent} from './components/pages/sales/sales.component';
import {ReportsComponent} from './components/pages/reports/reports.component';
import {SettingsComponent} from './components/pages/settings/settings.component';
import {authGuard} from './guards/auth-guard.guard';
import {StaffComponent} from './components/pages/users/innerUsers/staff/staff.component';
import {CustomerComponent} from './components/pages/users/innerUsers/customer/customer.component';
import {SupplierComponent} from './components/pages/users/innerUsers/supplier/supplier.component';

export const routes: Routes = [

  {path:'', component:PagesComponent, canActivate:[authGuard], children:[
      {path:'', redirectTo:'/dashboard', pathMatch:'full'},
      {path:'dashboard', component:DashboardComponent},
      {path: 'users', component: UsersComponent},
      {path:'products', component:ProductsComponent},
      {path:'sales', component:SalesComponent},
      {path:'reports', component:ReportsComponent},
      {path:'settings', component:SettingsComponent},

      {path:'users/staff', component:StaffComponent},
      {path:'users/customer', component:CustomerComponent},
      {path:'users/supplier', component:SupplierComponent},
    ]},

  {path:'login', component:LoginComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},

  {path:'**',component:NotFoundComponent},

];
