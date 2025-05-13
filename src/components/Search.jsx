import React from 'react'

//Props can be treated like objects and destructured within functions, allowing the removal of props. within the function.//
//Props should not be edited/changed by the child component and should be read only. Doing otherwise can cause conflicts on other pages.//
const Search = ({searchTerm, setSearchTerm}) => {
  return (
    <div className='search'>
        <div>
            <img src='search.svg' alt='search'/>

            <input
                type='text'
                placeholder='Search through thousands of movies'
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)} //onChange handler causes an event that targets the value of the input when a change happens such as key being pressed
            />
        </div>
    </div>
  )
}

export default Search