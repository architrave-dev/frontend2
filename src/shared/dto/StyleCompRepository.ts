import { Alignment } from '../component/headless/textarea/HeadlessTextArea';
import { WorkDisplaySize } from '../enum/EnumRepository';

export type StyledInputComponent = React.ComponentType<React.InputHTMLAttributes<HTMLInputElement>>;

export type StyledDivComponent = React.ComponentType<React.HTMLAttributes<HTMLDivElement> & {
  $alignment?: Alignment;
}>;

export type StyledAnchorComponent = React.ComponentType<React.AnchorHTMLAttributes<HTMLAnchorElement>>;

type StyledTextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  $alignment: Alignment;
};

export type StyledTextAreaComponent = React.ForwardRefExoticComponent<
  StyledTextAreaProps & React.RefAttributes<HTMLTextAreaElement>
>;

export type StyledImgDivContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  $backgroundImg?: string;
};
export type StyledImgProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  $displaySize?: WorkDisplaySize;
};

export type StyledBtnComponent = React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>;
