import Person from "./Person"

const Numbers = ({ personsToShow, actions }) => {
  return (
    <section>
      <h2>Numbers</h2>

      <table>
        <tbody>
          {personsToShow && personsToShow.map(p => <Person key={p.id} data={p} actions={actions} />)}
        </tbody>
      </table>
    </section>
  )
}

export default Numbers