const Person = ({name, age, hobbies}) => {
  const ageText = age >= 18 ? "please go vote!" : "you must be 18";
  
  return (
    <div>
      <p>Learn some information about this person:</p>
      <ul>
        <li>name: {name.slice(0, 6)}</li>
        <li>age: {age}</li>
        <Hobbies hobbies={hobbies}/>
      </ul>
      <p>{ageText}</p>
    </div>
  )
}