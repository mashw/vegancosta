import {useRef, useState, useEffect} from 'react';

export const snapshotToArray = (snapshot) => {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};

export const sortByVegan = (a, b) => {
  const sortOrder = ["YES", "CC", "NO"];
  return sortOrder.indexOf(a["vegan-status"]) - sortOrder.indexOf(b["vegan-status"]);
};

export const getProductStatus = (props) => {
  if (props.value["vegans"] === "YES") {
    return "is vegan."
  }
  else if (props.value["vegans"] !== "YES" && props.value["cc-vegan"] === "YES") {
    return "contains a cross-contamination risk of animal ingredients."
  } else {
    return "is not vegan."
  }
};

export const useFitText = () => {
  const MIN_FONT_SIZE = 20;
  const MAX_FONT_SIZE = 100;
  const RESOLUTION = 5;

  const ref = useRef(null);

  const [state, setState] = useState({
    fontSize: MAX_FONT_SIZE,
    fontSizePrev: MIN_FONT_SIZE,
    fontSizeMax: MAX_FONT_SIZE,
    fontSizeMin: MIN_FONT_SIZE,
  });
  const { fontSize, fontSizeMax, fontSizeMin, fontSizePrev } = state;

  useEffect(() => {
    const isDone = Math.abs(fontSize - fontSizePrev) <= RESOLUTION;
    const isOverflow =
      !!ref.current &&
      (ref.current.scrollHeight > ref.current.offsetHeight ||
        ref.current.scrollWidth > ref.current.offsetWidth);
    const isAsc = fontSize > fontSizePrev;

    // return if the font size has been adjusted "enough" (change within RESOLUTION)
    // reduce font size by one increment if it's overflowing
    if (isDone) {
      if (isOverflow) {
        const fontSizeNew =
          fontSizePrev < fontSize
            ? fontSizePrev
            : fontSize - (fontSizePrev - fontSize);
        setState({
          fontSize: fontSizeNew,
          fontSizeMax,
          fontSizeMin,
          fontSizePrev,
        });
      }
      return;
    }

    // binary search to adjust font size
    let delta;
    let newMax = fontSizeMax;
    let newMin = fontSizeMin;
    if (isOverflow) {
      delta = isAsc ? fontSizePrev - fontSize : fontSizeMin - fontSize;
      newMax = Math.min(fontSizeMax, fontSize);
    } else {
      delta = isAsc ? fontSizeMax - fontSize : fontSizePrev - fontSize;
      newMin = Math.max(fontSizeMin, fontSize);
    }
    setState({
      fontSize: fontSize + delta / 2,
      fontSizeMax: newMax,
      fontSizeMin: newMin,
      fontSizePrev: fontSize,
    });
  }, [fontSize, fontSizeMax, fontSizeMin, fontSizePrev, ref]);

  return { fontSize: `${fontSize}%`, ref };
};