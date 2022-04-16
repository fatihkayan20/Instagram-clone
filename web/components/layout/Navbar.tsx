import * as React from "react";
import styles from "@styles/layout/Navbar.module.scss";
import Image from "next/image";
import HomeActive from "@/public/Home-active.svg";
import HomePassive from "@/public/Home-passive.svg";
import MessageActive from "@/public/Message-active.svg";
import MessagePassive from "@/public/Message-passive.svg";
import CreateActive from "@/public/Create-active.svg";
import CreatePassive from "@/public/Create-passive.svg";
import ExploreActive from "@/public/Explore-active.svg";
import ExplorePassive from "@/public/Explore-passive.svg";
import HeartActive from "@/public/Heart-active.svg";
import HeartPassive from "@/public/Heart-passive.svg";
import { Avatar } from "./Avatar";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const icons = React.useMemo(
    () => [
      {
        name: "Home",
        active: HomeActive,
        passive: HomePassive,
        index: 0,
      },
      {
        name: "Message",
        active: MessageActive,
        passive: MessagePassive,
        index: 1,
      },
      {
        name: "Create",
        active: CreateActive,
        passive: CreatePassive,
        index: 2,
      },
      {
        name: "Explore",
        active: ExploreActive,
        passive: ExplorePassive,
        index: 3,
      },
      {
        name: "Heart",
        active: HeartActive,
        passive: HeartPassive,
        index: 4,
      },
    ],
    []
  );

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <nav className={styles.container}>
      <div className={styles.container__logo} />
      <div className={styles.container__icons}>
        {icons.map((icon) => {
          const isActive = icon.index === activeIndex;
          const Icon = isActive ? icon.active : icon.passive;
          return (
            <Image
              key={icon.index}
              src={Icon}
              alt={icon.name}
              width={24}
              height={24}
              onClick={() => handleClick(icon.index)}
              className={styles.container__icons__icon}
            />
          );
        })}
        <Avatar handleClickAvatar={handleClick} activeIndex={activeIndex} />
      </div>
    </nav>
  );
};
