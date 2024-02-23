import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import WheatherApp from "./components/WheatherApp";

function App() {
  const [inputData, setInputData] = useState("");
  const [tableData, setTableData] = useState([]);
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  const handleClick = (index, value) => {
    if (tableData[editedIndex] === editedIndex) {
      const updatedData = [...tableData];
      updatedData[editedIndex] = editedValue;
      setTableData(updatedData);
      setEditedIndex(null);
      setEditedValue("");
    } else if (inputData) {
      setTableData([...tableData, inputData]);
      setInputData("");
    }
  };

  const handleEdit = (index, value) => {
    setEditedIndex(index);
    setEditedValue(value);
  };

  const handleSaveEdit = () => {
    if (editedIndex !== null && editedValue.trim() !== "") {
      const updatedData = [...tableData];
      updatedData[editedIndex] = editedValue;
      setTableData(updatedData);
      setEditedIndex(null);
      setEditedValue("");
    }
  };

  const handleDelete = (index) => {
    setTableData(tableData.filter((item, i) => i !== index));
  };

  return (
    <div className="App">
      <input
        type="text"
        value={inputData || editedValue}
        onChange={handleChange}
      />
      <button onClick={handleClick}>Submit</button>

      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              <td>{editedIndex === index ? editedValue : item}</td>
              <td>
                {/* <button onClick={() => handleEdit(index, item)}>Edit</button> */}
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <WheatherApp />
    </div>
  );
}

export default App;
