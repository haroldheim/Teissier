import { Component, Inject, ViewChild } from '@angular/core';
import {
    MatDialogRef,
    MAT_DIALOG_DATA,
    MatTableDataSource,
    MatSort,
} from '@angular/material';
import { DialogData } from '../../../models/dialog-data';
import { RecordService } from '../../../core/services/record.service';
import { Record } from '../../../models/record';
import { RecordTypeEnum } from 'src/app/enums/record-type.enum';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'modal-record',
    templateUrl: 'modal-record.component.html',
    styleUrls: ['modal-record.component.css'],
})
export class ModalRecordComponent {
    displayedColumns: string[] = ['date', 'label', 'debit', 'credit', 'total'];
    dataSource: MatTableDataSource<Record>;

    records: Record[] = [];
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        public dialogRef: MatDialogRef<ModalRecordComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private recordService: RecordService,
        public datepipe: DatePipe,
    ) {
        this.recordService.get(data.id).subscribe((res) => {
            res = res.map((x) => ({
                ...x,
                debit: x.type === RecordTypeEnum.Debit ? x.amount : null,
                credit: x.type === RecordTypeEnum.Credit ? x.amount : null,
            }));

            this.records = res;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort;
            this.dataSource.sortingDataAccessor = (
                data,
                sortHeaderId: string,
            ) => {
                return this.getPropertyByPath(data, sortHeaderId);
            };
        });
    }

    getPropertyByPath(obj: Object, pathString: string) {
        return pathString.split('.').reduce((o, i) => o[i], obj);
    }

    getTotalCredit = () =>
        this.records.map((app) => app.credit).reduce((a, b) => a + b, 0);

    getTotalDebit = () =>
        this.records.map((app) => app.debit).reduce((a, b) => a + b, 0);
}
