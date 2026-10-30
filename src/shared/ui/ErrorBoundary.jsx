import { Component } from "react";
import { RefreshCw, TriangleAlert } from "lucide-react";
import { Btn } from "./Button.jsx";
import { Card } from "./Card.jsx";
import { Empty } from "./Feedback.jsx";

/* Contains a crashed page (or a page chunk that failed to load) so the rest
   of the shell keeps working. Give it a `key` that changes on navigation. */
export class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("Page crashed:", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <Card>
        <Empty icon={TriangleAlert} title="This screen could not be loaded"
          body={this.state.error.message}
          action={<Btn kind="g" icon={RefreshCw} onClick={() => window.location.reload()}>Reload</Btn>} />
      </Card>
    );
  }
}
