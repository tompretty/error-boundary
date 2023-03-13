import React from "react";

// ---- Main page ---- //

class ErrorBoundaryPage extends React.Component {
  constructor(props: {}) {
    super(props);
    this.state = { error: undefined };
  }

  async componentDidMount() {
    try {
      throwError();
    } catch (error: unknown) {
      this.setState(() => {
        throw error;
      });
    }
  }

  render() {
    return <div>Hello, World!</div>;
  }
}


// ---- Export ---- //

const _Page = withErrorBoundary(ErrorBoundaryPage);
export { _Page as ErrorBoundaryPage };

// ---- Error boundary ---- //

interface ErrorBoundaryProps {
  children: JSX.Element | JSX.Element[];
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: unknown) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown, _errorInfo: unknown) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
    console.log("COMPDIDCATCH", { error });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// ---- HOC for adding error boundaries to pages ---- //

function withErrorBoundary(Page: React.ComponentType): React.ComponentType {
  const Wrapped = () => {
    return (
      <ErrorBoundary>
        <Page />
      </ErrorBoundary>
    );
  };

  return Wrapped;
}

// ---- Helpers ---- //

function throwError() {
  throw new Error("Ahhhhh!");
}
