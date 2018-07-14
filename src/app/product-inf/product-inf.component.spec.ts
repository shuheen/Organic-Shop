import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfComponent } from './product-inf.component';

describe('ProductInfComponent', () => {
  let component: ProductInfComponent;
  let fixture: ComponentFixture<ProductInfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductInfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
