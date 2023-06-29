import { Tile } from "./MyComponent";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Tile tile={{ pos: { x: 10, y: 10 } }} />
    </div>
  );
}

export default App;
