import { LabelSize } from "../../enums/LabelSize";

export const Label: LabelComponent = ({ children, size }) => {
  return <span className={`${size}`}>{children}</span>;
};

type LabelProps = {
  children: React.ReactNode;
  size: LabelSize;
};

type LabelComponent = (props: LabelProps) => React.ReactElement;
