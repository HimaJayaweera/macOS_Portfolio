import WindowControls from "#components/WindowControls";
import windowWrapper from "#hoc/windowWrapper";
import useWindowStore from "#store/window";

const TextFile = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="textfile">
        {image && <img src={image} alt={name} />}
        {subtitle && <p className="subtitle">{subtitle}</p>}

        {description?.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </>
  );
};

const TextFileWindow = windowWrapper(TextFile, "txtfile");

export default TextFileWindow;
