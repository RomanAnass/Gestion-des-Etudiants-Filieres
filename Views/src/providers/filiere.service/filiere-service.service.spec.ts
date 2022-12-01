import { TestBed } from '@angular/core/testing';

import { FiliereServiceService } from './filiere-service.service';

describe('FiliereServiceService', () => {
  let service: FiliereServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiliereServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
