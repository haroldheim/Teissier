import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DialogData } from '../../../models/dialog-data';
import { ApartmentTenantService } from '../../../core/services/apartment-tenant.service';
import { TenantService } from '../../../core/services/tenant.service';
import { ApartmentService } from '../../../core/services/apartment.service';
import { Tenant } from '../../../models/tenant';
import { Apartment } from '../../../models/apartment';

@Component({
    selector: 'modal-tenant-apartment',
    templateUrl: 'modal-tenant-apartment.component.html',
    styleUrls: ['modal-tenant-apartment.component.css'],
})
export class ModalTenantApartmentComponent {
    tenantApartmentForm: FormGroup;
    tenants: Tenant[];
    apartments: Apartment[];

    constructor(
        public dialogRef: MatDialogRef<ModalTenantApartmentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private tenantApartmentService: ApartmentTenantService,
        private tenantService: TenantService,
        private apartmentService: ApartmentService,
    ) {
        this.tenantService.getAll().subscribe((res) => {
            this.tenants = res;
        });
        this.apartmentService.getAll().subscribe((res) => {
            this.apartments = res;
        });

        data != null
            ? (this.tenantApartmentForm = this.fb.group({
                  id: [data.id],
                  tenantId: [data.tenantId, Validators.required],
                  apartmentId: [data.apartmentId, Validators.required],
                  dateIn: [data.dateIn, Validators.required],
                  dateOut: [data.dateOut],
                  paymentMethod: [data.paymentMethod, Validators.required],
                  rent: [data.rent, Validators.required],
              }))
            : (this.tenantApartmentForm = this.fb.group({
                  id: [0],
                  tenantId: [null, Validators.required],
                  apartmentId: [null, Validators.required],
                  dateIn: [null, Validators.required],
                  dateOut: [null],
                  paymentMethod: [null, Validators.required],
                  rent: [null, Validators.required],
              }));
    }

    onSubmit() {
        const tenant = this.tenantApartmentForm.value;

        if (tenant.id === 0) {
            this.tenantApartmentService.add(tenant).subscribe((res) => {
                this.dialogRef.close(res);
            });
        } else {
            this.tenantApartmentService.update(tenant).subscribe((res) => {
                this.dialogRef.close(res);
            });
        }
    }
}
