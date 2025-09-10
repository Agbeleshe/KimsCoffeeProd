"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import coffeePac from "../../public/captures/KimsCoffeeTwelev.jpg";
import coffeeBag from "../../public/captures/KimsCoffeeEight.jpg";
import coffeeFarm from "../../public/captures/KimsCoffeeSeven.jpg";
import farm from "../../public/captures/KimsCoffeeEleven.jpg";
import coffeeSeed from "../../public/captures/KimCoffeOne.jpg";

const images = [coffeePac, coffeeBag, coffeeFarm, farm, coffeeSeed];

const CardDeck = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-[300px] h-[350px] mx-auto overflow-visible">
      <AnimatePresence>
        {images.map((img, i) => {
          // Calculate offset for stacked look
          const offset = (i - index + images.length) % images.length;

          return (
            offset < 3 && ( // only show 3 stacked cards
              <motion.div
                key={i}
                className="absolute top-0 left-0 w-full h-full cursor-pointer"
                onClick={handleNext}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(e: any, info: { offset: { x: number } }) => {
                  if (info.offset.x > 100) handleNext();
                  if (info.offset.x < -100) handleNext();
                }}
                initial={{ x: offset === 0 ? 300 : 0, opacity: 0 }}
                animate={{
                  x: offset * 20,
                  y: offset * 10,
                  scale: 1 - offset * 0.05,
                  opacity: 1 - offset * 0.15,
                  zIndex: images.length - offset,
                }}
                exit={{ x: -300, opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <Image
                  src={img}
                  alt={`Coffee ${i}`}
                  fill
                  className="object-cover rounded-xl shadow-lg border border-white"
                />
              </motion.div>
            )
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default CardDeck;
