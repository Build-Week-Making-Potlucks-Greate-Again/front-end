import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from 'styled-components'
import "./App.css";

import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Register from './components/Register'
import PotlucksList from "./components/PotlucksList";
import CreatePotLucks from "./pages/Create-Pot-Lucks";

const StyledLoginReg = styled.div`
margin-top: 2rem;
display:flex;
justify-content: space-evenly;

span {
  border: 1px solid grey;
}
.container {
  margin: 1rem;
}
.container form{
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: .5rem;
  label {
    margin: .25rem 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
`

function App() {
  return (
    <div className="App">
      <h1>Slow life</h1>
      <Router>
        <Route exact path='/' render={(props) => {
          return (
            <StyledLoginReg>
            <Login {...props}/>
            <span />
            <Register {...props}/>
            </StyledLoginReg>
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
