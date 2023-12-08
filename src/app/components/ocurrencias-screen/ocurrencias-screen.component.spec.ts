import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcurrenciasScreenComponent } from './ocurrencias-screen.component';

describe('OcurrenciasScreenComponent', () => {
  let component: OcurrenciasScreenComponent;
  let fixture: ComponentFixture<OcurrenciasScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OcurrenciasScreenComponent]
    });
    fixture = TestBed.createComponent(OcurrenciasScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
