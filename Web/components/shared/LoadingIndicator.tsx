import * as React from "react";
import styles from "@styles/shared/LoadingIndicator.module.scss";

interface LoadingIndicatorProps {
  readonly type?: "dot" | "spinner";
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  type = "dot",
}) => {
  const items = React.useMemo(() => {
    const itemLength = type === "dot" ? 3 : 12;

    return [...new Array(itemLength)].map((_, index) => index);
  }, [type]);

  return (
    <div className={styles[type]}>
      {items.map((item) => (
        <div
          key={item}
          className={styles[`${type}__item`]}
          style={
            type == "dot"
              ? {
                  animationDelay: `${item * 0.1}s`,
                }
              : {
                  transform: `rotate(${item * 30}deg)`,
                  animationDelay: `${item * 0.1}s`,
                }
          }
        />
      ))}
    </div>
  );
};
