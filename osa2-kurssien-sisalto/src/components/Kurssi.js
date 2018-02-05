import React from 'react'

const Kurssi = ({ kurssi }) => {
  return (
    <div>
      <Otsikko teksti={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa tehtavia={kurssi.osat.map(osa => osa.tehtavia)} />
    </div>
  )
}

const Otsikko = ({ teksti }) => {
  return (
    <h2>{teksti}</h2>
  )
}

const Sisalto = ({ osat }) => {
  return (
    <div>
      { osat.map(osa => <Osa key={osa.id} osa={osa} />) }
    </div>
  )
}

const Osa = ({ osa }) => {
  return (
    <p>{osa.nimi} {osa.tehtavia}</p>
  )
}

const Yhteensa = (props) => {
  return (
    <p>yhteensa {props.tehtavia.reduce((a,b) => a + b, 0)}</p>
  )
}

export default Kurssi
