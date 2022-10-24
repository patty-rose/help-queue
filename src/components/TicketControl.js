import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import DebuggingLesson from './DebuggingLesson';
import AskPair from './AskPair';
import FifteenMins from './FifteenMins';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import PropTypes from "prop-types";

import { connect } from 'react-redux';//for redux and connecting this component to our store

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      formVisibleOnPage: false, //local state
      selectedTicket: null,
      editing: false,
      debuggingLesson: false,
      pair: false,
      fifteenMins: false, 
    }; //default state of application is that the new ticket form is not visible
  }

  handleAddTicketClick = () => { //arrow notation binds it to it's lexical scope, specifically binds it to what "this" refers to when handleClick is called on a event listener that is created after this scope of code.
    //this.setState({formVisibleOnPage: true}); w/o referring to previous state
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage//We pass in the current state of the formVisibleOnPage boolean to prevState. Now that we know this value, we can say the new state should be !prevState.formVisibleOnPage (the opposite of the old state).

    }));//In its simplest form, setState() takes an object as an argument. The object contains any key-value pairs that our application should update.
  }
  ////The whole point of setState() is to allow React to do its job — which is to be a state management system that efficiently creates a virtual DOM and reconciles it with the actual DOM. 
  //The main issue with manipulating state directly like this: this.state = {property: update}, is that it will not cause the component to re-render as setState() would. If the component doesn't re-render, our changes to state won't create any change in the DOM. Always use the setState() method to update state in a pure React application.

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);//This automatically dispatches our action and updates the store 
    this.setState({formVisibleOnPage: false});
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }//This is the power of mapStateToProps: we don't have to do any fancy additional code to get a specific state slice from the store. We can just use this.props — as long as we've defined the state slice we want to map in our mapStateToProps function literal.

  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id
    }
    dispatch(action);
    this.setState({selectedTicket: null});
  }

  handleDebuggingYesClick = () => {
    this.setState(prevState => ({
      debuggingLesson: !prevState.debuggingLesson
    }));
  }
  handlePairYesClick = () => {
    this.setState(prevState => ({
      pair: !prevState.pair
    }));
  }

  handleFifteenMinsYesClick = () => {
    this.setState(prevState => ({
      fifteenMins: !prevState.fifteenMins
    }));
  }

  handleResetClick = () => {
    this.setState({formVisibleOnPage: false, debuggingLesson: false, pair: false, fifteenMins: false, selectedTicket: null, editing: false});
  }

  render(){ //class components always need a render method
    let currentlyVisibleState = null; //we declare a variable to hold the compoenent we want to return in our componenet fragments. It's null because we don't know yet. But below we determine which it is and set the variable to that react component-- just like other JS variables. and then call the variable in the react fragment below: {currentlyVisibleState}
    let button = null;
    let buttonText = null;
    let noButton = null;
    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
      button = <button onClick={this.handleResetClick}>{buttonText}</button>;
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} onClickingDelete = {this.handleDeletingTicket} onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
      button = <button onClick={this.handleResetClick}>{buttonText}</button>;
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    } else if (this.state.formVisibleOnPage) {
      if (!this.state.debuggingLesson){
        currentlyVisibleState = <DebuggingLesson />;
        buttonText = "Yes!";
        button = <button onClick={this.handleDebuggingYesClick}>{buttonText}</button>;
        noButton = <button onClick={this.handleResetClick}>No</button>;
      } else if(!this.state.pair){
        currentlyVisibleState = <AskPair />;
        buttonText = "Yes!";
        button = <button onClick={this.handlePairYesClick}>{buttonText}</button>;
        noButton = <button onClick={this.handleResetClick}>No</button>;
      } else if(!this.state.fifteenMins){
        currentlyVisibleState = <FifteenMins />;
        buttonText = "Yes!";
        button = <button onClick={this.handleFifteenMinsYesClick}>{buttonText}</button>;
        noButton = <button onClick={this.handleResetClick}>No</button>;
      } else {
        currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />; //pass our parent method to our child component as a property called 'onNewTicketCreation'. This differentiates the method in our parent component (which will actually handle the event) from the function in our child component (which is triggered when the event happens).
        buttonText = "Return to Ticket List";
        button = <button onClick={this.handleResetClick}>{buttonText}</button>;
      }
    } else {
      currentlyVisibleState = <TicketList ticketList={this.props.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;//passing mainTicketList into the child component as a property.
      buttonText = "Add Ticket";
      button = <button onClick={this.handleAddTicketClick}>{buttonText}</button>;
    }

    return ( //JSX inside return and JS outside
      <React.Fragment>
        {currentlyVisibleState}
        {button}
        {noButton}
        {/* //our onClick handler will trigger this.handleClick.
        //Note that we don't use this with function components — just class components. */}
      </React.Fragment>
    );
  }

}

TicketControl.propTypes = {
  mainTicketList: PropTypes.object
};

const mapStateToProps = state => {
  return {
    mainTicketList: state//// Key-value pairs of state to be mapped from Redux to React component go here.
  }
}

// The key-value pairs determine the state slices that should be mapped to the component's props. In our case, we want mainTicketList from the store to be mapped to TicketControl's props.

// Then we need to pass our newly-defined mapStateToProps function into the connect() function:

TicketControl = connect(mapStateToProps)(TicketControl);//// Note: we are now passing mapStateToProps into the connect() function.
//using that connet to connect this comp to Redux and our Redux store. it's important that connect() is called right before we export TicketControl. That ensures that the component that's exported has all necessary React Redux functionality.


export default TicketControl;

