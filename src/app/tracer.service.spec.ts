import { TestBed } from '@angular/core/testing';

import { TracerService } from './tracer.service';

describe('TracerService', () => {
  let service: TracerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TracerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
