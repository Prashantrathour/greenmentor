import logo from './logo.svg';
import './App.css';
import MainRoute from './MainRoute';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <div className='mt-20'>
     <MainRoute/>

      </div>
    </div>
  );
}

export default App;
