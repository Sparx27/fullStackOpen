const Total = (props) => {
  const total = props.parts.reduce((a, current) => a + current.exercises, 0)

  return <p>Number of exercises {total}</p>
}

export default Total