import "../styles.css";

import React from "react";

import Header from "./Header";
import Main from "./Main";

const App = () => {
  return (
    <React.Fragment>
      <Header ownerName="Helini" />
      <Main />
    </React.Fragment>
  );
};

export default App;
