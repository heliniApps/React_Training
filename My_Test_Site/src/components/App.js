import "./styles.css";

import React from "react";

import FancyPointer from "./FancyPointer";
import Header from "./Header";
import Main from "./Main";

const App = () => {
  return (
    <React.Fragment>
      <FancyPointer />
      <Header ownerName="Helini" />
      <Main />
    </React.Fragment>
  );
};

export default App;
