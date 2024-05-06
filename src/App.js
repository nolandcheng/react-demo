import logo from "./logo.svg"
import "./App.css"
import classes from "./App.module.css"
import HelloWorld from "./compoents/HelloWorld"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HelloWorld></HelloWorld>
      </header>
    </div>
  )
}

export default App
