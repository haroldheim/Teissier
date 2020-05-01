import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/services/auth.guard';
import { TenantComponent } from './tenant/tenant.component';
import { TenantApartmentComponent } from './tenant-apartment/tenant-apartment.component';
import { ApartmentComponent } from './apartment/apartment.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: TenantApartmentComponent },
      { path: 'tenants', component: TenantComponent },
      { path: 'apartments', component: ApartmentComponent },
    ],
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
