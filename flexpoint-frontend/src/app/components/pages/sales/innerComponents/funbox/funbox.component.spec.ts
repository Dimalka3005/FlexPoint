import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunboxComponent } from './funbox.component';

describe('FunboxComponent', () => {
  let component: FunboxComponent;
  let fixture: ComponentFixture<FunboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
