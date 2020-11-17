import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import EditorsChoice from "../components/EditorsChoice";
import Player from "../components/Player";
import PodCarousel from "../components/PodCarousel";
/**
 
class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      allpodcasts: {},
    };
  }
  componentDidMount() {
    const fetchData = async () => {
      const result = await fetch("/allpodcasts");
      const body = await result.json();
      this.state.allpodcasts = body;
      console.log(body[0]);
    };
    fetchData();
  }
  componentDidUpdate() {
    const fetchData = async () => {
      const result = await fetch("/allpodcasts");
      const body = await result.json();
      this.state.allpodcasts = body;
      console.log(body[0]);
    };
    fetchData();
  }
  render() {
    return (
      <div>
        <Header />
        <MenuBar />
        <PodCarousel podcasts={this.state.podcasts} />
      </div>
    );
  }
}
*/
export default function HomePage() {
  const displayPage = () => {
    return <div>At home</div>;
  };
  return (
    <div>
      <Header />
      <MenuBar />
      {displayPage()}
      <PodCarousel />
      {/* <Player /> */}
    </div>
  );
}
