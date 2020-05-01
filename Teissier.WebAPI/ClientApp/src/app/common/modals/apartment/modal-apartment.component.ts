import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DialogData } from '../../../models/dialog-data';
import { ApartmentService } from '../../../core/services/apartment.service';

@Component({
    selector: 'modal-apartment',
    templateUrl: 'modal-apartment.component.html',
    styleUrls: ['modal-apartment.component.css'],
})
export class ModalApartmentComponent {
    apartmentForm: FormGroup;
    constructor(
        public dialogRef: MatDialogRef<ModalApartmentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private apartmentService: ApartmentService,
    ) {
        data != null
            ? (this.apartmentForm = this.fb.group({
                  id: [data.id],
                  description: [data.description, Validators.required],
                  level: [data.level, Validators.required],
              }))
            : (this.apartmentForm = this.fb.group({
                  id: [0],
                  description: ['', Validators.required],
                  level: ['', Validators.required],
              }));
    }

    onSubmit() {
        const apartment = this.apartmentForm.value;

        if (apartment.id === 0) {
            this.apartmentService.add(apartment).subscribe((res) => {
                this.dialogRef.close(res);
            });
        } else {
            this.apartmentService.update(apartment).subscribe((res) => {
                this.dialogRef.close(res);
            });
        }
    }
}
