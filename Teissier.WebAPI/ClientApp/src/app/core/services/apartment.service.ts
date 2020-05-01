import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Apartment } from '../../models/apartment';

@Injectable({ providedIn: 'root' })
export class ApartmentService {
    private apartmentUrl = 'api/apartment';

    constructor(private http: HttpService) {}

    getAll(): Observable<Apartment[]> {
        return this.http.get(this.apartmentUrl);
    }

    add(apartmentToAdd: Apartment): Observable<Apartment> {
        return this.http.post(this.apartmentUrl, apartmentToAdd);
    }

    remove(apartmentIdToRemove: number): Observable<any> {
        return this.http.delete(`${this.apartmentUrl}/${apartmentIdToRemove}`);
    }

    update(apartmentToUpdate: Apartment): Observable<Apartment> {
        return this.http.put(
            `${this.apartmentUrl}/${apartmentToUpdate.id}`,
            apartmentToUpdate,
        );
    }
}
