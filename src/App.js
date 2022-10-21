import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginView from './views/LoginView';
import Register from './views/RegisterView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { completeSignIn, initialState, UserContext} from './config/ctx';
import React from 'react';
import { useNavigate } from "react-router-dom";

function App() {

  const [userState, setState] = React.useState(initialState());
  
  
  const authState = React.useMemo(() => {
    return ({
      userState, 
      signIn: async (response) => {
        completeSignIn(response, userState, setState);
        return true;
      }
    })
  });


  return (
    <div className="App flex-container">
      <UserContext.Provider value={authState} >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginView />} />
          <Route path='/registerUser' element={<Register />} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
