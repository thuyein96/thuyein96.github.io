import React, { useRef, useState } from "react";

const DataTable = ({ data, onDelete, onUpdate }) => {
  const sRef = useRef();
  const [filteredSelectedItems, setFilteredSelectedItems] = useState(data);
  const [editingQuantities, setEditingQuantities] = useState({});

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

  const handleQuantityChange = (index, newQuantity) => {
    setEditingQuantities({
      ...editingQuantities,
      [index]: newQuantity
    });
  };

  const saveEdit = (index) => {
    const newQuantity = editingQuantities[index];
    if (newQuantity && newQuantity > 0) {
      onUpdate(index, { quantity: parseInt(newQuantity) });
      const newEditingQuantities = { ...editingQuantities };
      delete newEditingQuantities[index];
      setEditingQuantities(newEditingQuantities);
    }
  };

  React.useEffect(() => {
    setFilteredSelectedItems(data);
  }, [data]);

  return (
    <div>
      <div className="controls">
        <input 
          type="text" 
          className="search-input"
          placeholder="SEARCH PRODUCTS..." 
          ref={sRef} 
        />
        <button onClick={handleSearch}>SEARCH</button>
        <button onClick={sortAscending}>SORT A-Z</button>
        <button onClick={sortDescending}>SORT Z-A</button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>DELETE</th>
            <th>ID</th>
            <th>PRODUCT NAME</th>
            <th>QUANTITY</th>
            <th>PRICE</th>
            <th>TOTAL</th>
            <th>SAVE</th>
          </tr>
        </thead>
        <tbody>
          {filteredSelectedItems.map((item, index) => (
            <tr key={index}>
              <td>
                <button 
                  className="action-button delete-button" 
                  onClick={() => onDelete(index)}
                >
                  DELETE
                </button>
              </td>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                <input 
                  className="quantity-input"
                  type="number" 
                  min="1"
                  value={editingQuantities[index] !== undefined ? editingQuantities[index] : item.quantity} 
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </td>
              <td>${item.price}</td>
              <td>${(item.price * (editingQuantities[index] || item.quantity)).toFixed(2)}</td>
              <td>
                <button 
                  className="action-button" 
                  onClick={() => saveEdit(index)}
                >
                  SAVE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;