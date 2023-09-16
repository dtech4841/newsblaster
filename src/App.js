import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

 const App=()=>{
 const pageSize =3;
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
 const [progress, setProgress] = useState(0);

const changeProgress=(progress)=>{
 setProgress(progress);
}
 
    return (

      <div>


        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={progress}
            height={3}
            
          />
          {/* <News setProgress={setProgress} apiKey={apiKey}   pageSize={pageSize} country='in' category='general'/> */}
          <Routes>

            <Route path='/' element={<News changeProgress={changeProgress} apiKey={apiKey}   pageSize={pageSize} key="general" country='us' category='general' />}></Route>
            <Route exact path='/health' element={<News changeProgress={changeProgress} apiKey={apiKey}   pageSize={pageSize} key="health" country='in' category='health' />}></Route>
            <Route exact path='/business' element={<News changeProgress={changeProgress} apiKey={apiKey}   pageSize={pageSize} key="business" country='in' category='business' />}></Route>
            <Route exact path='/entertainment' element={<News changeProgress={changeProgress} apiKey={apiKey}   pageSize={pageSize} country='in' key="entertainment" category='entertainment' />}></Route>
            <Route exact path='/science' element={<News changeProgress={changeProgress} apiKey={apiKey}   pageSize={pageSize} country='in' key="science" category='science' />}></Route>
            <Route exact path='/sports' element={<News changeProgress={changeProgress} apiKey={apiKey}   pageSize={pageSize} country='in' key="sports" category='sports' />}></Route>
            <Route exact path='/technology' element={<News changeProgress={changeProgress} apiKey={apiKey}   pageSize={pageSize} country='in' key="technology" category='technology' />}></Route>
          </Routes>

        </Router>


      </div>


    )
  
}
export default App
