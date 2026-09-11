import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowStore from "#store/window";

const ImageFile = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile.data;

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <p>{name}</p>
      </div>

      <div className="preview">
        <img src={imageUrl} alt={name} />
      </div>
    </>
  );
};

const ImageFileWindow = windowWrapper(ImageFile, "imgfile");

export default ImageFileWindow;
