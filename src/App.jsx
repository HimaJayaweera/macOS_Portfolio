import Dock from "#components/Dock";
import gsap from "gsap";

import { Navbar, Welcome } from "./components";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
    </main>
  );
}

export default App