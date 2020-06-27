import { TestBed } from '@angular/core/testing';

import { ListFormControlService } from './list-form-control.service';

describe('ListFormControlService', () => {
  let service: ListFormControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListFormControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
