import * as React from "react";
import { IImage } from "types/IImage";
import styles from "@styles/home/PostImageCarousel.module.scss";
import Image from "next/image";

interface PostImageCarouselProps {
  readonly images: IImage[];
  readonly currentImage: number;
  readonly setCurrentImage: React.Dispatch<React.SetStateAction<number>>;
}

export const PostImageCarousel: React.FC<PostImageCarouselProps> = ({
  images,
  currentImage,
  setCurrentImage,
}) => {
  const [aspectRatio, setAspectRatio] = React.useState(1 / 1);

  const handleImageLoad = ({
    naturalWidth,
    naturalHeight,
  }: {
    naturalWidth: number;
    naturalHeight: number;
  }) => {
    setAspectRatio(naturalWidth / naturalHeight);
  };

  const handlePrev = () => {
    setCurrentImage((prevState) => prevState - 1);
  };

  const handleNext = () => {
    setCurrentImage((prevState) => prevState + 1);
  };

  return (
    <div className={styles.container}>
      {images?.map((image) => (
        <div
          key={image.id}
          className={styles.image}
          style={{
            aspectRatio,
            transform: `translateX(calc(100% * ${-currentImage}))`,
          }}
        >
          <Image
            key={image.id}
            src={image.url}
            layout="fill"
            objectFit="contain"
            alt="post image"
            onLoadingComplete={handleImageLoad}
            draggable={false}
          />
        </div>
      ))}

      {currentImage > 0 && (
        <button
          className={[styles.control__button, styles.left].join(" ")}
          onClick={handlePrev}
        >
          <div className={styles.left__icon} />
        </button>
      )}

      {currentImage < images.length - 1 && (
        <button
          className={[styles.control__button, styles.right].join(" ")}
          onClick={handleNext}
        >
          <div className={styles.right__icon} />
        </button>
      )}
    </div>
  );
};
