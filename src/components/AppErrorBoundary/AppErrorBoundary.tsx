import type { ReactNode } from "react";
import { Component } from "react";

import AppErrorFallback from "@/components/AppErrorFallback/AppErrorFallback";

type Props = { children: ReactNode };

type State = { hasError: boolean };

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error("Global app crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) return <AppErrorFallback />;
    return this.props.children;
  }
}
