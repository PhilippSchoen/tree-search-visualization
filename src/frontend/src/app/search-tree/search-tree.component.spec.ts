import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTreeComponent } from './search-tree.component';

describe('SearchTreeComponent', () => {
  let component: SearchTreeComponent;
  let fixture: ComponentFixture<SearchTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
