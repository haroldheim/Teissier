import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DialogData } from '../../../models/dialog-data';
import { ApartmentService } from '../../../core/services/apartment.service';
import { RecordService } from '../../../core/services/record.service';

@Component({
    selector: 'modal-rent',
    templateUrl: 'modal-rent.component.html',
    styleUrls: ['modal-rent.component.css'],
})
export class ModalRentComponent {
    rentForm: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<ModalRentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private recordService: RecordService,
    ) {
        this.rentForm = this.fb.group({
            label: ['Paiement loyer', Validators.required],
            amount: [null, Validators.required],
            date: [new Date(), Validators.required],
            type: [1, Validators.required],
            apartementTenantId: [data.id, Validators.required],
        });
    }

    onSubmit() {
        const record = this.rentForm.value;

        this.recordService.add(record).subscribe((res) => {
            this.dialogRef.close(res);
        });
    }
}
