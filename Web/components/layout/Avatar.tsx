import Image from "next/image";
import * as React from "react";
import styles from "@styles/layout/Avatar.module.scss";
import { MdOutlineAccountCircle, MdSettings } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { DropdownItem } from "./DropdownItem";

interface AvatarProps {
  readonly handleClickAvatar: (index: number) => void;
  readonly activeIndex: number;
}

export const Avatar: React.FC<AvatarProps> = ({
  handleClickAvatar,
  activeIndex,
}) => {
  const prevActive = React.useRef(activeIndex);
  const isActive = React.useMemo(() => activeIndex === 5, [activeIndex]);

  const toggleDropdown = React.useCallback(() => {
    if (isActive) {
      handleClickAvatar(prevActive.current);
    } else {
      prevActive.current = activeIndex;
      handleClickAvatar(5);
    }
  }, [handleClickAvatar, activeIndex, isActive]);

  return (
    <div className={styles.container}>
      <Image
        src="	https://instagram.fadb2-2.fna.fbcdn.net/v/t51.2885-19/272699709_308566414553530_8534910364705861314_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fadb2-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=v1Z1aNxZKYQAX-Jwusb&edm=AIQHJ4wBAAAA&ccb=7-5&oh=00_AT-TxeSz5UUKzAGNcBc6siUMLjDoV9DLaOU484YrwNXn0Q&oe=62911034&_nc_sid=7b02f1"
        width={24}
        height={24}
        alt="avatar"
        className={[styles.avatar, isActive ? styles.avatar__active : ""].join(
          " "
        )}
        onClick={toggleDropdown}
      />

      {isActive && <div onClick={toggleDropdown} className={styles.backdrop} />}
      <div
        className={[
          styles.dropdown,
          isActive ? styles.dropdown__active : "",
        ].join(" ")}
      >
        <DropdownItem
          label="Profile"
          icon={<MdOutlineAccountCircle />}
          onClick={() => {}}
        />
        <DropdownItem label="Saved" icon={<BsBookmark />} onClick={() => {}} />
        <DropdownItem
          label="Settings"
          icon={<MdSettings />}
          onClick={() => {}}
        />
        <DropdownItem
          label="Switch Accounts"
          icon={<HiOutlineSwitchHorizontal />}
          onClick={() => {}}
        />
        <div className={styles.hr} />
        <DropdownItem label="Log Out" onClick={() => {}} />
      </div>
    </div>
  );
};
