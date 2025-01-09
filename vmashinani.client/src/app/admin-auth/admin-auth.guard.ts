import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AdminAuthService } from './admin-auth.service';

export const AdminAuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: AdminAuthService = inject(AdminAuthService);
  const router: Router = inject(Router);

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    return true; // Allow access
  }

  // Redirect to the login page with a query parameter for the original URL
  router.navigate(['/admin-login'], {
    queryParams: { redirectTo: state.url },
  });

  return false; // Deny access
};
