import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

interface ZoomableImageProps {
  imageUrl: string; // e.g. the S3 URL
}

/** 
 * Container: dynamically sized after we know the image's ratio 
 * and the parent container’s size.
 */
const Container = styled.div<{
  containerWidth: number;
  containerHeight: number;
  isDragging: boolean;
  canGrab: boolean;
}>`
  width: ${({ containerWidth }) => containerWidth / 10 * 9}px;
  height: ${({ containerHeight }) => containerHeight / 10 * 9}px;
  overflow: hidden;
  position: relative;
  border: 0.5px solid ${({ theme }) => theme.colors.color_Gray_02};
  cursor: ${({ canGrab, isDragging }) =>
    canGrab ? (isDragging ? "grabbing" : "grab") : "zoom-in"};
`;

/**
 * The zoomable, panning image with top-left origin.
 * (Width/height set to 100% so it fills the container by default,
 * but we apply transforms to zoom/pan.)
 */
const StyledImage = styled.img`
  transform-origin: top left;
  user-select: none;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;

const ZoomableImage: React.FC<ZoomableImageProps> = ({ imageUrl }) => {
  const outerRef = useRef<HTMLDivElement>(null); // This is the parent container (OriginImgContent).
  const containerRef = useRef<HTMLDivElement>(null); // This is our zoomable container.

  // Container dimension (after we measure the image & parent).
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);

  // Zoom & pan state
  const [scale, setScale] = useState<number>(1);
  const [translateX, setTranslateX] = useState<number>(0);
  const [translateY, setTranslateY] = useState<number>(0);

  // Drag state
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [lastMouseX, setLastMouseX] = useState<number>(0);
  const [lastMouseY, setLastMouseY] = useState<number>(0);

  // A small utility to clamp a value between a min and max.
  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  /**
   * Once the image is loaded, figure out how big we want the container
   * to be so that the image does NOT overflow the parent,
   * while keeping its original aspect ratio.
   */
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget as HTMLImageElement;
    if (!outerRef.current) return;

    // Measure the parent (OriginImgContent) size.
    const outerRect = outerRef.current.getBoundingClientRect();
    const maxW = outerRect.width;
    const maxH = outerRect.height;

    // Figure out which dimension to "standardize".
    // If the image is wider than tall => match parent's width.
    // If the image is taller than wide => match parent's height.
    const imgRatio = naturalWidth / naturalHeight;
    const parentRatio = maxW / maxH;

    let newWidth: number, newHeight: number;

    // If the image is relatively wider than the parent container, or about the same ratio:
    if (imgRatio >= parentRatio) {
      // Use the parent's width as the max container width
      newWidth = maxW;
      // Keep ratio
      newHeight = maxW / imgRatio;
      if (newHeight > maxH) {
        // In case our ratio guess still goes beyond parent's height, clamp it
        newHeight = maxH;
        newWidth = maxH * imgRatio;
      }
    } else {
      // Image is relatively taller => match parent's height
      newHeight = maxH;
      newWidth = maxH * imgRatio;
      if (newWidth > maxW) {
        // Again, clamp if needed
        newWidth = maxW;
        newHeight = maxW / imgRatio;
      }
    }

    setContainerWidth(newWidth);
    setContainerHeight(newHeight);

    // Reset any previous transformations
    setScale(1);
    setTranslateX(0);
    setTranslateY(0);
  };

  /**
   * The core function that clamps translations based on the container size
   * and the scaled image size (containerWidth * scale).
   */
  const clampTranslate = (
    proposedTranslateX: number,
    proposedTranslateY: number,
    newScale: number
  ): [number, number] => {
    // Container width/height
    const cWidth = containerWidth;
    const cHeight = containerHeight;

    // Scaled image size
    const scaledWidth = cWidth * newScale;
    const scaledHeight = cHeight * newScale;

    let clampedX: number;
    let clampedY: number;

    // Horizontal clamp
    if (scaledWidth <= cWidth) {
      clampedX = 0; // no horizontal panning
    } else {
      const minX = cWidth - scaledWidth; // negative
      const maxX = 0;
      clampedX = clamp(proposedTranslateX, minX, maxX);
    }

    // Vertical clamp
    if (scaledHeight <= cHeight) {
      clampedY = 0; // no vertical panning
    } else {
      const minY = cHeight - scaledHeight; // negative
      const maxY = 0;
      clampedY = clamp(proposedTranslateY, minY, maxY);
    }

    return [clampedX, clampedY];
  };

  /**
   * Wheel-based zoom (scroll up => zoom in, scroll down => zoom out).
   * Zoom is anchored on the cursor position.
   * scale range: [1 ... 5]
   */
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    // e.preventDefault(); 브라우저에서 워닝 뜸
    if (!containerRef.current) return;

    // Where is the cursor in the container?
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    // Zoom factor
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = clamp(scale * zoomFactor, 1, 5);

    if (newScale === scale) return;

    // If scale resets to 1, reset translation
    if (newScale === 1) {
      setScale(1);
      setTranslateX(0);
      setTranslateY(0);
      return;
    }

    // Keep cursor in same relative position:
    const ratio = newScale / scale;
    let newTranslateX = translateX - offsetX * (ratio - 1);
    let newTranslateY = translateY - offsetY * (ratio - 1);

    [newTranslateX, newTranslateY] = clampTranslate(
      newTranslateX,
      newTranslateY,
      newScale
    );

    setScale(newScale);
    setTranslateX(newTranslateX);
    setTranslateY(newTranslateY);
  };

  /**
   * Mouse down => start dragging (only if zoomed in).
   */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scale > 1) {
      e.preventDefault();
      setIsDragging(true);
      setLastMouseX(e.clientX);
      setLastMouseY(e.clientY);
    }
  };

  /**
   * Mouse move => drag (pan) if isDragging.
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMouseX;
    const deltaY = e.clientY - lastMouseY;

    let newTranslateX = translateX + deltaX;
    let newTranslateY = translateY + deltaY;

    [newTranslateX, newTranslateY] = clampTranslate(
      newTranslateX,
      newTranslateY,
      scale
    );

    setTranslateX(newTranslateX);
    setTranslateY(newTranslateY);
    setLastMouseX(e.clientX);
    setLastMouseY(e.clientY);
  };

  /**
   * Mouse up / mouse leave => stop dragging.
   */
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  /**
   * On first render, we can attempt to measure the parent container
   * (in case we need it). In many cases, you'd measure on window resize too.
   */
  useEffect(() => {
    if (outerRef.current) {
      // Just an initial measure or you could do a resize observer, etc.
      // We'll do nothing special here, but you might want to store
      // outerRef's size in state if needed outside of handleImageLoad.
    }
  }, []);

  return (
    <InnerImageContainer
      ref={outerRef}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Only render the container once we know our target dimension
          (i.e., after the image is loaded). If containerWidth or containerHeight
          is zero, you could hide it or show a loader. */}
      {containerWidth > 0 && containerHeight > 0 && (
        <Container
          ref={containerRef}
          containerWidth={containerWidth}
          containerHeight={containerHeight}
          isDragging={isDragging}
          canGrab={scale > 1}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          <StyledImage
            src={imageUrl}
            alt="Zoomable"
            style={{
              transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
            }}
          />
        </Container>
      )}

      {/* We use an invisible image just for loading & dimension detection. */}
      <img
        src={imageUrl}
        alt="hiddenDimensionDetector"
        style={{ display: "none" }}
        onLoad={handleImageLoad}
      />
    </InnerImageContainer>
  );
};

export default ZoomableImage;


const InnerImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;