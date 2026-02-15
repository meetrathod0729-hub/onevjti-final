import React from 'react'

const Card = ({children}) => {
  return (
    <div className="

relative z-10
backdrop-blur-md
border 
rounded-2xl
p-10
w-[420px]
shadow-[0_20px_50px_rgba(168,85,247,0.25)]
">


       {children}
    </div>
  )
}

export default Card
