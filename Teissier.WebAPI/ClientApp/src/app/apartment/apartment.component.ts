import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Apartment } from '../models/apartment';
import { ApartmentService } from '../core/services/apartment.service';
import { ModalConfirmComponent } from '../common/modals/confirm/modal-confirm.component';
import { ModalApartmentComponent } from '../common/modals/apartment/modal-apartment.component';

@Component({
    selector: 'app-apartment',
    templateUrl: './apartment.component.html',
    styleUrls: ['./apartment.component.css'],
})
export class ApartmentComponent implements OnInit {
    displayedColumns: string[] = ['id', 'description', 'level', 'actions'];
    dataSource: MatTableDataSource<Apartment>;
    apartments: Apartment[] = [];
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private apartmentService: ApartmentService,
        public dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.apartmentService.getAll().subscribe((res) => {
            this.apartments = res;
            this.setDataSource(this.apartments);
        });
    }

    getPropertyByPath(obj: Object, pathString: string) {
        return pathString.split('.').reduce((o, i) => o[i], obj);
    }

    onDeleteClick(apartmentId: number) {
        const dialogRef = this.dialog.open(ModalConfirmComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.apartmentService.remove(apartmentId).subscribe((res) => {
                    this.apartments = this.apartments.filter(
                        (t) => t.id !== apartmentId,
                    );
                    this.setDataSource(this.apartments);
                });
            }
        });
    }

    onEditClick(apartment: Apartment) {
        const dialogRef = this.dialog.open(ModalApartmentComponent, {
            width: '300px',
            data: apartment,
        });

        this.handleCallback(dialogRef);
    }

    setDataSource(res: Apartment[]) {
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
                this.apartments = this.apartments.reduce(
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
                    this.apartments = [...this.apartments, result];
                }

                this.setDataSource(this.apartments);
            }
        });
    }

    onAddClick() {
        const dialogRef = this.dialog.open(ModalApartmentComponent, {
            width: '300px',
            data: null,
        });

        this.handleCallback(dialogRef);
    }
}
