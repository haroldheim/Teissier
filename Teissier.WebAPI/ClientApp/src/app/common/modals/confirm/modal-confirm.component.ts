import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../../../models/dialog-data';

@Component({
    selector: 'modal-confirm',
    templateUrl: 'modal-confirm.component.html',
    styleUrls: ['modal-confirm.component.css'],
})
export class ModalConfirmComponent {
    constructor(
        public dialogRef: MatDialogRef<ModalConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) {}
}
