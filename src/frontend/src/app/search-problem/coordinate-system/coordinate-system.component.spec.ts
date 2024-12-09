import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateSystemComponent } from './coordinate-system.component';

describe('CoordinateSystemComponent', () => {
  let component: CoordinateSystemComponent;
  let fixture: ComponentFixture<CoordinateSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinateSystemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinateSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
