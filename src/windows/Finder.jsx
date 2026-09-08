import WindowControls from "#components/WindowControls"
import { locations } from "#constants"
import windowWrapper from "#hoc/windowWrapper"
import useLocationStore from "#store/location"
import clsx from "clsx"
import { Search } from "lucide-react"

const Finder = () => {

    const { activeLocation, setActiveLocation } = useLocationStore();

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className="icon" />
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3>Favorites</h3>
            <ul>{ Object.values(locations).map((item) => (
                <li className={clsx(item.id === activeLocation.id ? "active" : "not-active")} key={item.id} onClick={() => setActiveLocation(item)}>
                    <img src={item.icon} className="w-4" alt={item.name} />
                    <p className="text-sm font-medium truncate">{item.name}</p>
                </li>
            ))}</ul>
          </div>
          <div>
            <h3>Work</h3>
            <ul>...</ul>
          </div>
        </div>
      </div>
    </>
  );
}

const FinderWindow = windowWrapper(Finder, "finder");

export default FinderWindow;
