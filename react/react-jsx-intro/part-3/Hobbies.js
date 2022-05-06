const Hobbies = (props) => {
  return (
    <div>
      <h6>My hobbies are:</h6>
        <ul>{props.hobbies.map(h => <li>{h}</li>)}</ul>
    </div>
  )
  
}