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
        src="https://scontent.cdninstagram.com/v/t51.2885-19/272699709_308566414553530_8534910364705861314_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=110&_nc_ohc=VUPnNUs4xcUAX8Pb9TD&edm=APs17CUBAAAA&ccb=7-4&oh=00_AT8jyFZTrHkfwccRuBCPLvcTwP66ZThB4_BG98i5U1bXwA&oe=62619A34&_nc_sid=978cb9"
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
