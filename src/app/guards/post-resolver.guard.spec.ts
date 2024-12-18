import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { postResolverGuard } from './post-resolver.guard';

describe('postResolverGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => postResolverGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
