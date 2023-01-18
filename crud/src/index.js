import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Container from './Container';
import ContainerLocal from './ContainerLocal';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {
      /*
      *Container component uses mock json-server as db
      *It also includes API calls
      *To run:
      *clone the code in local
      *npm start
      *run json-server: json-server --watch db.json --port 8000
      *uncomment the Component
      */
      /* <Container /> */
    }
    <ContainerLocal />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
