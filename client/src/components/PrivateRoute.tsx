import { useEffect, FC, ReactNode, PropsWithChildren, Fragment } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/Auth";
import { PrivateRouteProps } from "../types";

const PrivateRoute = ({
  protectedRoutes,
  authRoutes,
  children,
}: PrivateRouteProps) => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const pathIsProtectedRoute = protectedRoutes?.indexOf(router.pathname) !== -1;
  const pathIsAuthRoute = authRoutes?.indexOf(router.pathname) !== -1;

  useEffect(() => {
    if (!isLoading && !user && pathIsProtectedRoute) {
      router.push("/");
    }
    if (!isLoading && user && pathIsAuthRoute) {
      router.push("/dashboard");
    }
  }, [isLoading, user, pathIsProtectedRoute]);

  if ((isLoading || !user) && pathIsProtectedRoute) return <>Loading...</>;

  return <Fragment>{children}</Fragment>;
};

export default PrivateRoute;
