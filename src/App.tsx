import './styles/glassmorphism.css';


import Hero from "./features/hero/components/Hero";
import Nav from "./features/nav/components/Nav";
import Solutions from "./features/solutions/components/Solutions";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import { RadialMenuProvider } from './features/radialContextMenu/RadialMenuContext';
import RadialMenu from './features/radialContextMenu/components/RadialMenu';
import { ListMenuProvider } from './features/listContextMenu/ListMenuContext';
import ListMenu from './features/listContextMenu/components/ListMenu';

const App = () => {
  return (
    <BrowserRouter>
        <ListMenuProvider>
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
            <ListMenu />
          </RadialMenuProvider>
      </ListMenuProvider>
    </BrowserRouter>
  );  
};

export default App;


