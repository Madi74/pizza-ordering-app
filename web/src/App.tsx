import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Dishes from "./container/Dishes/Dishes";
import AddDish from "./components/AddDish/AddDish";
import Orders from "./components/Orders/Orders";

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Dishes/>}/>
        <Route path="/add-dish" element={<AddDish/>}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;