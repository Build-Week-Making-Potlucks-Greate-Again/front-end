
import PotlucksList from './components/PotlucksList'
import './App.css';

import CreatePotLucks from './pages/Create-Pot-Lucks'

function App() {
  return (
    <div className="App">
      <h1>Slow life</h1>
      <PotlucksList />
      <CreatePotLucks/>
    </div>
  );
}

export default App;
