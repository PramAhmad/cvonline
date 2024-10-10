import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default function authMiddleware(
  to: RouteLocationNormalized, 
  from: RouteLocationNormalized, 
  next: NavigationGuardNext
): void {
  const isAuthenticated = localStorage.getItem('user_email');
  
  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    next(); 
  }
}
