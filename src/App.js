import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  pageSize =3;
  apiKey = process.env.REACT_APP_NEWS_API_KEY;
  state = {
    progress:0
 }
 setProgress = (progress)=> {
   this.setState({progress:progress})
 }
  render() {
    this.name = "Deepak";
    return (

      <div>


        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            height={3}
            
          />
          {/* <News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize} country='in' category='general'/> */}
          <Routes>

            <Route path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize} key="general" country='us' category='general' />}></Route>
            <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize} key="health" country='in' category='health' />}></Route>
            <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize} key="business" country='in' category='business' />}></Route>
            <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize} country='in' key="entertainment" category='entertainment' />}></Route>
            <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize} country='in' key="science" category='science' />}></Route>
            <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize} country='in' key="sports" category='sports' />}></Route>
            <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey}   pageSize={this.pageSize} country='in' key="technology" category='technology' />}></Route>
          </Routes>

        </Router>


      </div>


    )
  }
}
