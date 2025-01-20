import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridCommonComponent } from './ag-grid-common.component';

describe('AgGridCommonComponent', () => {
  let component: AgGridCommonComponent;
  let fixture: ComponentFixture<AgGridCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridCommonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgGridCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
