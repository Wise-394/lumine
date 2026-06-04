import { useEffect } from "react";
import styles from "@styles/components/GuestPopUp.module.css";
import { IoMdClose } from "react-icons/io";
import { TerminalIcons } from "./TerminalIcons.jsx";
import { TbLock } from "react-icons/tb";
import { useNavigate } from "react-router";
import { useAuthenticationStore } from "../store/authenticationStore.jsx";
import { useDialogStore } from "../store/dialogStore.jsx";

export function GuestPopUp({ dialogRef }) {
  const { logoutGuest } = useAuthenticationStore();
  const { isDialogOpen, toggleDialog } = useDialogStore();
  const navigate = useNavigate();
  const handleClose = () => {
    toggleDialog();
  };
  useEffect(() => {
    if (!dialogRef.current) return;
    if (isDialogOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [dialogRef, isDialogOpen]);

  const handleRegisterLogin = (path) => {
    logoutGuest();
    navigate(path);
  };

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.dialog} ${isDialogOpen ? styles.active : ""}`}
    >
      <div className={styles.titleBar}>
        <div className={styles.dots}>
          <TerminalIcons />
        </div>
        <span className={styles.filename}>auth_required.js</span>
        <button
          onClick={handleClose}
          className={styles.closeBtn}
          aria-label="Close"
        >
          <IoMdClose />
        </button>
      </div>

      <div className={styles.body}>
        <TbLock className={styles.iconCircle} />
        <h1>Hold on a second!</h1>
        <p>
          You'll need an account to take this action. <span>Create one</span> or
          sign in to keep going.
        </p>
        <div className={styles.buttons}>
          <button
            className={styles.outline}
            onClick={() => handleRegisterLogin("/login")}
          >
            Login
          </button>
          <button
            className={styles.solid}
            onClick={() => handleRegisterLogin("/register")}
          >
            Register
          </button>
        </div>
      </div>
    </dialog>
  );
}
