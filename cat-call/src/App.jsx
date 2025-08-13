import { useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState(''); 

 

  const fetchCatMessage = async () => { 

    try { 

      const response = await fetch('https://catfact.ninja/fact'); 

      const data = await response.json(); 

      setMessage(data.fact); 

    } catch (error) { 

      console.error("Error fetching cat fact:", error); 

      setMessage("Failed to fetch cat fact. Please try again."); 

    } 

  }; 

 

  return ( 

    <div> 

      <button onClick={fetchCatMessage}>Get a Cat Fact</button> 

      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}> 

        {message ? message : 'Click the button to see a cat fact!'} 

      </div> 

    </div> 

  ); 
}

export default App
