import React from 'react'
import Note from './components/Note'

import noteService from './services/notes'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      newNote: '',
      showAll: true
    }
  }

  componentDidMount() {
    noteService
      .getAll()
      .then(notes => {
        this.setState({ notes })
      })

  }

  addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNote,
      date: new Date(),
      important: Math.random() > 0.5
    }

    noteService.create(noteObject)
      .then(note => {
        this.setState({
          notes: this.state.notes.concat(note),
          newNote: ''
        })
      })
  }

  handleNoteChange = (event) => {
    this.setState({ newNote: event.target.value })
  }

  toggleVisible = () => {
    this.setState({showAll: !this.state.showAll})
  }

  toggleImportanceOf = (id) => {
    return () => {
      const note = this.state.notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      noteService
        .update(id, changedNote)
        .then(changedNote => {
          this.setState({
            notes: this.state.notes.map(note => note.id !== id ? note : changedNote)
          })
        })
    }
  }

  render() {
    const notesToShow =
      this.state.showAll ?
        this.state.notes :
        this.state.notes.filter(note => note.important)

    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    return (
      <div>
        <h1>Muistiinpanot</h1>
        <div>
          <button onClick={this.toggleVisible}>
            näytä {label}
          </button>
        </div>
        <ul>
          {
            notesToShow.map(note =>
              <Note
                toggleImportance={this.toggleImportanceOf(note.id)}
                key={note.id}
                note={note}
              />
            )
          }
        </ul>
        <form onSubmit={this.addNote}>
          <input
            value={this.state.newNote}
            onChange={this.handleNoteChange}
          />
          <button type="submit">tallenna</button>
        </form>
      </div>
    )
  }
}

export default App
