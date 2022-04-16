import * as React from "react";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = () => {
  return <nav className={styles.navbar}></nav>;
};
