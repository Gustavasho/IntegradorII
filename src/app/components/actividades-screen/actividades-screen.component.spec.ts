import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesScreenComponent } from './actividades-screen.component';

describe('ActividadesScreenComponent', () => {
  let component: ActividadesScreenComponent;
  let fixture: ComponentFixture<ActividadesScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadesScreenComponent]
    });
    fixture = TestBed.createComponent(ActividadesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
