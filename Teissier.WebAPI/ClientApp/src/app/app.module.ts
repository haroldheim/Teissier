import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { TokenInterceptor } from './core/services/http-interceptor.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app.routing';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TenantComponent } from './tenant/tenant.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { HeaderComponent } from './header/header.component';
import { TenantApartmentComponent } from './tenant-apartment/tenant-apartment.component';
import { ModalTenantComponent } from './common/modals/tenant/modal-tenant.component';
import { ModalConfirmComponent } from './common/modals/confirm/modal-confirm.component';
import { ModalApartmentComponent } from './common/modals/apartment/modal-apartment.component';
import { ModalTenantApartmentComponent } from './common/modals/tenant-apartment/modal-tenant-apartment.component';
import { ModalRecordComponent } from './common/modals/record/modal-record.component';
import { DatePipe } from '@angular/common';
import { ModalRentComponent } from './common/modals/rent/modal-rent.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        TenantComponent,
        ApartmentComponent,
        HeaderComponent,
        TenantApartmentComponent,
        ModalTenantComponent,
        ModalConfirmComponent,
        ModalApartmentComponent,
        ModalTenantApartmentComponent,
        ModalRecordComponent,
        ModalRentComponent,
    ],
    imports: [
        CoreModule,
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
        DatePipe,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
