import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Tenant } from '../models/tenant';
import { TenantService } from '../core/services/tenant.service';
import { ModalTenantComponent } from '../common/modals/tenant/modal-tenant.component';
import { ModalConfirmComponent } from '../common/modals/confirm/modal-confirm.component';

@Component({
    selector: 'app-tenant',
    templateUrl: './tenant.component.html',
    styleUrls: ['./tenant.component.css'],
})
export class TenantComponent implements OnInit {
    displayedColumns: string[] = ['id', 'firstname', 'lastname', 'actions'];
    dataSource: MatTableDataSource<Tenant>;
    tenants: Tenant[] = [];
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    constructor(
        private tenantService: TenantService,
        public dialog: MatDialog,
    ) {}

    ngOnInit(): void {
        this.tenantService.getAll().subscribe((res) => {
            this.tenants = res;
            this.setDataSource(this.tenants);
        });
    }

    getPropertyByPath(obj: Object, pathString: string) {
        return pathString.split('.').reduce((o, i) => o[i], obj);
    }

    onDeleteClick(tenantId: number) {
        const dialogRef = this.dialog.open(ModalConfirmComponent);

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this.tenantService.remove(tenantId).subscribe((res) => {
                    this.tenants = this.tenants.filter(
                        (t) => t.id !== tenantId,
                    );
                    this.setDataSource(this.tenants);
                });
            }
        });
    }

    onEditClick(tenant: Tenant) {
        const dialogRef = this.dialog.open(ModalTenantComponent, {
            width: '300px',
            data: tenant,
        });

        this.handleCallback(dialogRef);
    }

    onAddClick() {
        const dialogRef = this.dialog.open(ModalTenantComponent, {
            width: '300px',
            data: null,
        });

        this.handleCallback(dialogRef);
    }

    setDataSource(res: Tenant[]) {
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
                this.tenants = this.tenants.reduce(
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
                    this.tenants = [...this.tenants, result];
                }

                this.setDataSource(this.tenants);
            }
        });
    }
}
