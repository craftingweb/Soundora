import { Outlet } from "@tanstack/react-router";
import { Header } from "../../shared/ui/header";
import styles from "../../shared/ui/header.module.css";

export const Rootlayout = () => (
  <>
    <Header renderAccountBar={() => <div>Account</div>} />
    <div className={styles.container}></div>
    <Outlet />
  </>
);
