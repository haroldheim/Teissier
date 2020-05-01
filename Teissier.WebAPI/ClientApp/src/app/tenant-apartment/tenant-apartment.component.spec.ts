import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantApartmentComponent } from './tenant-apartment.component';

describe('TenantAppartmentComponent', () => {
  let component: TenantApartmentComponent;
  let fixture: ComponentFixture<TenantApartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TenantApartmentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
