import React from 'react'

const NameSearch = ({ nameSearch, handleQueryChange }) => {
  return (
    <div>
      rajaa näytettäviä: <input
      value={nameSearch}
      onChange={handleQueryChange}
      />
    </div>
  )
}

export default NameSearch
