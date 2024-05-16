import React, { useState, useEffect } from "react";

const Banner = () => {
  const dummyImages = [
    "https://w.forfun.com/fetch/9c/9cd8dcad2987e10cf6ca1f454c667d49.jpeg",
    "https://wallpapers.com/images/hd/moody-rrr-movie-poster-l2aleq2qdpl3e6a3.jpg",
    "https://www.itl.cat/pngfile/big/289-2896343_the-lion-king-film-4k-wallpaper-lion-king.jpg",
    "https://wallpaper.forfun.com/fetch/93/93c7a763633943dca01cd4dfeef36e5c.jpeg",
    "https://free4kwallpapers.com/uploads/originals/2020/04/29/marvel-avengers-wallpaper.jpg",
    "https://wallpaperswide.com/download/wolverine_in_deadpool_3_2024_movie-wallpaper-1920x1080.jpg",
    "https://images8.alphacoders.com/131/1318215.jpeg",
    "https://4kwallpapers.com/images/wallpapers/godzilla-godzilla-x-3840x2160-13585.jpg",
    "https://bloody-disgusting.com/wp-content/uploads/2022/09/kingdom-of-the-planet-scaled-e1664471629253.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === dummyImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Function to handle moving to the previous image
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? dummyImages.length - 1 : prevIndex - 1
    );
  };

  // Effect to automatically swipe to next image
  useEffect(() => {
    const interval = setInterval(nextImage, 5000);

    return () => clearInterval(interval);
  }, [currentImageIndex]);

  return (
    <div
      className="relative h-[100vh] md:h-[75vh] bg-center bg-no-repeat bg-cover flex items-end"
      style={{
        backgroundImage: `url(${dummyImages[currentImageIndex]})`,
        transition: "background-image 1s ease-in-out",
      }}
    >
      {/* Previous Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-60 text-white p-2 rounded-full"
        onClick={prevImage}
      >
        &lt;
      </button>

      {/* Next Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-60 text-white p-2 rounded-full"
        onClick={nextImage}
      >
        &gt;
      </button>

      {/* Caption */}
      <div className="text-md md:text-3xl font-medium bg-gray-900 bg-opacity-60 text-white text-center p-4 w-full">
        Welcome To World of Cinema
      </div>
    </div>
  );
};

export default Banner;
