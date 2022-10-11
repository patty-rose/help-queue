import React from "react";

function Ticket(props){//props as an argument gives us access to the props in the parent component: 'TicketList'. You can see the props being instantiated in the React.Fragment JSX -- {props.lovation} - {props.names} etc.
  const name = "Thato";
  const name2 = "Haley";
  return (
    <React.Fragment>
      <h3>{props.location} - {props.names}</h3>
      <p><em>{props.issue}</em></p>
      <hr/>
    </React.Fragment>
  );
}

export default Ticket;