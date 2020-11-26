import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./css/App.css";

// import page components
import HomePage from "./pages/HomePage";
import AllPodcasts from "./pages/AllPodcasts";
import AllPeople from "./pages/AllPeople";
import AllLocations from "./pages/AllLocations";
import Podcast from "./pages/Podcast";
import Location from "./pages/Location";
import Person from "./pages/Person";
import { connect } from "react-redux";

import Discover from "./pages/Discover";

import ForYou from "./pages/ForYou";
import YourPodcasts from "./pages/YourPodcasts";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Player from "./components/Player";

const App = ({ player }) => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/podcasts" component={AllPodcasts} exact />
          <Route path="/podcast/:slug" component={Podcast} exact />
          <Route path="/locations" component={AllLocations} exact />
          <Route path="/locations/:location" component={Location} exact />
          <Route path="/people" component={AllPeople} exact />
          <Route path="/people/:person" component={Person} exact />

          <Route path="/discover" component={Discover} exact />

          <Route path="/foryou" component={ForYou} exact />
          <Route path="/yourpodcasts" component={YourPodcasts} exact />

          <Route path="/signin" component={SignIn} exact />
          <Route path="/signup" component={SignUp} exact />
        </Switch>
      </BrowserRouter>
      <Player player={player} />
    </div>
  );
};
const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(App);
