import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginView from './views/LoginView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { completeSignIn,  UserContext, initialState} from './config/ctx';
import React from 'react';
import { useNavigate } from "react-router-dom";
import Search from './views/SearchView';
import { getAuth, signOut } from 'firebase/auth';
import Rules from './views/RuleView';
import MetricsView from './views/MetricsView';
import TransactionsView from './views/TransactionsView';

console.log("Initiating app");

function App() {
  
  const [userState, setState] = React.useState(initialState());
  
  
  const authState = React.useMemo(() => {
    return ({
      userState, 
      signIn: async (response) => {
        completeSignIn(response, userState, setState);
        return true;
      },
      signOut: async () => {
        await signOut(getAuth());
        setState(initialState())
      },
      mantainState: async (state) => {
        setState(state)
      }
    })
  });


  return (
    <UserContext.Provider value={authState} >
        <div className="App flex-container">
        <Routes>
          <Route path='/' element={<LoginView />} />
          <Route path='/search' element={<Search />} />
          <Route path='/rules' element={<Rules />} />
          <Route path='/metrics' element={<MetricsView />} />
          <Route path='/transactions' element={<TransactionsView />} />
        </Routes>
    </div>
      </UserContext.Provider>
  );
}



export default App;
