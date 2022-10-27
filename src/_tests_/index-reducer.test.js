import rootReducer from '../reducers/index';
import { createStore } from 'redux';
import formVisibleReducer from './../reducers/form-visible-reducer';
import ticketListReducer from './../reducers/ticket-list-reducer';

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

});