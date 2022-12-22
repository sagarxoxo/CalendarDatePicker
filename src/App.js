import logo from "./logo.svg";
import "./App.css";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import CalendarDatePicker from "./Components/CalendarDatePicker";

function App() {
  return (
    <div className="App">
      <CalendarDatePicker />
    </div>
  );
}

export default App;
