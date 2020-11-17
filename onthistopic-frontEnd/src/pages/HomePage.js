import React, { useState, useEffect } from "react";

import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import EditorsChoice from "../components/EditorsChoice";
import Player from "../components/Player";
import PodCarousel from "../components/PodCarousel";

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