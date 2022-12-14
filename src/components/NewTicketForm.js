import React from "react";
import PropTypes from "prop-types";
import { v4 } from 'uuid'; //for creating id's
import ReusableForm from "./ReusableForm";
import { formatDistanceToNow } from 'date-fns';

function NewTicketForm(props){

  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    props.onNewTicketCreation({ 
      names: event.target.names.value, 
      location: event.target.location.value, 
      issue: event.target.issue.value, 
      id: v4(),
      //We create an object with all of the ticket properties and pass it as the argument to props.onNewTicketCreation(). We also create a unique ID with the UUID library.
      //if these were numbers we would need to parse: parseInt(event.target.numberOfQuestions)
      timeOpen: new Date(),
      formattedWaitTime: formatDistanceToNow(new Date(), {
        addSuffix: true
      })//set to the formatted elapsed time since the ticket was opened.
    });
  }

  return (
    <React.Fragment>
      <ReusableForm 
        formSubmissionHandler={handleNewTicketFormSubmission}
        buttonText="Help!" />
    </React.Fragment>
  );
}

NewTicketForm.propTypes = {
  onNewTicketCreation: PropTypes.func //this.handleAddingNewTicketToList is passed down to the child component as onNewTicketCreation

  //Because a function component doesn't have this as a reference like a class component, we need to directly refer to the props passed into the function component. That's why we do props.onNewTicketCreation() instead of this.onNewTicketCreation() (as we'd do if this were a class component).
};

export default NewTicketForm;