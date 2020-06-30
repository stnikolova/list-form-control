import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListControlContentComponent } from './list-control-content.component';

describe('ListFormControlComponent', () => {
  let component: ListControlContentComponent;
  let fixture: ComponentFixture<ListControlContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListControlContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListControlContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
