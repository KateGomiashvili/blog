import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { commentsResolveGuard } from './comments-resolve.guard';

describe('commentsResolveGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => commentsResolveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
