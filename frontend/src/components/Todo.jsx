import React from "react";
import "./Todo.css";
import "./Modal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addTodo, getTodo } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";

//********************************* */
function Todo() {
  const { dataz } = useSelector((store) => {
    return store.todos;
  });
  const [text, setText] = useState("");
  const [date1, setDate] = useState("");
  const [deleted, setDeleted] = useState("");
  /****************** */

  const [txt, settxt] = useState();
  const [dt, setDt] = useState();
  const [upt, setUpt] = useState(1);
  const [todoid, setTodoid] = useState("");

  useEffect(() => {
    getFunc()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, [upt,deleted]);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const dispatch = useDispatch();

  // useEffect(() => {
  //   getFunc();
  // }, [ deleted ]);

  // useEffect(() => {
  //   getFunc();
  // }, []);

  // Get Function for get data from database
  const getFunc = () => {
    axios
      .get("http://localhost:5432/todo/")
      .then(({ data }) => {
        dispatch(getTodo(data));
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // editHandler for update title of todoitem using api sending data to database
  function editHandle(todoid) {
    axios
      .patch(`https://todo-api-git.herokuapp.com/todo/${todoid}`, {
        title: txt,
        date: dt,
      })
      .then((upt) => setUpt(upt));
  }

  return (
    <div className="main_body">
      <h1 className="main_heading">Todo List</h1>
      <h3 className="main_heading">{new Date().toLocaleString()}</h3>
      <div className="heading">
        <div className="main_head">
          <input
            className="input_date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            className="input_item"
            type="text"
            placeholder="Enter your todo here..."
            onChange={(e) => setText(e.target.value)}
          />

          <button
            className="buttonclick"
            onClick={() => {
              if (text === "" || !date1) {
                //console.log("if")
                window.confirm("Set date of completion & Fill the todo task!");
              } else {
                const content = {
                  title: text,
                  date: date1,
                  status: false,
                };

                axios
                  .post("http://localhost:5432/todo/", content)
                  .then((dataz) => {
                    dispatch(addTodo(dataz));
                    getFunc();
                  });
              }
            }}
          >
            ADD TODO
          </button>

          <button
            className={"clear_btn"}
            onClick={() => {
              axios
                .delete(`https://todo-api-git.herokuapp.com/todo/`)
                .then((del) => setDeleted(del));
            }}
          >
            CLEAR
          </button>
        </div>
      </div>

      <div className="tableDiv">
        <table className="table">
          {dataz.map((e) => (
            <tbody  key={e._id}>
              <tr>
                <td className="dates"> {e.date} </td>
                <td className="titles"> {e.title} </td>
                <td>
                  {" "}
                  <button
                    className="tog_item"
                    style={{ backgroundColor: e.status ? "green" : "crimson" }}
                    onClick={() => {
                      e.status
                        ? axios
                            .patch(
                              `https://todo-api-git.herokuapp.com/todo/${e._id}`,
                              { status: false }
                            )
                            .then((res) => {
                              //setStatusColor("green")
                              // console.log("ress", res)

                              getFunc();
                            })
                        : axios
                            .patch(
                              `https://todo-api-git.herokuapp.com/todo/${e._id}`,
                              { status: true }
                            )
                            .then((res) => {
                              //setStatusColor("red")
                              console.log("ress", res);

                              getFunc();
                            });
                    }}
                  >
                    {e.status ? (
                      <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon icon={faThumbsDown}></FontAwesomeIcon>
                    )}
                  </button>{" "}
                </td>
                <td>
                  <button
                    className="edit_item"
                    onClick={() => {
                      toggleModal();
                      setTodoid(e._id);
                    }}
                  >
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                  </button>
                </td>
                <td>
                  {" "}
                  <button
                    className="delitem"
                    onClick={() => {
                      axios
                        .delete(
                          `https://todo-api-git.herokuapp.com/todo/${e._id}`
                        )
                        .then((del) => setDeleted(del));
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </button>{" "}
                </td>
              </tr>
            </tbody>
          ))}
        </table>

        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <div>
                <div className="Edit_head">
                  <input
                    className="input_date"
                    type="date"
                    onChange={(e) => setDt(e.target.value)}
                  />
                  <input
                    className="input_item"
                    type="text"
                    placeholder="Change todo..."
                    onChange={(e) => settxt(e.target.value)}
                  />
                  <button
                    className="update_btn"
                    onClick={() => {
                      if (dt && txt) {
                        editHandle(todoid);
                        toggleModal();
                        setUpt(upt + 1);
                      } else {
                        window.confirm(
                          "set the date of completion to continue.."
                        );
                      }
                    }}
                  >
                    Update
                  </button>
                </div>
              </div>

              <button className="close-modal" onClick={toggleModal}>
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
