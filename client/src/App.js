import React, { Component } from 'react'
import './App.css'
import { MyCalendar } from './Components/MyCalendar.js'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='header'>
          <h1>Calendar App</h1>
        </div>
        <MyCalendar />
      </div>
    )
  }
}

export default App
