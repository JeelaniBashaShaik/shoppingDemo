import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificProdcutComponent } from './specific-prodcut.component';

describe('SpecificProdcutComponent', () => {
  let component: SpecificProdcutComponent;
  let fixture: ComponentFixture<SpecificProdcutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificProdcutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificProdcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
