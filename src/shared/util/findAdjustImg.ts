import { ImageMetadata } from '../dto/EntityRepository';
import { BREAKPOINTS } from '../enum/EnumRepository';


const getDeviceType = (width: number): string => {
  if (width <= BREAKPOINTS.MOBILE) return 'MOBILE';
  if (width <= BREAKPOINTS.TABLET) return 'TABLET';
  if (width <= BREAKPOINTS.LAPTOP) return 'LAPTOP';
  if (width <= BREAKPOINTS.DESKTOP) return 'DESKTOP';
  return 'origin';
};

const getNextDeviceType = (currentType: string, metadata: ImageMetadata): string => {
  const deviceOrder = ['MOBILE', 'TABLET', 'LAPTOP', 'DESKTOP', 'origin'];
  const currentIndex = deviceOrder.indexOf(currentType);

  for (let i = currentIndex + 1; i < deviceOrder.length; i++) {
    const nextType = deviceOrder[i];
    if (metadata[nextType as keyof ImageMetadata]) {
      return nextType;
    }
  }

  return currentType;
};

export const getFallbackDeviceType = (metadata: ImageMetadata, width: number): string => {
  const deviceType = getDeviceType(width);
  if (metadata[deviceType as keyof ImageMetadata]) {
    return deviceType;
  } else {
    return getNextDeviceType(deviceType, metadata);
  }
};

export const isBase64 = (url: string): boolean => {
  const base64Pattern = /^data:image\/(jpeg|jpg|png|gif);base64,/;
  return base64Pattern.test(url);
};

export const convertToJsonMetadata = (data: any): ImageMetadata => {
  return {
    MOBILE: data.MOBILE === 'true',
    TABLET: data.TABLET === 'true',
    LAPTOP: data.LAPTOP === 'true',
    DESKTOP: data.DESKTOP === 'true',
    origin: true,
  }
}