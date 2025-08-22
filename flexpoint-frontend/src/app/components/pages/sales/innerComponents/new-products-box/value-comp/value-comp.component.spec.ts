import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValueCompComponent } from './value-comp.component';

describe('ValueCompComponent', () => {
  let component: ValueCompComponent;
  let fixture: ComponentFixture<ValueCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValueCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
