import { TestBed } from '@angular/core/testing';

import { AfficherService } from './afficher.service';

describe('AfficherService', () => {
  let service: AfficherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AfficherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
