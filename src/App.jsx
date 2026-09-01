import Dock from "#components/Dock";
import { Navbar, Welcome } from "./components";

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