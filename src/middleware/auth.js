export function authMiddleware(to, from, next) {
    const isAuthenticated = localStorage.getItem('user_email');    
    if (to.name !== 'login' && !isAuthenticated) {
      next({ name: 'login' });
    } else {
      next(); 
    }
  }
  