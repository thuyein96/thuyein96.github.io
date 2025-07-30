import React, { useRef, useState } from "react";

const DataTable = ({ data, onDelete }) => {
  const sRef = useRef();
  const [filteredSelectedItems, setFilteredSelectedItems] = useState(data);

  const handleSearch = () => {
    const keyword = sRef.current.value;
    var filteredItems = data.filter((item) =>
      item.name.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredSelectedItems([...filteredItems]);
  };

  const sortAscending = () => {
    const sortedItems = [...filteredSelectedItems].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredSelectedItems(sortedItems);
  }

  const sortDescending = () => {
    const sortedItems = [...filteredSelectedItems].sort((a, b) => b.name.localeCompare(a.name));
    setFilteredSelectedItems(sortedItems);
  }

  return (
    <div>
        <input type="text" placeholder="Search..." ref={sRef} />{" "}
        <button onClick={handleSearch}>Search</button>
        Sort by Name:
        <button onClick={sortAscending}>Asc</button>
        <button onClick={sortDescending}>Desc</button>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredSelectedItems.map((item, index) => (
              <tr key={index}>
                <td>
                  <button onClick={() => onDelete(index)}>🗑️</button>
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default DataTable;
