import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatprChartComponent } from './catpr-chart.component';

describe('CatprChartComponent', () => {
  let component: CatprChartComponent;
  let fixture: ComponentFixture<CatprChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatprChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatprChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
