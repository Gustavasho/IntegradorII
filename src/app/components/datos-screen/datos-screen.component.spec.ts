import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosScreenComponent } from './datos-screen.component';

describe('DatosScreenComponent', () => {
  let component: DatosScreenComponent;
  let fixture: ComponentFixture<DatosScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosScreenComponent]
    });
    fixture = TestBed.createComponent(DatosScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
