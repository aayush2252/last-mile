import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
// put header and footer here
class App extends PureComponent {
  render() {
    const { children } = this.props || {};
    return (
      <div className="App">
        <Header />
        {children}
      </div>
    );
  }
}

export default withRouter(App);
