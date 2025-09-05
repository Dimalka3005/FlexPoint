import { CanActivateFn, Router } from '@angular/router';
// @ts-ignore
import { inject } from '@angular/core';
import { isEmpty } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let token: string | null = null;
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    token = localStorage.getItem('accessToken');
  }


  if (token) {
    return true;
  }
  else {
    router.navigate(['/login']);
    return false;
  }
};
