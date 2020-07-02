import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListControlItemComponent } from './list-control-item.component';

describe('ListControlItemComponent', () => {
  let component: ListControlItemComponent;
  let fixture: ComponentFixture<ListControlItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListControlItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListControlItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
