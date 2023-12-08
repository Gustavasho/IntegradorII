import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarSubactividadComponent } from './modificar-subactividad.component';

describe('ModificarSubactividadComponent', () => {
  let component: ModificarSubactividadComponent;
  let fixture: ComponentFixture<ModificarSubactividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModificarSubactividadComponent]
    });
    fixture = TestBed.createComponent(ModificarSubactividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
