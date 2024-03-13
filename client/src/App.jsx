import React from 'react'
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = '/' element = { <Home/>} />
          <Route path = '/register' element = { <Signup/> } />
          <Route path = '/login' element = { <Login /> }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;