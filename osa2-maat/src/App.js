import React from 'react';

import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      query: '',
      selectedCountry: {}
    }
  }

  componentWillMount() {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleQueryStringChange = (event) => {
    this.setState({
      query: event.target.value,
      selectedCountry: {}
    })
  }

  queryFilter = (object) => {
    return (
      this.state.query.length === 0 ?
        false :
        new RegExp(this.state.query, "i").test(object.name)
    )
  }

  handleCountryClick = (event) => {
    this.setState({
      selectedCountry: this.state.countries.find(country => {
        return country.alpha3Code === event.target.dataset.countryCode
      })
    })
  }

  render() {
    return (
      <div>
        <SearchField query={this.state.query} handleChange={this.handleQueryStringChange} />
        <CountryListOrSpecificCountry
          countries={this.state.countries}
          queryFilter={this.queryFilter}
          handleCountryClick={this.handleCountryClick}
          selectedCountry={this.state.selectedCountry}
          />
      </div>
    )
  }
}

const CountryListOrSpecificCountry = ({countries, queryFilter, handleCountryClick, selectedCountry}) => {
  if (Object.keys(selectedCountry).length !== 0) {
    return (
      <SpecificCountry
        country={selectedCountry}
      />
    )
  } else {
    return (
      <CountryList
        countries={countries.filter(queryFilter)}
        handleCountryClick= {handleCountryClick}
      />
    )
  }
}

const SearchField = ({ query, handleChange }) => {
  return (
    <div>
      find countries: <input
      value={query}
      onChange={handleChange}
      />
    </div>
  )
}

const CountryList = ({ countries, handleCountryClick }) => {
  if (countries.length > 9) {
    return  <p>too many matches, be more specific</p>
  } else if (countries.length > 1 && countries.length < 9) {
    return (
      countries.map(country =>
        <CountryListItem
          key={country.alpha3Code}
          country={country}
          handleCountryClick={handleCountryClick}
        />
      )
    )
  } else if (countries.length === 1) {
    return <SpecificCountry country={countries[0]} />
  } else if (countries.length === 0) {
    return <p>waiting for input...</p>
  }
}

const CountryListItem = ({ country, handleCountryClick}) => {
  return (
    <li data-country-code={country.alpha3Code} onClick={handleCountryClick}>
      {country.name}
    </li>
  )
}

const SpecificCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name} {country.nativeName}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img
        src={country.flag}
        alt={"flag of " + country.name}
        width="300"
      />
    </div>
  )
}

export default App
