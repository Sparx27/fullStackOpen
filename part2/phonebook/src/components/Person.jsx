
const Person = ({ data }) => {
  const { name, number } = data
  
  return (
    <div>
      <p>{name} {number}</p>
    </div>
  )
}

export default Person