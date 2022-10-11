import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');//save's the root div as a var -- 'container' because it will eventually contain all of our React components.
const root = ReactDOM.createRoot(container);//This creates a root Dom node inside of the div for React to render all of it's components to.
root.render( //inserts the React components into the DOM. we must pass in a single element. We pass in a react componenet nested inside of another RC, which counts as one element
  <React.StrictMode>
    <App />
  </React.StrictMode>
);//the React.StrictMode componenet is an optional comp. that we can wrap aroun dour parent comp. 'App'.This performs additional error checking on our whole React application but it doesn't print anything to the DOM. 
//<App /> is the parent comp. for our entire React Application. This will contain code printed to the DOM. and is in JSX syntax

//Once again, the root variable('container' in this code) represents the root DOM node that React uses to render its components, and it is located inside of the div with an id of 'root'.

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
