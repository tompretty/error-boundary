import React from "react";
import { Result, err, ok } from "neverthrow";

// ---- Main page ---- //

interface ResultTypePageProps {}
interface ResultTypePageState {
  data?: string;
  notFound: boolean;
}

export class ResultTypePage extends React.Component<
  ResultTypePageProps,
  ResultTypePageState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      notFound: false,
    };
  }

  async componentDidMount() {
    const result = await fetchData();

    if (result.isOk()) {
			// Inside of here we now have access to `.value`
			// as we have narrowed the type down to an Ok
      this.setState({ data: result.value });
    } else {
      this.setState({ notFound: true });
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

interface HttpError {
  errorCode: number;
}

type FetchDataResult = Result<string, HttpError>;

function fetchData(): FetchDataResult {
  if (shouldFail) {
    return err({ errorCode: 404 });
  }
  return ok("foo");
}

const shouldFail = true;
