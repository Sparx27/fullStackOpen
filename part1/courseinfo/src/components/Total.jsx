const Total = (props) => {
  const total = props.exercises.exercises1 + props.exercises.exercises2 + props.exercises.exercises3

  return <p>Number of exercises {total}</p>
}

export default Total