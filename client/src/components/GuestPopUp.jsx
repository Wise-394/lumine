import { useEffect } from "react";

export function GuestPopUp({ setIsOpen, isOpen, dialogRef }) {
  const handleClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    if (!dialogRef.current) return;
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [dialogRef, isOpen]);

  return (
    <dialog ref={dialogRef}>
      <div>
        <h1> Hold on a second!</h1>
        <button onClick={handleClose}>X</button>
      </div>

      <p>
        You'll need an account to take this action. Create one or sign in to
        keep going.
      </p>
      <div>
        <button>Register</button>
        <button>Login</button>
      </div>
    </dialog>
  );
}
