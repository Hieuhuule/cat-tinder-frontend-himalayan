import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SVEdit from "./pages/SVEdit";
import SVIndex from "./pages/SVIndex";
import SVNew from "./pages/SVNew";
import SVShow from "./pages/SVShow";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import "./fonts/StardewValley.ttf";
import PlaySound from "./components/PlaySound";

function App() {
  // eslint-disable-next-line
  const [npcs, setNpcs] = useState([]);

  useEffect(() => {
    readNpc();
  }, []);

  const readNpc = () => {
    fetch("https://salty-plains-19391.herokuapp.com/npcs")
      .then((response) => response.json())
      .then((payload) => {
        setNpcs(payload);
      })
      .catch((error) => console.log(error));
  };

  const createNpc = (npc) => {
    fetch("https://salty-plains-19391.herokuapp.com/npcs", {
      body: JSON.stringify(npc),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json())
      .then((payload) => readNpc(payload))
      .catch((errors) => console.log("Npc create errors:", errors));
  };

  const updateNpc = (npc, id) => {
    fetch(`https://salty-plains-19391.herokuapp.com/npcs/${id}`, {
      body: JSON.stringify(npc),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((payload) => this.readNpc())
      .catch((errors) => console.log("Npc update errors:", errors));
  };

  const deleteNpc = (id) => {
    fetch(`https://salty-plains-19391.herokuapp.com/npcs/${id}`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
      .then((response) => response.json())
      .then((payload) => this.readNpc())
      .catch((errors) => console.log("delete errors:", errors))
      .finally(() => readNpc())
  }

  return (
    <>
      <div className="background-img">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/svindex" 
            element={<SVIndex npcs={npcs} />} />
          <Route 
          path="/svshow/:id" 
          element={<SVShow 
            npcs={npcs} 
            deleteNpc={deleteNpc} />} />
          <Route path="/svnew" element={<SVNew createNpc={createNpc} />} />
          <Route
            path="/svedit/:id"
            element={<SVEdit 
              npcs={npcs} 
              updateNpc={updateNpc} />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <div id="audio-player">
          <PlaySound />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
