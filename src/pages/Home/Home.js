import React from 'react'
// import { Link } from "react-router-dom"

import Navbar from "./Navbar"
import Hero from "./Hero"
import Footer from "../../components/Footer"

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}
