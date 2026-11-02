import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  //props is what parent gives to its children
  children: ReactNode;
}
//this interface tells ts that this class component will have children, which is react's valid element

interface ErrorBoundaryState {
  //is component's memory, at the beginning everything is (true/false) in this case false(all good:)
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  //OOP +ts:) this class we extend out, and create new class named ErrorBoundary
  //extends Componen means that ErrorBoundary is react's main component's child, since it receives react component as memkvidreoba:) so it can have its own life-cycle
  //ErrorBoundaryProps tells class what type will be received this.props
  //second one tells: what type will be its inner this.state
  state: ErrorBoundaryState = { hasError: false }; // create class which should be like Error...state, in react class component there is a rule that every state
  //should be an object (bix box:)

  static getDerivedStateFromError(): ErrorBoundaryState {
    //here we return object that changes state and turns fallback in render, static means whole class and not egzemplaire
    //when crashing react doesn't try to turn component it just calls this static function and asks return this object hasErr: true for state to change and fallback appear
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // print real error issue for development, it takes error itself and info what happend
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    //in class component render()is mandatory it manages what to appear on screen?
    if (this.state.hasError) {
      //this -means current component which is on screen just now
      //this.state means component's inner memory where we put object
      //this.state.hasError directly reads value meaning in state
      // fallback interface that appears after error
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
          <h1 className="text-2xl font-bold mb-2">Something went wrong.</h1>
          <p className="mb-4 text-muted">
            An unexpected error occurred on this page.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children; //current component - receive data - by props that parent gave, children-take that pages which are inside(ErrorBounday>) return them if no erro
  }
}
