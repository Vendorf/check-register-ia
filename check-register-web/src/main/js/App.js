import React from 'react';
import logo from './logo.svg';
import './App.css';

import CheckRowComponent from './main/CheckRowComponent';
import CheckTableComponent from './main/CheckTableComponent';
import AccountPaneComponent from './main/AccountPaneComponent';
import SummaryComponent from './main/SummaryComponent';
import Main from './main/Main';

function App() {

  return (
    <Main/>
  );

  // return (
  //   <AccountPaneComponent>
  //     <div className="App">
  //       <CheckTableComponent/>
  //       <SummaryComponent/>
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <p>
  //           Edit <code>src/App.js</code> and save to reload.
  //         </p>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //       <CheckRowComponent />
  //     </div>
  //   </AccountPaneComponent>
  // );
}

export default App;
