import rootReducer from '../../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from '../../reducers/form-visible-reducer';
import ticketListReducer from '../../reducers/ticket-list-reducer';

let store = createStore(rootReducer);//we are creating a little Redux application in our tests that is separate from our React application. We are creating a store so we can dispatch a few actions and check that our reducers are working together.


describe("rootReducer", () => {

  test('Should return default state if no action type is recognized', () => {
    expect(rootReducer({}, { type: null })).toEqual({
      mainTicketList: {},
      formVisibleOnPage: false
    });
  });

  test('Check that initial state of formVisibleReducer matches root reducer', () => {
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, { type: null }));
  });//These are essentially "sanity checks" to make sure everything works together.

  //These tests will ensure that when we pass actions into our combined reducers, the root reducer reflects those changes.
  test('Check that ADD_TICKET action works for ticketListReducer and root reducer', () => {
    const action = {
      type: 'ADD_TICKET',
      names: 'Ryan & Aimen',
      location: '4b',
      issue: 'Redux action is not working correctly.',
      id: 1
    }
    store.dispatch(action);
    expect(store.getState().mainTicketList).toEqual(ticketListReducer(undefined, action));
  });
  
  test('Check that TOGGLE_FORM action works for formVisibleReducer and root reducer', () => {
    const action = {
      type: 'TOGGLE_FORM'
    }
    store.dispatch(action);
    expect(store.getState().formVisibleOnPage).toEqual(formVisibleReducer(undefined, action));
  });
  //In both of these tests, we dispatch an action. We then expect our root reducer to properly handle those actions by passing them into our individual reducers. The store's state slice should be updated accordingly — and should be equal to the return result of the individual reducer that handled the action.
  
});