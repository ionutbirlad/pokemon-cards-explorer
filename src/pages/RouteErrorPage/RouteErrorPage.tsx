import { useRouteError } from "react-router-dom";

import AppErrorFallback from "@/components/AppErrorFallback/AppErrorFallback";

export default function RouteErrorPage() {
  const error = useRouteError();
  console.error("Route error:", error);

  return <AppErrorFallback />;
}
