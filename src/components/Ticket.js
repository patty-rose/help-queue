import React from "react";
import PropTypes from "prop-types";

function Ticket(props){//props as an argument gives us access to the props in the parent component: 'TicketList'. You can see the props being instantiated in the React.Fragment JSX -- {props.lovation} - {props.names} etc.
  return (
    <React.Fragment>
      <h3>{props.location} - {props.names}</h3>
      <p><em>{props.issue}</em></p>
      <hr/>
    </React.Fragment>
  );
}

Ticket.propTypes = { //format to declare prop types-- requires import PropTypes statement
  //follows this key-value pair format: propertyName: PropTypes.propertyType
  //Note that PropTypes is capitalized here. This is because we are using the PropTypes library we've imported.When it's a property of the component, it should be lower camel case (Ticket.propTypes). When it's referring to the library we are importing, it should be upper camel case (names: PropTypes.string).
  names: PropTypes.string, //PropTypes.string.isRequired makes it required 
  location: PropTypes.string,
  issue: PropTypes.string
};

// //MyExampleComponent.propTypes = {
//   exampleArray: PropTypes.array,
//   exampleBoolean: PropTypes.bool,
//   exampleFunction: PropTypes.func,
//   exampleNumber: PropTypes.number,
//   exampleObject: PropTypes.object,
//   exampleString: PropTypes.string,
//   exampleSymbol: PropTypes.symbol,
//   exampleReactElement: PropTypes.element,
//   exampleArrayOfNumbers: PropTypes.arrayOf(PropTypes.number),
//   exampleArrayOfStrings: PropTypes.arrayOf(PropTypes.string),
//   exampleClassTypeProp: PropTypes.instanceOf(ExampleClassName),
// }


export default Ticket;