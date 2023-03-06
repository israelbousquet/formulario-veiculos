import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupErrorCepComponent } from './popup-error-cep.component';

describe('PopupErrorCepComponent', () => {
  let component: PopupErrorCepComponent;
  let fixture: ComponentFixture<PopupErrorCepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupErrorCepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupErrorCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
