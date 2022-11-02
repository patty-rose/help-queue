//Ultimately, a reducer is just a pure function that contains a conditional. What the reducer does is dependent on the action passed in as an argument.

import * as c from './../actions/ActionTypes';


const reducer = (state = {}, action) => {//
  const { names, location, issue, id, formattedWaitTime, timeOpen } = action;
  switch (action.type) {//our switch will be based on the action.type. Because the action parameter takes an object, need to look at the action's type
  case 'ADD_TICKET':
    return Object.assign({}, state, {//use Object.assign() to clone the state object. for this to work correctly, Object.assign() must take three arguments: 1. {} empty object as first object means it will clone the object isntead of mutating it. 2. second argument is object that will be cloned-- current state. 3. 3rd argument is the change that will be made to our new copy. 
      [id]: {//creates new key-value pari in state obj. with id as key and value as ticket obj.
        names: names,
        location: location,
        issue: issue,
        id: id
      }
    });
  case 'DELETE_TICKET':
    let newState = { ...state };//make a copy of state
    delete newState[id];//delete tic from copy
    return newState;

  case 'UPDATE_TIME':
    const newTicket = Object.assign({}, state[id], {formattedWaitTime});//we use Object.assign() to grab the ticket that needs to be updated (we use state[id] to do this to get the specific ticket from the list of tickets). Object.assign() makes a copy of this ticket and then adds the formattedWaitTime to it. (Note that {formattedWaitTime} is an object with the formattedWaitTime key-value pair in it.
    const updatedState = Object.assign({}, state, {
      [id]: newTicket
    });//the old ticket will be replaced with the updated ticket.
    return updatedState;

  default:
    return state; //Our reducer hasn't altered anything. Instead, it made a copy of the state that was passed in as argument, altered the copy, and then returned the altered copy so it can be used elsewhere in our code.
  }

};
//our function has two parameters. The first is the state(state = {}) that will need to be changed while the second is the action that will be applied to that state.



export default reducer; //Note that our export statement includes default because this file will only have one function inside it — the reducer for our ticket list. That way, when we import the reducer into our test or anywhere else, we can store all the code directly inside a single variable such as ticketListReducer.