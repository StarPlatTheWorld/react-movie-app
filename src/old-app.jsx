import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

// Typical Arrow Component Layout
// Arrow Component Functions are easier to read and write, improve code maintainability and simplify scope management.
// Props can be numbers, booleans, or even complex problems.

const Card = ({ title }) => { //Props are rendered in the component arrow fuction between ({})

  //State is incredibly important and holds information about components that could change.
  //State that destructures an array. Anything using 'use' is typically a hook. set function always uses previous variable name, e.g. [variableName, setVariableName].
  //Button state is initially set to false. React refreshes componenets on browser reloads, but React also re-renders components when states change.
  const [count, setCount] = useState(0)
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`)
  }, [hasLiked]);

  return (
    <div className='card' onClick={() => setCount(count + 1)}>
      {/* Props are typically used to pass data from a parent component to a child component. */}
      <h2>{title} <br/> {count || null}</h2> {/* Conditionally rendering the count to only show when count is not null */}
      {/* Button state is dynamically changable to liked or unliked. */}
      <button onClick={() => setHasLiked(!hasLiked)}>
       {hasLiked ? '❤️' : '🤍'}
      </button> 
    </div>
  )
}

const oldApp = () => {

  return (
    <div className='card-container'>
      <Card title="Star Wars" />
      <Card title="Avatar" />
      <Card title="Lion King" />
      <Card title="Peter Pan" />
    </div>
  )
}