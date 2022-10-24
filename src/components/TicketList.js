import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";//need to import since we are using props passed in and need to add a propTypes object

function TicketList(props){
  return (
    <React.Fragment>
      <hr/>
      {Object.values(props.ticketList).map((ticket) => //the Object.values() method grabs all the values from the object. Once we have the values, we can map over them.
        <Ticket
          whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          id={ticket.id}
          key={ticket.id}/> //each child in an array or itterator should have a unique "key" prop. It makes our application more efficient because it helps React differentiate between similar components.
      )}
    </React.Fragment>
  );
}

// Add propTypes for ticketList.
TicketList.propTypes = {
  ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func
};

export default TicketList;

