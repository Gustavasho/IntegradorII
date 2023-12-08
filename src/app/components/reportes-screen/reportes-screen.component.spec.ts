import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesScreenComponent } from './reportes-screen.component';

describe('ReportesScreenComponent', () => {
  let component: ReportesScreenComponent;
  let fixture: ComponentFixture<ReportesScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportesScreenComponent]
    });
    fixture = TestBed.createComponent(ReportesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
