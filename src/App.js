import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Register from './components/Register'
import PotlucksList from "./components/PotlucksList";
import CreatePotLucks from "./pages/Create-Pot-Lucks";


function App() {
  return (
    <div className="App">
      <h1>Slow life</h1>
      <Router>
        <Route exact path='/' render={(props) => {
          return (
            <>
            <Login {...props}/>
            <Register {...props}/>
            </>
          )
        }}/>
        <PrivateRoute path='/potlucks' component={PotlucksList}/>
        <PrivateRoute path='/create-potluck' render={(props) => {
          return (
            <CreatePotLucks {...props}/>
          )
        }} />
      </Router>
    </div>
  );
}

export default App;
