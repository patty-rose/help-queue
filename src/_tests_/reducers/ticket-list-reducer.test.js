import ticketListReducer from '../../reducers/ticket-list-reducer';
import { formatDistanceToNow } from 'date-fns';

describe('ticketListReducer', () => {

  let action;//1.We declare an action but don't define it yet. Each of our new tests will define what the action should be (whether that is adding, updating, or deleting a ticket).
  const ticketData = {//2.We create a ticketData constant that provides ticket information for testing purposes.
    names: 'Ryan & Aimen',
    location: '4b',
    issue: 'Redux action is not working correctly.',
    timeOpen : new Date(),
    formattedWaitTime: formatDistanceToNow(new Date(), {
      addSuffix: true
    }),
    id: 1
  };

  const currentState = { //for Delete test
    1: {
      names: 'Ryan & Aimen',
      location: '4b',
      issue: 'Redux action is not working correctly.',
      id: 1 
    }, 2: {
      names: 'Jasmine and Justine',
      location: '2a',
      issue: 'Reducer has side effects.',
      id: 2 
    }
  }

  test('Should return default state if there is no action type passed into the reducer', () => {
    expect(ticketListReducer({}, { type: null })).toEqual({});
    // our reducer will take two arguments. The first argument is the current state while the second argument is an action that will be applied to the current state. Note that the action's type is stored inside an object. This object can potentially contain other things besides the name of the action itself. We will cover this further in the next lesson.
  });

  // test('Should successfully add new ticket data to mainTicketList', () => {
  //   const { names, location, issue, id } = ticketData;//use ES6 destructuring syntax to provide keys from our ticketData
  //   action = {//our reducer takes an object as an argument instead of just a string for the action type itself. Because it takes an object, it can take multiple key-value pairs that include additional information about the action the reducer will need to take.
  //     type: 'ADD_TICKET',
  //     names: names,
  //     location: location,
  //     issue: issue,
  //     id: id
  //   };

  //   expect(ticketListReducer({}, action)).toEqual({
  //     [id] : {
  //       names: names,
  //       location: location,
  //       issue: issue,
  //       id: id
  //     }
  //   });
  // });

  test('Should successfully delete a ticket', () => {
    action = {
      type: 'DELETE_TICKET',
      id: 1
    };
    expect(ticketListReducer(currentState, action)).toEqual({
      2: {
        names: 'Jasmine and Justine',
        location: '2a',
        issue: 'Reducer has side effects.',
        id: 2 
      }
    });
  });

  test('Should add a formatted wait time to ticket entry', () => {
    const { names, location, issue, timeOpen, id } = ticketData;
    action = {
      type: 'UPDATE_TIME',
      formattedWaitTime: '4 minutes ago',
      id: id
    };
    expect(ticketListReducer({ [id] : ticketData }, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        id: id,
        formattedWaitTime: '4 minutes ago'
      }
    });
  });

  test('should successfully add a ticket to the ticket list that includes date-fns-formatted wait times', () => {
    const { names, location, issue, timeOpen, formattedWaitTime, id } = ticketData;
    action = {
      type: 'ADD_TICKET',
      names: names,
      location: location,
      issue: issue,
      timeOpen: timeOpen,
      formattedWaitTime: formattedWaitTime,
      id: id
    };
    expect(ticketListReducer({}, action)).toEqual({
      [id] : {
        names: names,
        location: location,
        issue: issue,
        timeOpen: timeOpen,
        formattedWaitTime: 'less than a minute ago',
        id: id
      }
    });
  });


});