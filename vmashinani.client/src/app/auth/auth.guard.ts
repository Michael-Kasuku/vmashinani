import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    return true; // Allow access
  }

  // Redirect to the login page with a query parameter for the original URL
  router.navigate(['/pet-owner-login'], {
    queryParams: { redirectTo: state.url },
  });

  return false; // Deny access
};
