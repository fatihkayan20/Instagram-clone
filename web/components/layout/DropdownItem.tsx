import * as React from "react";
import styles from "@styles/layout/DropdownItem.module.scss";

interface DropdownItemProps {
  readonly label: string;
  readonly onClick: () => void;
  readonly icon?: React.ReactElement;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <button className={styles.container}>
      {Icon}
      {label}
    </button>
  );
};
