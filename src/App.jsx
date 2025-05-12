import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// Typical Arrow Component Layout

// Arrow Component Functions are easier to read and write, improve code maintainability and simplify scope management.

const Card = () => {
  return (
    <div>
      <h2>Card Component</h2>
    </div>
  )
}

const App = () => {
  return (
    <>
      <h2>Functional Arrow Component</h2>

      <Card />
      <Card />
      <Card />
      <Card />
    </>
  )
}

export default App
