import { Outlet } from "@tanstack/react-router";
import { Header } from "../../shared/ui/header/header";
import styles from "../../shared/ui/header/header.module.css";
import { LoginButton } from "../../features/auth/ui/login-button";

export const Rootlayout = () => (
  <>
    <Header renderAccountBar={() => <LoginButton />} />
    <div className={styles.container}></div>
    <Outlet />
  </>
);
