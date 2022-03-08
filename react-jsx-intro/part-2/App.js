const App = () => (
  <div>
    <Tweet username="joe66" name="Joe" message="Hi there." date={new Date().toDateString()}/>
    <Tweet username="joe666" name="Joe2" message="Hi there guys." date={new Date().toDateString()}/>
    <Tweet username="joe6666" name="Joe3" message="Hi there gals." date={new Date().toDateString()}/>
  </div>
)

ReactDOM.render(<App />, document.getElementById("root"))