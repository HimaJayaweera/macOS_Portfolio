import Dock from "#components/Dock";
import gsap from "gsap";

import { Navbar, Welcome } from "./components";
import { Draggable } from "gsap/Draggable";
import { Resume, Safari, Terminal, Finder, TextFile, ImageFile, Contact } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <TextFile />
      <ImageFile />
      <Contact />
    </main>
  );
}

export default App