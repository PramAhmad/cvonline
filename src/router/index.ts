import { createRouter, createWebHistory } from 'vue-router';
import { allRoutes } from '@/router/router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: allRoutes
});

// Before each route evaluates...
router.beforeEach((to, from, next) => {
  const title = to.meta.title;
  if (title) {
    document.title = title.toString();
  }
  next();
});

router.beforeEach((routeTo, routeFrom, next) => {
  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some((route) => route.meta.requiresAuth);

  // If auth isn't required for the route, just continue.
  if (!authRequired) return next();

  // Check if user_email exists in localStorage for authentication.
  const userEmail = localStorage.getItem('user_email');

  if (userEmail) {
    // If `user_email` exists, user is authenticated, continue to the route.
    return next();
  } else {
    // If `user_email` doesn't exist, redirect to login.
    return next({ name: 'login', query: { redirectedFrom: routeTo.fullPath } });
  }
});

export default router;
