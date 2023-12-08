import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearOcurrenciaComponent } from './crear-ocurrencia.component';

describe('CrearOcurrenciaComponent', () => {
  let component: CrearOcurrenciaComponent;
  let fixture: ComponentFixture<CrearOcurrenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearOcurrenciaComponent]
    });
    fixture = TestBed.createComponent(CrearOcurrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
