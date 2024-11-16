import { WorkDisplaySize } from '../enum/EnumRepository';

export type StyledInputComponent = React.ComponentType<React.InputHTMLAttributes<HTMLInputElement>>;

export type StyledDivComponent = React.ComponentType<React.HTMLAttributes<HTMLDivElement>>;

export type StyledImgDivContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  $backgroundImg?: string;
};
export type StyledImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  $displaySize?: WorkDisplaySize;
};