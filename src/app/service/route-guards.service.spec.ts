import { TestBed } from '@angular/core/testing';

import { RouteGuardsService } from './route-guards.service';

describe('RouteGuardsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RouteGuardsService = TestBed.get(RouteGuardsService);
    expect(service).toBeTruthy();
  });
});
