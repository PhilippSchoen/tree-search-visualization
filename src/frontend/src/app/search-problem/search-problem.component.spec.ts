import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProblemComponent } from './search-problem.component';

describe('SearchProblemComponent', () => {
  let component: SearchProblemComponent;
  let fixture: ComponentFixture<SearchProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchProblemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
