import axios from 'axios'
import { useEffect } from 'react'
import './App.css'

function App() {

  useEffect(() => {
    axios
      .get('http://localhost:3000')
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <>
      <div></div>
    </>
  )
}

export default App
