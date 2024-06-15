import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import AddCoffee from './components/AddCoffee';
import Coffees from './components/Coffees';
import EditCoffeeDetail from './components/EditCofeeDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coffees />} />
        <Route path='/addcoffee' element={<AddCoffee/>}/>
        <Route path="/editcoffee/:id" element={<EditCoffeeDetail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
