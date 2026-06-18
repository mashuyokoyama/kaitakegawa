"use client";

import Image from "next/image";
import { forwardRef, type CSSProperties } from "react";

type ArtworkImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
  style?: CSSProperties;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  onError?: () => void;
};

const ArtworkImage = forwardRef<HTMLImageElement, ArtworkImageProps>(
  function ArtworkImage(
    {
      src,
      alt,
      sizes,
      className,
      priority,
      loading,
      width = 2000,
      height = 2500,
      style,
      onLoad,
      onError,
    },
    ref
  ) {
    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={loading}
        className={className}
        style={style}
        onLoad={onLoad}
        onError={onError}
      />
    );
  }
);

export default ArtworkImage;
