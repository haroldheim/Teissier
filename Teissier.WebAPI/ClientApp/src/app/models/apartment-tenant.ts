import { Apartment } from './apartment';
import { Tenant } from './tenant';

export class ApartmentTenant {
    id: number;
    tenantId: number;
    apartmentId: number;
    dateIn: Date;
    dateTime: Date;
    paymentMethod: string;
    apartment: Apartment;
    tenant: Tenant;
    rent: number;
    balance: number;
}
