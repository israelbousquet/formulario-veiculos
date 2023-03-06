import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FipeListComponent } from './fipe-list.component';

describe('FipeListComponent', () => {
  let component: FipeListComponent;
  let fixture: ComponentFixture<FipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FipeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
