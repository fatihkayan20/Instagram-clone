import * as React from "react";
import { Navbar } from "./Navbar";
import styles from "@styles/layout/UserLayout.module.scss";

interface IUserLayoutProps {
  readonly children: React.ReactNode;
}

const UserLayout = ({ children }: IUserLayoutProps) => {
  return (
    <>
      <Navbar />
      <main className={styles.container}>{children}</main>
    </>
  );
};

export default UserLayout;
