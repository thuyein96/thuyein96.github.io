
import { useState } from "react";
import { useForm } from "react-hook-form";
import accessoryData from "./utils/accessory.json";
import { useLocalStorage } from 'react-use';
import DataTable from "./components/DataTable";

function App() {
  const { 
    register, 
    handleSubmit 
  } = useForm();
  const [savedSelectedItems, setSavedSelectedItems] = useLocalStorage("selectedItems", [])
  const [selectedItems, setSelectedItems] = useState(savedSelectedItems)

  const onSubmit = (data) => {
    const productId = parseInt(data.product);
    const product = accessoryData.find(
      (accessory) => accessory.id === productId
    );
    const order = {
      ...product,
      quantity: data.quantitiy
    };
    console.log(order);

    const newItems = [...selectedItems, order];
    setSelectedItems([newItems])
    setSavedSelectedItems([newItems])
    localStorage.setItem("selectedItems", JSON.stringify(newItems));
  }; 

  const handleDelete = (index) => {
    console.log("Before Delete", JSON.stringify(selectedItems));
    selectedItems.splice(index, 1);
    setSelectedItems([...selectedItems]);
    console.log("After Delete", JSON.stringify(selectedItems));

    setSavedSelectedItems([...selectedItems]);
    // console.log("After Delete", JSON.stringify(selectedItems));
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
  }

  return (
    <div>
      <h1>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        Product:
        <select
          // ref={productRef}
          {...register("product")}
        >
          {accessoryData.map((accessory, index) => {
            return (
              <option key={index} value={accessory.id}>
                {accessory.name} -- {accessory.price}
              </option>
            );
          })}
        </select>
        <br />
        Quantity:{" "}
        <input
          style={{ textAlign: "right" }}
          type="number"
          // ref={quantityRef}
          {...register("quantity")}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <DataTable
      data={selectedItems}
      onDelete={handleDelete}
      />
    </div>

    
  )
}

export default App
