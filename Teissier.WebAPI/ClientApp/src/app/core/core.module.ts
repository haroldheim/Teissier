import { NgModule } from '@angular/core';
import { TenantService } from './services/tenant.service';
import { AuthService } from './services/auth.service';
import { ApartmentTenantService } from './services/apartment-tenant.service';
import { RecordService } from './services/record.service';
import { ApartmentService } from './services/apartment.service';

@NgModule({
    providers: [
        TenantService,
        ApartmentTenantService,
        ApartmentService,
        AuthService,
        RecordService,
    ],
})
export class CoreModule {}
