import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

// Media imports
import diaryCover1 from "./data/D1.jpeg";
import diaryCover2 from "./data/D2.jpeg";
import diaryCover3 from "./data/D3.jpeg";
import diaryCover4 from "./data/D4.jpeg";

import diaryMusic from "./data/a2.m4a"; // Diary background music
import song1 from "./data/A.mpeg"; // Memories background song
import video1 from "./data/V1.mp4";
import video2 from "./data/V2.mp4";
import img11 from "./data/S2.jpeg";
import img2 from "./data/U8.jpeg";
import img10 from "./data/S5.jpeg";
import img4 from "./data/U4.jpeg";
import img5 from "./data/U1.jpeg";
import img6 from "./data/U2.jpeg";
import img7 from "./data/U3.jpeg";
import img8 from "./data/U9.jpeg";
import img9 from "./data/U7.jpeg";
import img3 from "./data/U11.jpeg";
import img1 from "./data/U10.jpeg";

// ---------------- Memories Slideshow ----------------
function MemoriesSlideshow({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const audioRef = useRef(null);

  // Fixed durations for videos
  const videoDurations = [4000, 7000]; // ms

  // Total time for slideshow = 51 seconds
  const TOTAL_DURATION = 51000;

  // Remaining time for images = total - videos
  const remainingTime =
    TOTAL_DURATION - videoDurations.reduce((a, b) => a + b, 0);

  // Duration per image
  const imageCount = 11;
  const imageDuration = Math.floor(remainingTime / imageCount);

  // Build slides dynamically
  const slides = [
    { type: "video", src: video1, duration: videoDurations[0] },
    { type: "video", src: video2, duration: videoDurations[1] },
    { type: "image", src: img1, duration: imageDuration },
    { type: "image", src: img2, duration: imageDuration },
    { type: "image", src: img3, duration: imageDuration },
    { type: "image", src: img4, duration: imageDuration },
    { type: "image", src: img5, duration: imageDuration },
    { type: "image", src: img6, duration: imageDuration },
    { type: "image", src: img7, duration: imageDuration },
    { type: "image", src: img8, duration: imageDuration },
    { type: "image", src: img9, duration: imageDuration },
    { type: "image", src: img10, duration: imageDuration },
    { type: "image", src: img11, duration: imageDuration },
  ];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => console.log("Autoplay blocked"));
    }

    if (currentIndex < slides.length) {
      const timer = setTimeout(
        () => setCurrentIndex((prev) => prev + 1),
        slides[currentIndex].duration
      );
      return () => clearTimeout(timer);
    } else {
      if (onComplete) onComplete();
    }
  }, [currentIndex]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="slideshow-container">
      <audio ref={audioRef} src={song1} autoPlay />
      <AnimatePresence mode="wait">
        {currentSlide && currentSlide.type === "image" && (
          <motion.img
            key={currentIndex}
            src={currentSlide.src}
            alt="memory"
            className="slideshow-media"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
        {currentSlide && currentSlide.type === "video" && (
          <motion.video
            key={currentIndex}
            src={currentSlide.src}
            autoPlay
            muted
            playsInline
            className="slideshow-media"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------- Diary ----------------
function Diary({ onComplete }) {
  const [page, setPage] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const audioRef = useRef(null);

  const diaryImages = [diaryCover1, diaryCover2, diaryCover3, diaryCover4];

  const diaryTextPages = [
    "My dearest Sakshi,Every single day with you feels like a blessing, and I’ll forever be grateful for all the love you give me. From the very first moment you came into my life, everything changed in the most beautiful way. These 237 days together have been nothing less than magical, and I’ve cherished each one with all my heart.You’ve shown me what true love really is and made me believe in it. With you, the world feels brighter, happier, and full of meaning. Your smile is my happiness, and I promise to take care of it for the rest of my life.",
    "Today is your 25th birthday! 🎉 And when I think about it, I realize I’ve already spent 25 years without you — and I don’t want to spend even a moment more without you by my side. Mai hamesha tumhare saath tha, hoon, aur rahunga. I feel lucky knowing that you’ll be there watching my life story unfold, just as I will be by your side in every chapter of yours.",
    "I want to grow old with you, create endless memories, explore new places hand in hand, and simply share a lifetime together. No matter where life takes us, I want to be with you in everything you do, and take you with me in everything I do.",
    "“In you, I’ve found my today, my tomorrow, and my forever. I LOVE YOU ”Wish U a Happy Birthday MAuuu!🎂 Always yours,Harsh ❤️",
  ];

  useEffect(() => {
    setShowHint(true);
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, [page]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => console.log("Autoplay blocked"));
    }
  }, []);

  return (
    <motion.div
      className="diary-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <audio ref={audioRef} src={diaryMusic} autoPlay loop />

      <div className="diary-images-grid">
        {diaryImages.map((img, idx) => (
          <motion.img
            key={idx}
            src={img}
            alt={`diary-${idx}`}
            className="diary-image"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
          />
        ))}
      </div>

      <div className="diary-text">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{
              rotateY: 0,
              opacity: 1,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              transformOrigin: "left",
            }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="heartfelt-msg diary-page-curl"
          >
            {diaryTextPages[page]}
          </motion.div>
        </AnimatePresence>
      </div>

      {showHint && <p className="flip-hint">➡ Click Next to turn the page</p>}

      <button
        className="next-btn"
        onClick={() => {
          if (page < diaryTextPages.length - 1) setPage(page + 1);
          else if (onComplete) onComplete();
        }}
      >
        {page < diaryTextPages.length - 1 ? "Next →" : "Finish"}
      </button>
    </motion.div>
  );
}

// ---------------- App Wrapper ----------------
function App() {
  const [step, setStep] = useState(0);

  return (
    <div className="app">
      {/* Landing Page */}
      {step === 0 && (
        <motion.div
          className="landing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="landing-title">💌 Hi Sakshi 💌</h1>
          <p className="landing-sub">I have a little surprise for you...</p>
          <button className="reveal-btn" onClick={() => setStep(1)}>
            Click here to open 🎆
          </button>
        </motion.div>
      )}

      {/* Memories Page */}
      {step === 1 && <MemoriesSlideshow onComplete={() => setStep(2)} />}

      {/* Diary */}
      {step === 2 && <Diary onComplete={() => console.log("Diary Finished!")} />}
    </div>
  );
}

export default App;
