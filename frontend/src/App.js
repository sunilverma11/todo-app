import Todo from "./components/Todo";
// import {TodoEdit} from "./components/TodoEdit";
// import { Routes, Route } from "react-router-dom";
import './App.css';

// import Modal from "./components/Edittodo";
function App() {
  return (
    // <>
    //   <Modal/>
    // </>
    <div className="App">
      <Todo/>
 {/* <Modal/> */}
     {/* <Routes>
     <Route path="/" element={<Todo/>}></Route>
     <Route path="/:todoid" element={<TodoEdit />}></Route>

      </Routes>  */}
    </div>
  );
}

export default App;
