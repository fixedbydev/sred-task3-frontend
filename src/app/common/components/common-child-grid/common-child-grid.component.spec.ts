import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonChildGridComponent } from './common-child-grid.component';

describe('CommonChildGridComponent', () => {
  let component: CommonChildGridComponent;
  let fixture: ComponentFixture<CommonChildGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonChildGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonChildGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
