import { Outlet } from "@tanstack/react-router";
import { Header } from "../../shared/ui/header/header";
import styles from "../../shared/ui/header/header.module.css";
import { AccountBar } from "../../features/auth/ui/account-bar";

export const Rootlayout = () => (
  <>
    <Header renderAccountBar={() => <AccountBar />} />
    <div className={styles.container}></div>
    <Outlet />
  </>
);
