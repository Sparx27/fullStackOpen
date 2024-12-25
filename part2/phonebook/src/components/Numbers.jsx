import Person from "./Person"

const Numbers = ({ personsToShow }) => {
  return (
    <>
      <h2>Numbers</h2>
      {personsToShow.map(p => <Person key={p.id} data={p} />)}
    </>
  )
}

export default Numbers