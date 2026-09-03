import { useState } from 'react'
import './App.css'

function App() {
  // console.log(process.env.REACT_APP_APPWRITE_URL); when we create project using "React App" the we use process.env to show env variable

  console.log(import.meta.env.VITE_APPWRITE_URL); // "Vite" mei import.meta.env use krte hai!!
  
  
  return (
   <>
    <h1>Blog app using Appwrite</h1>
   </>
  )
}

export default App
