import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from 'styled-components'
import "./App.css";

import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Register from './components/Register'
import PotlucksList from "./components/PotlucksList";
import CreatePotLucks from "./pages/Create-Pot-Lucks";

const StyledLoginReg = styled.div`
max-width: 70rem;
margin: 2rem auto;
display:flex;
flex-flow: row wrap;
justify-content: space-evenly;

span {
  border: 1px solid grey;
  @media (max-width: 600px) {
    display: none;
  }
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
      <Router>
      <Header />
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
