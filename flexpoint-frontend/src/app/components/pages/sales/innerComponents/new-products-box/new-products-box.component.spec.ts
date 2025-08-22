import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductsBoxComponent } from './new-products-box.component';

describe('NewProductsBoxComponent', () => {
  let component: NewProductsBoxComponent;
  let fixture: ComponentFixture<NewProductsBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProductsBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProductsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
