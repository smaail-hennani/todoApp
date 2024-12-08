import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Récupérer le token d'auth
  const token = localStorage.getItem('token');

  // Si un token existe, ajouter le header Authorization à la requête
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Passer la requête clonée avec le token dans l'en-tête
    return next(clonedReq);
  }
  return next(req);
};
