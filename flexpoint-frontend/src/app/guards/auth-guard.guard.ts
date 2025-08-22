import {CanActivateFn, Router} from '@angular/router';
// @ts-ignore
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  // router.navigate(['/login']);
  return true;
};
