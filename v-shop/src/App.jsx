import { useState, useRef } from 'react' 
import accessoryData from './accessory.json'
import DataTable from './components/DataTable'
import { useForm } from "react-hook-form"

function App() { 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [selectedItems, setSelectedItems] = useState([
    { id: 1, name: "Mouse", price: 10, quantity: 2 },
    { id: 2, name: "Keyboard", price: 20, quantity: 1 },
  ])
  // const [selectedItems, setSelectedItems] = useState([ 

  //   { id: 1, name: "Mouse", price: 10, quantity: 2 }, 

  //   { id: 2, name: "Keyboard", price: 20, quantity: 1 }, 

  // ]) 

  // For a component, it must return a single JSX element. 

  // So if you have multiple elements, you need to wrap them in a single element. 

  // You can use <>...</> to wrap multiple elements (only in JSX). 
  
  // const quantityRef = useRef() 

  // const productRef = useRef() 

  // const handleInput = (e) => { 

  //   const order = { 

  //     productId: productRef.current.value, 

  //     quantity: quantityRef.current.value 

  //   } 

  //   console.table(order) 

  // } 

  // const updatePrice = (e) => { 

  //   const productId = parseInt(e.target.value)   // Integer expected 

  //   const product = accessoryData.find(accessory => accessory.id === productId) 

  //   setPrice(product.price) 

  // }

  // const handleSubmit = (e) => { 

  //   const productId = parseInt(productRef.current.value) 

  //   const product = accessoryData.find(accessory => accessory.id === productId) 

  //   const order = { 

  //     id: product.id, 

  //     name: product.name, 

  //     price: product.price,  

  //     ...product, 

  //     quantity: quantityRef.current.value 

  //   } 

  //   console.table(order) 

  //   selectedItems.push(order) // this does not update DataTable, why? 
  //   setSelectedItems([...selectedItems]) 
  // } 

  
   const onSubmit = (data) => {
    console.log(data)
    const productId = parseInt(data.product)
    
    const product = accessoryData.find(accessory => accessory.id === productId)
    const order = {
      ...product,
      quantity: data.quantity
    }
    selectedItems.push(order) // this does not update DataTable, why?
    setSelectedItems([...selectedItems])

  }

  

  return ( 

    <> 

    {/* Product: <select ref={productRef} onChange={updatePrice}> 

        {accessoryData.map((accessory, index) => { 

          return ( 

            <option key={index} value={accessory.id}>{accessory.name}</option> 

          ) 

        } 

        )} 

      </select><br /> 

    Quantity: <input type="number" ref={quantityRef}/><br/> 

    <button onClick={handleSubmit}>Submit</button>  */}

    <form onSubmit={handleSubmit(onSubmit)}>
        Product:
        <select
          // ref={productRef}
          {...register("product")}
        >
          {accessoryData.map((accessory, index) => {
            return (
              <option key={index} value={accessory.id}>{accessory.name} -- {accessory.price}</option>
            )
          }
          )
          }
        </select><br />
        Quantity: <input
          style={{ textAlign: 'right' }}
          type="number"
          // ref={quantityRef}
          {...register("quantity")} />
        <br />
        <button type="submit">Submit</button>
      </form>

    <DataTable data={selectedItems} /> 

    </> 

  ) 

} 

export default App 