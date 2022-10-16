import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';

class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false
    }; //default state of application is that the new ticket form is not visible
  }

  handleClick = () => {
    this.setState({formVisibleOnPage: true});//In its simplest form, setState() takes an object as an argument. The object contains any key-value pairs that our application should update.
  }
  ////The whole point of setState() is to allow React to do its job — which is to be a state management system that efficiently creates a virtual DOM and reconciles it with the actual DOM. 
  //The main issue with manipulating state directly like this: this.state = {property: update}, is that it will not cause the component to re-render as setState() would. If the component doesn't re-render, our changes to state won't create any change in the DOM. Always use the setState() method to update state in a pure React application.

  render(){ //class components always need a render method
    let currentlyVisibleState = null; //we declare a variable to hold the compoenent we want to return in our componenet fragments. It's null because we don't know yet. But below we determine which it is and set the variable to that react component-- just like other JS variables. and then call the variable in the react fragment below: {currentlyVisibleState}
    let addTicketButton = null;
    if (this.state.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm />
    } else {
      currentlyVisibleState = <TicketList />
      addTicketButton = <button onClick={this.handleClick}>Add ticket</button>//our onClick handler will trigger this.handleClick. As you can probably guess handleClick() is the function that will be called when the handler is triggered. But what is this? In this case, we are going to be rendering an object that's an instance of the TicketControl component. this refers to the specific instance that is being rendered.

      //Note that we don't use this with function components — just class components.
    }
    return ( //JSX inside return and JS outside
      <React.Fragment>
        {currentlyVisibleState}
        {addTicketButton}
      </React.Fragment>
    );
  }

}

export default TicketControl;

