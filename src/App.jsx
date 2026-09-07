import Dock from "#components/Dock";
import gsap from "gsap";

import { Navbar, Welcome } from "./components";
import { Draggable } from "gsap/Draggable";
import { Safari, Terminal } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
    </main>
  );
}

export default App