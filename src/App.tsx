import './styles/glassmorphism.css';

import RadialMenu from "./features/contextMenu/components/RadialMenu";
import { RadialMenuProvider, useRadialMenuContext } from "./features/contextMenu/RadialMenuContext";
import Hero from "./features/hero/components/Hero";
import Nav from "./features/nav/components/Nav";
import Solutions from "./features/solutions/components/Solutions";

const App = () => {
  return (
    <RadialMenuProvider>
      <Nav/>
      <Hero/>
      <Solutions/>
      <AppContent />

    </RadialMenuProvider>
  );
};

const AppContent = () => {
  const { openMenu } = useRadialMenuContext();
  
  return (
    <> 
      <RadialMenu />
    </>
  );
};

export default App;