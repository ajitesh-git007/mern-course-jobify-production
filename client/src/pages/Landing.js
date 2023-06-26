import React from "react"
 import {Logo} from "../components" // logo ka alag se component bnaya hai --> 'Logo' ke naame se
import main from '../assets/images/main-alternative.svg' // main image hai ye toh
// import styled from 'styled-components' 
import Wrapper from '../assets/wrappers/Testing.js'  // css ko js file ke andar likhne ke kamm aata hai
import {Link} from 'react-router-dom'

// const Butty = styled.button`
//  background-color: red;
//  color: white:               {/*BOHOT SHI CHEEZ HAI ..JSX FILE MEI CSS LIKHO APNA BDIYA...KHUD KA HI COMPONENT BNA DO BHAI*/}
//  padding: 3px;
//  font-weight: 2px;
// `

// const Wrapper = styled.main`
// width: var{--fluid-width};
//  max-width: var{max-width}; 
//  margin: 0 auto:; height: var{--nav-height}
// `




export default function Landing(){
    return(


  <>
  
  <Wrapper>

     {/* <Butty>Click me</Butty> // KHUD KA HI COMPONENT BNA DIYA ... button --> CSS ka default component && BUTTY --> KHUD KA BNAYA HUA COMPONENT STYLISH BUTTON  */}

  <nav>
    <Logo/>
    </nav> 

   <div className="container page">
    <div className="info">

    <h1>
      job <span>tracking</span> app
    </h1>

    <p>
    Welcome to <em>Jobify</em>, your premier destination for unlocking a world of off-campus job opportunities.Streamline your recruitment process and discover top talent effortlessly with <em>Jobify</em>.Gone are the days of tedious job searches and missed opportunities. Embrace the future of recruitment with <em>Jobify</em> where recruiters find their ideal candidates and students unlock their potential.<br></br>Explore, apply, and connect with your dream job like never before on <em>Jobify</em>.<br></br>Join <em>Jobify</em> and embark on an extraordinary career journey today.
    </p>

    <Link to="/register" className="btn btn-hero"> Login/Register </Link>

    </div>

    <img src={main} alt="job hunt" srcset="img main-img" className="main-img" />

   </div>

  </Wrapper>
  
  </>


    )
}