import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Dates from "./Components/Dates";
import CompletedTasks from "./Components/CompletedTasks";
import Footer from "./Components/Footer";
import Todo from "./Components/Todo";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<Dates />} />
        <Route path="/completed" element={<CompletedTasks />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
