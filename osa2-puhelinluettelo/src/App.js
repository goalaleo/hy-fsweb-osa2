import React from 'react';
import People from './components/People'
import AddPersonForm from './components/AddPersonForm'
import NameSearch from './components/NameSearch'

import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      nameSearch: ''
    }
  }

  componentWillMount() {
    personService
      .getAll()
      .then(persons => {
        this.setState({ persons: persons })
      })
  }

  handleNewNameChange = (event) => {
    this.setState({
      newName: event.target.value
    })
  }

  handleNewNumberChange = (event) => {
    this.setState({
      newNumber: event.target.value
    })
  }

  handleQueryChange = (event) => {
    this.setState({
      nameSearch: event.target.value
    })
  }

  clearInputs = () => {
    this.setState({
      newName: '',
      newNumber: ''
    })
  }

  handleRemove = (id) => () => {
    if (window.confirm("Oletko varma poistosta?")) {
      personService
        .destroy(id)
        .then(data => {
          this.setState({
            persons: this.state.persons.filter(person => person.id !== id)
          })
        })
    }
  }

  addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const nameMatch = (existingPerson) => existingPerson.name === newPerson.name

    if (this.state.persons.find(nameMatch)) {
      alert("Tämä henkilö oli jo olemassa!")
      this.clearInputs()
    } else {
      personService
        .create(newPerson)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson)
          })
        })
    }
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <NameSearch
          nameSearch={this.state.nameSearch}
          handleQueryChange={this.handleQueryChange}
        />
        <AddPersonForm
          newName={this.state.newName}
          newNumber={this.state.newNumber}
          handleNewNameChange={this.handleNewNameChange}
          handleNewNumberChange={this.handleNewNumberChange}
          addPerson={this.addPerson}
        />
      <People handleRemove={this.handleRemove} persons={this.state.persons} nameSearch={this.state.nameSearch} />
      </div>
    )
  }
}

export default App
