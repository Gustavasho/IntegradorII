import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarOcurrenciaComponent } from './modificar-ocurrencia.component';

describe('ModificarOcurrenciaComponent', () => {
  let component: ModificarOcurrenciaComponent;
  let fixture: ComponentFixture<ModificarOcurrenciaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarOcurrenciaComponent]
    });
    fixture = TestBed.createComponent(ModificarOcurrenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
