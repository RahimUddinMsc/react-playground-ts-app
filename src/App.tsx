import React from "react";
import Nav from "./features/nav/components/Nav";
import Hero from "./features/hero/components/Hero";
import Solutions from "./features/solutions/components/Solutions";

const App: React.FC = () => {
  return (
    <>
      <Nav />
      <Hero />
      <Solutions />
    </>
  );
};

export default App;