import React, { Suspense } from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import {Routes, Route, HashRouter} from "react-router-dom";
import { connect } from 'react-redux';
import { initializeApp } from './Redux/appReducer';
import Preloader from './components/common/Preloader/Preloader';
import {BrowserRouter, Navigate} from "react-router-dom";
import ProfileContainer from './components/Profile/ProfileContainer';
import { AppStateType } from './Redux/redux-store';
import { GitTest } from './components/GitTest/GitTest';
import Header from './components/Header/Header';
import { Login } from './components/Login/Login';

//Lazy load
const FriendsPage = React.lazy(() => import('./components/Friends/FriendsPage'));
const Messages = React.lazy(() => import('./components/Messages/Messages'));
const ChatPage = React.lazy(() => import('./components/Chat/ChatPage'))

type MapProps = ReturnType<typeof mapStateToProps>
type DispatchProps = {
  initializeApp: () => void
}

class App extends React.Component<MapProps & DispatchProps> {

  componentDidMount() {
    this.props.initializeApp();
  }
  
  render() {

    // if (!this.props.initialized) {
    //   return <Preloader/>
    // } 

    return (
      // HashRouter instead BrowserRouter for github pages
      <HashRouter>
        <div className="App">
          <Header />
          <Sidebar />
          <div className='content-column'>
            <Suspense fallback={<Preloader/>}>
              <Routes>
                <Route path="/" element={<Navigate to={'/profile'} /> } />
                {/* redirect for github pages */}
                {/* <Route path="/social" element={<Navigate to={'/profile'} /> } />  */}
                <Route path="/profile/:userId" element={<ProfileContainer />}/>
                <Route path="/profile/" element={<ProfileContainer />}/>
                <Route path="/friends/*" element={<FriendsPage />}/>
                <Route path="/messages/*" element={<Messages />}/>
                <Route path="/chat/*" element={<ChatPage />}/>
                <Route path="/login/" element={<Login />}/>
                <Route path="/test/" element={<GitTest />}/>
                <Route path="*" element={<h1>404 - Not found</h1>}/>
              </Routes>
            </Suspense> 
          </div>
        </div>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    initialized: state.app.initialized
  }
}

export default connect(mapStateToProps, {initializeApp}) (App);


