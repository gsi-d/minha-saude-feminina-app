export function isPublicRoute(segment?: string) {
  return (
    segment === undefined ||
    segment === 'login' ||
    segment === 'cadastro' ||
    segment === 'cadastroGestante'
  );
}
