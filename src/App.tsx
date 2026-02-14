import './styles/glassmorphism.css';

import RadialMenu from "./features/contextMenu/components/RadialMenu";
import { RadialMenuProvider, useRadialMenuContext } from "./features/contextMenu/RadialMenuContext";
import Hero from "./features/hero/components/Hero";
import Nav from "./features/nav/components/Nav";
import Solutions from "./features/solutions/components/Solutions";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';

const App = () => {
  return (
    <BrowserRouter>
      <RadialMenuProvider>
        <Nav />
        <Routes>  {/* ← ADD THIS */}
          {/* Home page route - shows Hero + Solutions */}
          <Route path="/" element={
            <>
              <Hero />
              <Solutions />            
            </>
          } />
          
          {/* Dashboard route */}
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
        <RadialMenu />
      </RadialMenuProvider>
    </BrowserRouter>
  );  
};

export default App;


