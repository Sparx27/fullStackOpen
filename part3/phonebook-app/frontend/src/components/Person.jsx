const Person = ({ data, actions }) => {
  const { id, name, number } = data
  const { onDeletePerson } = actions

  function handleClick(e) {
    if(confirm(`Please confirm to delete ${name} ${number}`)) onDeletePerson(id)
  }
  
  return (
    <tr>
      <td style={{paddingRight: "5px"}}>{name}</td>
      <td style={{paddingRight: "5px"}}>{number}</td>
      <td>
        <button onClick={handleClick}>delete</button>
      </td>
    </tr>
  )
}

export default Person