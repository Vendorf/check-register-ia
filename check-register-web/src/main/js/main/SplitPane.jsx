import React from "react";

const splitPaneContext = React.createContext();

export default function SplitPane({ children, ...props }) {
  const [topHeight, setTopHeight] = React.useState(null);
  const separatorYPosition = React.useRef(null);

  const splitPaneRef = React.createRef();

  const onMouseDown = e => {
    separatorYPosition.current = e.clientY;
  };

  const onMouseMove = e => {
    if (!separatorYPosition.current) {
      return;
    }

    const newTopHeight = topHeight + e.clientY - separatorYPosition.current;
    separatorYPosition.current = e.clientY;

    // if (newTopHeight <= 0) {
    //   return topHeight !== 0 && setTopHeight(0);
    // }

    //const splitPaneHeight = splitPaneRef.current.clientHeight;

    // if (newTopHeight >= splitPaneHeight) {
    //   return topHeight !== splitPaneHeight && setTopHeight(splitPaneHeight);
    // }

    setTopHeight(newTopHeight);
  };

  const onMouseUp = () => {
    separatorYPosition.current = null;
  };

  React.useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <div {...props} className="split-pane" ref={splitPaneRef}>
      <splitPaneContext.Provider value={{ topHeight, setTopHeight }}>
        {children[0]}
        <div className="separator" onMouseDown={onMouseDown} />
        {children[1]}
      </splitPaneContext.Provider>
    </div>
  );
}

SplitPane.Top = function SplitPaneTop(props) {
  const topRef = React.createRef();
  const { topHeight, setTopHeight } = React.useContext(splitPaneContext);

  React.useEffect(() => {
    if (!topHeight) {
      setTopHeight(topRef.current.clientHeight);
      topRef.current.style.flex = "none";
      return;
    }

    topRef.current.style.height = `${topHeight}px`;
  }, [topHeight]);

  return <div {...props} className="split-pane-top" ref={topRef} />;
};

SplitPane.Bottom = function SplitPaneBottom(props) {
  return <div {...props} className="split-pane-bottom" />;
};
