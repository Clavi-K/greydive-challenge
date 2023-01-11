import Form from "./components/Form/Form"
import Container from "./components/Container/Container"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/responses" element={<Container />} />
      </Routes>
    </>
  );
}

export default App;
