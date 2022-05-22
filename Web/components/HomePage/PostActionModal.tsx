import * as React from "react";
import styles from "@styles/home/PostActionModal.module.scss";
import { Modal } from "@components/shared/Modal";

interface PostActionModalProps {}

export const PostActionModal: React.FC<PostActionModalProps> = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const options = React.useMemo(() => {
    return [
      {
        label: "Şikayet Et",
        color: "#ed4956",
        onClick: () => {
          handleCloseModal();
          console.log("Şikayet Et");
        },
      },
      {
        label: "Takibi Bırak",
        color: "#ed4956",
        onClick: () => {
          handleCloseModal();
          console.log("Takibi Bırak");
        },
      },
      {
        label: "Gönderiye git",
        color: "#000",
        onClick: () => {
          handleCloseModal();
          console.log("Gönderiye git");
        },
      },
      {
        label: "Paylaş...",
        color: "#000",
        onClick: () => {
          handleCloseModal();
          console.log("Paylaş...");
        },
      },
      {
        label: "Bağlantıyı Kopyala",
        color: "#000",
        onClick: () => {
          handleCloseModal();
          console.log("Bağlantıyı Kopyala");
        },
      },
      {
        label: "Sitene Göm",
        color: "#000",
        onClick: () => {
          handleCloseModal();
          console.log("Sitene Göm");
        },
      },
      {
        label: "İptal",
        color: "#000",
        onClick: () => {
          handleCloseModal();
          console.log("İptal");
        },
      },
    ];
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.actions}>
      <button className={styles.open__button} onClick={handleOpenModal}>
        ...
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {options.map((option) => (
          <button
            key={option.label}
            className={styles.modal__option}
            style={{ color: option.color }}
            onClick={option.onClick}
          >
            {option.label}
          </button>
        ))}
      </Modal>
    </div>
  );
};
