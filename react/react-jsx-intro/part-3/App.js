const App = () => (
  <div>
    <Person age={18} name="Jo" hobbies={["reading", "writing", "singing"]}/>
    <Person age={17} name="Johnsonny" hobbies={["reading", "writing", "singing"]}/>
    <Person age={19} name="Johnsonn" hobbies={["reading", "writing", "singing"]}/>
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))