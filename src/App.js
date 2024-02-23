import "./App.css";
import { useState } from "react";
import WheatherApp from "./components/WheatherApp";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [inputData, setInputData] = useState("");
  const [tableData, setTableData] = useState([]);
  const [todoId, setTodoId] = useState(null);

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  const handleClick = () => {
    if (inputData.trim() !== "") {
      setTableData([...tableData, { id: uuidv4(), todos: inputData }]);
      setInputData("");
    }
  };

  const handleEdit = (id, value) => {
    setTodoId(id);
    setInputData(value);
  };

  const handleUpdate = () => {
    if (todoId !== null) {
      const updatedData = tableData.map((item) =>
        item.id === todoId ? { ...item, todos: inputData } : item
      );
      setTableData(updatedData);
      setTodoId(null);
      setInputData("");
    }
  };

  const handleDelete = (id) => {
    const newTableData = tableData.filter((item) => item.id !== id);
    setTableData(newTableData);
  };

  return (
    <div className="App">
      <input type="text" value={inputData} onChange={handleChange} />
      {todoId !== null ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={handleClick}>Add</button>
      )}
      <div>
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item) => (
              <tr key={item.id}>
                <td>{item.todos}</td>
                <td>
                  <button onClick={() => handleEdit(item.id, item.todos)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
      {/* <WheatherApp /> */}
    </div>
  );
}

export default App;
