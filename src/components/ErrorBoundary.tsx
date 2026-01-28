import React from "react";

interface State {
  hasError: boolean;
  error?: Error | null;
  resetKey: number;
}

interface Props {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, resetKey: 0 };
    this.reset = this.reset.bind(this);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error } as Partial<State>;
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // TODO: send to telemetry service
    console.error("Uncaught error:", error, info);
    try {
      import("@/lib/telemetry")
        .then((telemetry) => {
          try {
            telemetry.captureException?.(error);
          } catch {
            // ignore
          }
        })
        .catch(() => {
          // ignore
        });
    } catch {
      // ignore if telemetry missing
    }
  }

  reset() {
    this.setState((s) => ({ hasError: false, error: null, resetKey: s.resetKey + 1 }));
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-card p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">Algo deu errado</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Ocorreu um erro inesperado. Você pode tentar recarregar a página ou contatar o
              suporte.
            </p>
            <div className="flex gap-2">
              <button className="btn" onClick={() => window.location.reload()}>
                Recarregar
              </button>
              <button className="btn-outline" onClick={this.reset}>
                Tentar novamente
              </button>
            </div>
            <details className="mt-4 text-xs text-muted-foreground">
              <summary>Detalhes do erro</summary>
              <pre className="whitespace-pre-wrap">{String(this.state.error)}</pre>
            </details>
          </div>
        </div>
      );
    }

    // Key ensures children remount when reset is called
    return <React.Fragment key={this.state.resetKey}>{this.props.children}</React.Fragment>;
  }
}

export default ErrorBoundary;
