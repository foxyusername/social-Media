import React from 'react'
import "./style.css";

function Loading() {
  return (
    <div className='loadingMainDiv'>
     
    <header className='loadingHeader'>
    <h1>Loading</h1>

    <p>Page might take up to 50 seconds to load if it is first interaction with server. please wait...</p>
  </header>

    <section className='ballsDiv'>
    
    <div className='firstBall'></div>

    <div className='secondBall'></div>
      
    </section>

    </div>
  )
}

export default Loading