import React from "react";
import Header from "./Header";
import TicketList from "./TicketList";

function App(){
  return ( //React.Fragment allows us to return multiple elements-- all the code in a function component's return statement must be wrapped in a single JSX element. Typically, that will be a <div> or a <React.Fragment>.
  //the elements are mostly standard HTML -- this is actually JSX syntax which recognizes HTML and, under the hood, uses React.createElement() to create this.
    <React.Fragment>
      <Header />
      <TicketList />
    </React.Fragment>
  );
}

export default App;