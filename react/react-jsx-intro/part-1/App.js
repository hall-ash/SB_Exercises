const App = () => (
  <div>
    <FirstComponent text="My very first component"/>
    <NamedComponent name="Joe"/>
  </div>
)

ReactDOM.render(<App />, document.getElementById("root"))