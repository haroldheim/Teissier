import { Injectable } from '@angular/core';
import { ApartmentTenant } from '../../models/apartment-tenant';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApartmentTenantService {
    private apartmentTenantUrl = 'api/apartmentTenant';

    constructor(private http: HttpService) {}

    getAll(): Observable<ApartmentTenant[]> {
        return this.http.get(this.apartmentTenantUrl);
    }

    add(apartmentTenantToAdd: ApartmentTenant): Observable<ApartmentTenant> {
        return this.http.post(this.apartmentTenantUrl, apartmentTenantToAdd);
    }

    remove(apartmentTenantIdToRemove: number): Observable<any> {
        return this.http.delete(
            `${this.apartmentTenantUrl}/${apartmentTenantIdToRemove}`,
        );
    }

    update(
        apartmentTenantToUpdate: ApartmentTenant,
    ): Observable<ApartmentTenant> {
        return this.http.put(
            `${this.apartmentTenantUrl}/${apartmentTenantToUpdate.id}`,
            apartmentTenantToUpdate,
        );
    }
}
