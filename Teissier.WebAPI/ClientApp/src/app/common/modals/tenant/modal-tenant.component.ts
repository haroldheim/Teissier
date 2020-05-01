import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DialogData } from '../../../models/dialog-data';
import { TenantService } from '../../../core/services/tenant.service';

@Component({
    selector: 'modal-tenant',
    templateUrl: 'modal-tenant.component.html',
    styleUrls: ['modal-tenant.component.css'],
})
export class ModalTenantComponent {
    tenantForm: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<ModalTenantComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private tenantService: TenantService,
    ) {
        data != null
            ? (this.tenantForm = this.fb.group({
                  id: [data.id],
                  firstname: [data.firstname, Validators.required],
                  lastname: [data.lastname, Validators.required],
              }))
            : (this.tenantForm = this.fb.group({
                  id: [0],
                  firstname: ['', Validators.required],
                  lastname: ['', Validators.required],
              }));
    }

    onSubmit() {
        const tenant = this.tenantForm.value;

        if (tenant.id === 0) {
            this.tenantService.add(tenant).subscribe((res) => {
                this.dialogRef.close(res);
            });
        } else {
            this.tenantService.update(tenant).subscribe((res) => {
                this.dialogRef.close(res);
            });
        }
    }
}
