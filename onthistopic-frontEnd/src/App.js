import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./css/App.css";

// import page components
import HomePage from "./pages/HomePage";
import AllPodcasts from "./pages/General/AllPodcasts";
import AllPeople from "./pages/General/AllPeople";
import AllLocations from "./pages/General/AllLocations";
import Podcast from "./pages/Podcast";
import Episode from "./pages/Episode";

import Location from "./pages/Location";
import Person from "./pages/Person";

import AllTopics from "./pages/General/AllTopics";
import Theme from "./pages/Theme";

import Discover from "./pages/General/Discover";
import EditorsChoice from "./pages/General/EditorsChoice";
import Blog from "./pages/General/Blog";

import ForYou from "./pages/User/ForYou";
import YourPodcasts from "./pages/User/YourPodcasts";

import SignIn from "./pages/User/SignIn";
import SignUp from "./pages/User/SignUp";
import Account from "./pages/User/Account";

import Player from "./components/Player";
import SideMenu from "./components/SideMenu";

import SubmitPod from "./pages/SubmitPod";
import NotFound from "./pages/NotFound";
import { connect } from "react-redux";
import { getStatus } from "./components/thunks";
import { getLoggedInStatus } from "./components/selectors";
import Experiments from "./pages/General/Experiments";
// Find a way to get this into the redux store

const App = ({ beginStatusUpdate }) => {
  useEffect(() => {
    // beginStatusUpdate();
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
          <Route path="/topic/:topic" component={Theme} exact />

          <Route path="/discover" component={Discover} exact />
          <Route path="/blog" component={Blog} exact />
          <Route path="/editorschoice" component={EditorsChoice} exact />
          <Route path="/foryou" component={ForYou} exact />
          <Route path="/yourpodcasts" component={YourPodcasts} exact />
          <Route path="/account" component={Account} exact />
          <Route path="/signin" component={SignIn} exact />
          <Route path="/signup" component={SignUp} exact />
          <Route path="/submit-pod" component={SubmitPod} exact />
          <Route path="/experiments" component={Experiments} />
          <Route component={NotFound} />
        </Switch>
        <SideMenu />
        <Player />
      </BrowserRouter>
    </div>
  );
};
const mapStateToProps = (state) => ({
  // Find a way to filter this podcast from others that have been loaded
});

const mapDispatchToProps = (dispatch) => ({
  beginStatusUpdate: () => dispatch(getStatus()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
