import { Injectable } from '@angular/core';
import { ApartmentTenant } from '../../models/apartment-tenant';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { Receipt } from '../../models/receipt';
import { Record } from '../../models/record';

@Injectable({ providedIn: 'root' })
export class RecordService {
    private recordUrl = 'api/Record';

    constructor(private http: HttpService) {}

    generateReceipt(receipt: Receipt): Observable<any> {
        return this.http.post(`${this.recordUrl}/generate-receipts`, receipt);
    }

    get(apartmentTenantId: number): Observable<Record[]> {
        return this.http.get(`${this.recordUrl}/${apartmentTenantId}`);
    }

    add(record: Record): Observable<any> {
        return this.http.post(`${this.recordUrl}`, record);
    }
}
