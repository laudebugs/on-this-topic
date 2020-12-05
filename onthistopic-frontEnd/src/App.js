import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./css/App.css";

// import page components
import HomePage from "./pages/HomePage";
import AllPodcasts from "./pages/AllPodcasts";
import AllPeople from "./pages/AllPeople";
import AllLocations from "./pages/AllLocations";
import Podcast from "./pages/Podcast";
import Episode from "./pages/Episode";

import Location from "./pages/Location";
import Person from "./pages/Person";

import AllTopics from "./pages/AllTopics";
import Topic from "./pages/Topic";

import Discover from "./pages/Discover";
import EditorsChoice from "./pages/EditorsChoice";
import ForYou from "./pages/ForYou";
import YourPodcasts from "./pages/YourPodcasts";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";

import Player from "./components/Player";
import SideMenu from "./components/SideMenu";
import Header from "./components/Header";

import { connect } from "react-redux";
import { getStatus } from "./components/thunks";
import { getLoggedInStatus } from "./components/selectors";
// Find a way to get this into the redux store

const App = ({ beginStatusUpdate }) => {
  useEffect(() => {
    beginStatusUpdate();
  }, []);

  return (
    <div>
      <BrowserRouter>
        {/* <Header /> */}

        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/podcasts" component={AllPodcasts} exact />
          <Route path="/podcast/:slug" component={Podcast} exact />
          <Route path="/podcast/episode/:slug" component={Episode} exact />
          <Route path="/locations" component={AllLocations} exact />
          <Route path="/locations/:location" component={Location} exact />
          <Route path="/people" component={AllPeople} exact />
          <Route path="/people/:person" component={Person} exact />

          <Route path="/topics" component={AllTopics} exact />
          <Route path="/topic/:topic" component={Topic} exact />

          <Route path="/discover" component={Discover} exact />
          <Route path="/editorschoice" component={EditorsChoice} exact />
          <Route path="/foryou" component={ForYou} exact />
          <Route path="/yourpodcasts" component={YourPodcasts} exact />
          <Route path="/account" component={Account} exact />
          <Route path="/signin" component={SignIn} exact />
          <Route path="/signup" component={SignUp} exact />
        </Switch>
        <SideMenu />
      </BrowserRouter>
      <Player />
    </div>
  );
};
const mapStateToProps = (state) => ({
  // Find a way to filter this podcast from others that have been loaded
  isLoggedIn: getLoggedInStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  beginStatusUpdate: () => dispatch(getStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
