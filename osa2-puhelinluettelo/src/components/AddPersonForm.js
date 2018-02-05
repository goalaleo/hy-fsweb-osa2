import React from 'react'

const AddPersonForm = ({newName, newNumber, handleNewNumberChange, handleNewNameChange, addPerson}) => {
  return (
    <div>
      <h3>Lisää uusi</h3>
      <form>
        <div>
          nimi: <input
            value={newName}
            onChange={handleNewNameChange}
          />
        </div>
        <div>
          numero: <input
            value={newNumber}
            onChange={handleNewNumberChange}
          />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>lisää</button>
        </div>
      </form>
    </div>
  )
}

export default AddPersonForm
