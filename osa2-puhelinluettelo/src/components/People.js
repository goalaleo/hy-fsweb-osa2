import React from 'react'

const People = ({ persons, nameSearch, handleRemove }) => {
  return (
    <div>
      <h2>Numerot</h2>
      <table>
        <tbody>
          {
            persons.filter((person) => {
              return nameSearch.length === 0 ? true : new RegExp(nameSearch, "i").test(person.name)
            }).map(person => <Person key={person.id} person={person} handleRemove={handleRemove} />)
          }
        </tbody>
      </table>
    </div>
  )
}



const Person = ({ person, handleRemove }) => {
  return (
    <tr>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td><button onClick={handleRemove(person.id)}>poista</button></td>
    </tr>
  )
}

export default People
