import * as React from "react";
import styles from "@styles/shared/Modal.module.scss";

interface ModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly animation?: "slide" | "fade" | "zoomOut" | "zoomIn";
  readonly children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  isOpen,
  animation,
}) => {
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div className={styles.modal__backdrop} onClick={onClose}>
          <div
            className={[
              styles.modal__content,
              animation ? styles[animation] : styles.zoomOut,
            ].join(" ")}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
