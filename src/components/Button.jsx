// Yeah Button.jsx ek commmon button UI hai jisko hum direct button ki jgh use kr skte hai hume baar baar class aur button define krne ki jarurat nahi padegi 
import React from 'react'

function Button({
    children, // Yeah ek type ka text hai like button pr jo name show hoga voh
    type = 'button',
    bgColor = 'bg-blue-500', // yeah sb default value hai agr koi value pass kiya toh override kr denge vrna isse hi use krenge
    textColor = 'text-white',
    className = '',
    ...props

}) {
  return (
    // hume agr jsx mei js likhna hai toh curly braces ka use krte hai jaise humne abhi backtick ` ka use kiya abhi 
    <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button