import React, { useEffect } from "react";
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

async function getStatus() {
  let result = await fetch("/loginstatus", { credentials: "include" });
  const status = await result.json;
  return status.status;
}
const App = () => {
  useEffect(() => {
    getStatus().then((res) => console.log(res));
  }, []);

  return (
    <div>
      <BrowserRouter>
        {/* <Header /> */}

        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/podcasts" component={AllPodcasts} exact />
          <Route path="/podcast/:slug" component={Podcast} exact />
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

export default App;
