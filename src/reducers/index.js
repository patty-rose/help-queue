//When a file is responsible for retrieving logic from other files in its directory and importing it all into one big module, it's known as a module index. Our index.js file will hold a root reducer that combines logic from all of our other reducer files — hence the naming convention.

import formVisibleReducer from './form-visible-reducer';
import ticketListReducer from './ticket-list-reducer';
import { combineReducers } from 'redux';//not part of react-redux. core redux. combineReducers() takes an object as an arg. That object contains key-value pairs that represent the state slice and the reducers

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  mainTicketList: ticketListReducer
});

export default rootReducer;
