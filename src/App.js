import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginView from './views/LoginView';
import Register from './views/RegisterView';

function App() {
  return (
    <div className="App flex-container">
      <LoginView />
    </div>
  );
}

export default App;
