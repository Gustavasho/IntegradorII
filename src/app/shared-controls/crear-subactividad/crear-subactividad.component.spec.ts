import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSubactividadComponent } from './crear-subactividad.component';

describe('CrearSubactividadComponent', () => {
  let component: CrearSubactividadComponent;
  let fixture: ComponentFixture<CrearSubactividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearSubactividadComponent]
    });
    fixture = TestBed.createComponent(CrearSubactividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
