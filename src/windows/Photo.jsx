import WindowControls from "#components/WindowControls";
import { gallery, photosLinks } from "#constants";
import windowWrapper from "#hoc/windowWrapper";
import useWindowStore from "#store/window";

const Photo = () => {
  const { openWindow } = useWindowStore();

  const openImage = (item) =>
    openWindow("imgfile", { name: `Photo ${item.id}`, imageUrl: item.img });

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <h2>Photos</h2>
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id}>
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery">
          <ul>
            {gallery.map((item) => (
              <li key={item.id} onClick={() => openImage(item)}>
                <img src={item.img} alt={`Gallery photo ${item.id}`} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotoWindow = windowWrapper(Photo, "photos");

export default PhotoWindow;
