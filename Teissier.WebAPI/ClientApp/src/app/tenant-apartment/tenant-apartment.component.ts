import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ApartmentTenant } from '../models/apartment-tenant';
import { Receipt } from '../models/receipt';
import { ModalTenantApartmentComponent } from '../common/modals/tenant-apartment/modal-tenant-apartment.component';
import { ModalConfirmComponent } from '../common/modals/confirm/modal-confirm.component';
import { ApartmentTenantService } from '../core/services/apartment-tenant.service';
import { RecordService } from '../core/services/record.service';
import { ModalRecordComponent } from '../common/modals/record/modal-record.component';
import { ModalRentComponent } from '../common/modals/rent/modal-rent.component';

@Component({
    selector: 'app-tenant-apartment',
    templateUrl: './tenant-apartment.component.html',
    styleUrls: ['./tenant-apartment.component.css'],
})
export class TenantApartmentComponent implements OnInit {
    displayedColumns: string[] = [
        'id',
        'locataire',
        'apartment.description',
        'apartment.level',
        'apartment.rent',
        'apartment.balance',
        'actions',
    ];
    dataSource: MatTableDataSource<ApartmentTenant>;

    apartmentTenants: ApartmentTenant[] = [];
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    constructor(
        private apartmentTenantservice: ApartmentTenantService,
        public dialog: MatDialog,
        private recordService: RecordService,
    ) {}

    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.apartmentTenantservice.getAll().subscribe((res) => {
            this.apartmentTenants = res;
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

    getTotalRent = () =>
        this.apartmentTenants.map((app) => app.rent).reduce((a, b) => a + b, 0);

    getTotalBalance = () =>
        this.apartmentTenants
            .map((app) => app.balance)
            .reduce((a, b) => a + b, 0);

    getPropertyByPath(obj: Object, pathString: string) {
        return pathString.split('.').reduce((o, i) => o[i], obj);
    }

    onAddClick() {
        const dialogRef = this.dialog.open(ModalTenantApartmentComponent, {
            width: '300px',
            data: null,
        });

        this.handleCallback(dialogRef);
    }

    onDeleteClick(apartmentTenantId: number) {
        const dialogRef = this.dialog.open(ModalConfirmComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.apartmentTenantservice
                    .remove(apartmentTenantId)
                    .subscribe((res) => {
                        this.apartmentTenants = this.apartmentTenants.filter(
                            (t) => t.id !== apartmentTenantId,
                        );
                        this.setDataSource(this.apartmentTenants);
                    });
            }
        });
    }

    onEditClick(tenant: ApartmentTenant) {
        const dialogRef = this.dialog.open(ModalTenantApartmentComponent, {
            width: '300px',
            data: tenant,
        });

        this.handleCallback(dialogRef);
    }

    onAddRentClick(tenant: ApartmentTenant) {
        const dialogRef = this.dialog.open(ModalRentComponent, {
            width: '300px',
            data: tenant,
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.loadData();
        });
    }

    setDataSource(res: ApartmentTenant[]) {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data, sortHeaderId: string) => {
            return this.getPropertyByPath(data, sortHeaderId);
        };
    }

    handleCallback(dialogRef) {
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                let shouldBeAdded = true;
                this.apartmentTenants = this.apartmentTenants.reduce(
                    (accumulator, currentValue) => {
                        if (currentValue.id === result.id) {
                            shouldBeAdded = false;
                            return [...accumulator, result];
                        } else {
                            return [...accumulator, currentValue];
                        }
                    },
                    [],
                );

                if (shouldBeAdded) {
                    this.apartmentTenants = [...this.apartmentTenants, result];
                }

                this.setDataSource(this.apartmentTenants);
            }
        });
    }

    onGenerateReceipt() {
        const receipt = new Receipt();
        receipt.date = new Date();

        this.recordService.generateReceipt(receipt).subscribe((res) => {
            this.loadData();
        });
    }

    onViewClick(id: number) {
        this.dialog.open(ModalRecordComponent, {
            width: '1000px',
            data: { id: id },
        });
    }
}
