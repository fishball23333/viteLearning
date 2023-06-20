
import './App.css'
import KanbanBoard from './components/KanbanBoard'
import Navigation from './components/Navigation'
import History from './components/History'
import Order from './components/Order'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
/* eslint-disable react/prop-types*/
  return (
    <>
      <Router>
        <Navigation/>

          <Routes>
            <Route path='/' element={<KanbanBoard/>}></Route>
            <Route path="/kanban" element={<KanbanBoard/>}></Route>
            <Route path="/order" element={<Order/>}></Route>
            <Route path="/history" element={<History/>}></Route>
          </Routes>


      </Router>
    </>
  )
}

export default App
