import React from 'react'
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div>
      Hi there
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
    </div>
  )
}
