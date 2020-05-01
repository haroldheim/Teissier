import { Injectable } from '@angular/core';
import { Tenant } from '../../models/tenant';
import { Apartment } from '../../models/apartment';
import { ApartmentTenant } from '../../models/apartment-tenant';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TenantService {
    private tenantUrl = 'api/Tenant';

    constructor(private http: HttpService) {}

    getAll(): Observable<Tenant[]> {
        return this.http.get(this.tenantUrl);
    }

    add(tenantToAdd: Tenant): Observable<Tenant> {
        return this.http.post(this.tenantUrl, tenantToAdd);
    }

    remove(tenantIdToRemove: number): Observable<any> {
        return this.http.delete(`${this.tenantUrl}/${tenantIdToRemove}`);
    }

    update(tenantToUpdate: Tenant): Observable<Tenant> {
        return this.http.put(
            `${this.tenantUrl}/${tenantToUpdate.id}`,
            tenantToUpdate,
        );
    }
}
