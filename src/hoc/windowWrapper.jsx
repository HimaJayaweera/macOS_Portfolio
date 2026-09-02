import useWindowStore from "#store/window";
import { useRef } from "react";

const windowWrapper = (Component, windowKey) => {
const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);
};

  return (
    <section id={windowKey} ref={ref} style={ zIndex }></section>
  )
}

export default windowWrapper
