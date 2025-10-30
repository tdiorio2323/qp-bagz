import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service in production
    if (import.meta.env.MODE === "production") {
      // TODO: Add error reporting service (Sentry, LogRocket, etc.)
    } else {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-white/70 mb-6">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            {import.meta.env.MODE === "development" && this.state.error && (
              <details className="text-left bg-black/30 rounded-lg p-4 mb-4">
                <summary className="cursor-pointer text-sm text-white/60 mb-2">
                  Error details (dev only)
                </summary>
                <pre className="text-xs text-red-400 whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl px-6 py-3 font-bold bg-[hsl(60,100%,50%)] text-black hover:bg-[hsl(60,100%,45%)]"
            >
              Refresh Page
            </button>
            <a
              href="/"
              className="block mt-3 text-white/70 hover:text-white underline"
            >
              Or return to home
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
