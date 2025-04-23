import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import DiceSvg from "../svgs/wallpaper/DiceSvg";
import LeftArrowSvg from "../svgs/wallpaper/LeftArrow";
import RightArrowSvg from "../svgs/wallpaper/RightArrow";

type ChangeWallpaper = "random" | "next" | "previous";

const Wallpaper = () => {
  const wallPapers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const random = Math.floor(Math.random() * wallPapers.length);

  const [wallpaperIndex, setWallpaperIndex] = useState(random);

  useEffect(() => {
    document.body.style.backgroundImage = `url("/wallpapers/wallpaper-${wallpaperIndex}.jpg")`;
    document.body.style.backgroundSize = "cover";
  });

  const changeWallpaper = (pattern: ChangeWallpaper) => {
    if (pattern === "random") {
      let random;
      do {
        random = Math.floor(Math.random() * wallPapers.length);
      } while (random === wallpaperIndex);

      setWallpaperIndex(random);
    } else if (pattern === "next") {
      let next = wallpaperIndex + 1;
      if (next >= wallPapers.length) {
        next = 0;
      }
      setWallpaperIndex(next);
    } else if (pattern === "previous") {
      let previous = wallpaperIndex - 1;
      if (previous < 0) {
        previous = wallPapers.length - 1;
      }
      setWallpaperIndex(previous);
    }
  };

  return (
    <div className='flex gap-2'>
      <motion.div
        className='cursor-pointer'
        onClick={() => changeWallpaper("random")}
        whileHover={{ scale: 1.1 }}
      >
        <DiceSvg size={36} />
      </motion.div>
      <motion.div
        className='cursor-pointer'
        onClick={() => changeWallpaper("previous")}
        whileHover={{ scale: 1.1 }}
      >
        <LeftArrowSvg size={36} />
      </motion.div>
      <motion.div
        className='cursor-pointer'
        onClick={() => changeWallpaper("next")}
        whileHover={{ scale: 1.1 }}
      >
        <RightArrowSvg size={36} />
      </motion.div>
    </div>
  );
};

export default Wallpaper;
