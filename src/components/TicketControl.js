import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import DebuggingLesson from './DebuggingLesson';
import AskPair from './AskPair';
import FifteenMins from './FifteenMins';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mainTicketList: [],
      formVisibleOnPage: false,
      debuggingLesson: false,
      pair: false,
      fifteenMins: false, 
    }; //default state of application is that the new ticket form is not visible
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket);//push alters array, concat creates new array-- concat is more functional
    this.setState({
      mainTicketList: newMainTicketList,
      formVisibleOnPage: false 
    });
  }

  handleAddTicketClick = () => { //arrow notation binds it to it's lexical scope, specifically binds it to what "this" refers to when handleClick is called on a event listener that is created after this scope of code.
    //this.setState({formVisibleOnPage: true}); w/o referring to previous state
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage//We pass in the current state of the formVisibleOnPage boolean to prevState. Now that we know this value, we can say the new state should be !prevState.formVisibleOnPage (the opposite of the old state).

    }));//In its simplest form, setState() takes an object as an argument. The object contains any key-value pairs that our application should update.
  }
  ////The whole point of setState() is to allow React to do its job — which is to be a state management system that efficiently creates a virtual DOM and reconciles it with the actual DOM. 
  //The main issue with manipulating state directly like this: this.state = {property: update}, is that it will not cause the component to re-render as setState() would. If the component doesn't re-render, our changes to state won't create any change in the DOM. Always use the setState() method to update state in a pure React application.

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
    this.setState({formVisibleOnPage: false, debuggingLesson: false, pair: false, fifteenMins: false});
  }

  render(){ //class components always need a render method
    let currentlyVisibleState = null; //we declare a variable to hold the compoenent we want to return in our componenet fragments. It's null because we don't know yet. But below we determine which it is and set the variable to that react component-- just like other JS variables. and then call the variable in the react fragment below: {currentlyVisibleState}
    let button = null;
    let buttonText = null;
    let noButton = null;
    if (this.state.formVisibleOnPage) {
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
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} />;//passing mainTicketList into the child component as a property.
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

export default TicketControl;

