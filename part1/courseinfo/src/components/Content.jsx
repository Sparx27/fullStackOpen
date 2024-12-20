import Part from "./Part"

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts.part1} exercises={props.parts.exercises1} />
      <Part name={props.parts.part2} exercises={props.parts.exercises2} />
      <Part name={props.parts.part3} exercises={props.parts.exercises3} />
    </div>
  )
}

export default Content