import React from 'react'
import Navbar from '../Navbar/Navbar'
import Sliders from '../Slider/Slider'
const Home = () => {
  return (
    <>
    <div style={{display:"flex" , width:"100%" , justifyContent:"center" , backgroundColor:"black"}}>
        <img height="200px" alt='' src='https://crispychicken.rest/wp-content/uploads/2020/09/Arabic-english-logo-9001.png'/>
    </div>
    <Navbar />
    <Sliders />
    </>
  )
}

export default Home