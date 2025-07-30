import { useState, useRef } from "react";
import { useLocalStorage } from 'react-use';
import accessoryData from "./accessory.json";
import DataTable from "./components/VTable";
import { useForm } from "react-hook-form";
import './App.css'; // Import the CSS
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [savedSelectedItems, setSavedSelectedItems, remove] = useLocalStorage("selectedItems", [])
  const [selectedItems, setSelectedItems] = useState(savedSelectedItems)

  const onSubmit = (data) => {
    const productId = parseInt(data.product);
    const quantity = parseInt(data.quantity) || 1;
    console.log(productId, quantity);

    const product = accessoryData.find(
      (accessory) => accessory.id === productId
    );
    const order = {
      ...product,
      quantity: quantity,
    };
    
    const newItems = [...selectedItems, order];
    setSelectedItems(newItems);
    setSavedSelectedItems(newItems);
  };

  const handleDelete = (index) => {
    console.log("Delete item at index:", index);
    const newItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newItems);
    setSavedSelectedItems(newItems);
  };

  const handleUpdate = (index, updatedItem) => {
    console.log("Update item at index:", index, updatedItem);
    const newItems = selectedItems.map((item, i) => 
      i === index ? { ...item, ...updatedItem } : item
    );
    setSelectedItems(newItems);
    setSavedSelectedItems(newItems);
    toast.success("Item updated successfully!");
  };

  return (
    <div className="container">
      <Toaster position="top-center" />
      <h1>V-SHOP INVENTORY</h1>
      
      <div className="main-layout">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Product:</label>
          <select {...register("product")}>
            <option value="">Select Product</option>
            {accessoryData.map((accessory, index) => {
              return (
                <option key={index} value={accessory.id}>
                  {accessory.name} -- ${accessory.price}
                </option>
              );
            })}
          </select>
          
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            defaultValue="1"
            {...register("quantity")}
          />
          
          <button type="submit">ADD TO CART</button>
        </form>

        <div className="table-section">
          <DataTable
            data={selectedItems}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default App;