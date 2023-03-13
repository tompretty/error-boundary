import React from "react";

// ---- Main page ---- //

interface ThrowErrorPageProps {}

interface ThrowErrorPageState {
	data?: string;
	notFound: boolean;
}

export class ThrowErrorPage extends React.Component<
  ThrowErrorPageProps,
  ThrowErrorPageState
> {
  constructor(props: {}) {
    super(props);
    this.state = { notFound: false };
  }

  async componentDidMount() {
    try {
      const data = await fetchData();

			this.setState({ data });

    } catch (error: unknown) {
      // We only explicitly handle HTTP errors
      // so bubble anything else on up
      if (!(error instanceof HttpError)) {
        throw error;
      }

      if (error.errorCode === 404) {
        this.setState({ notFound: true });
      }
    }
  }

  render() {
    if (this.state.notFound) {
			return <div>Not found</div>;
    }

    return <div>Hello, World!</div>;
  }
}

// ---- Helpers ---- //

class HttpError extends Error {
  errorCode: number;

  constructor(msg: string, errorCode: number) {
    super(msg);

    this.errorCode = errorCode;
  }
}

function fetchData(): string {
  if (shouldFail) {
		throw new HttpError("Failed to fetch foo", 404);
  }
  return "foo";
}

const shouldFail = true;
