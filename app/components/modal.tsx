import { useEffect, useState, useRef, useCallback } from "react";
import "./modal.css";

export interface ModalProps {
  open: boolean;
  onClose: Function;
  children: React.ReactNode;
}

export default function Modal({ open, onClose, children }: ModalProps) {
  const [modalClassName, setModalClassName] = useState("modal");
  const handleCloseOutside = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if ((event.target as HTMLDivElement).classList.contains("modal")) {
        onClose();
      }
    },
    [onClose]
  );

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const modalRef = useRef(null);

  useEffect(() => {
    setModalClassName(open ? "modal show" : "modal");
    document
      .getElementsByTagName("body")[0]
      .setAttribute("style", `overflow: ${open ? "hidden" : "auto"}`);
  }, [open]);

  // Handle 'Escape' key pressed
  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      var key = event.code || event.which || event.keyCode;

      if ((key === "Escape" || key === 27) && open) {
        handleClose();
        event.stopPropagation();
      }
    },
    [handleClose, open]
  );
  // Listen to keyup event
  useEffect(() => {
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [handleEscape]);

  return (
    <div className={modalClassName} ref={modalRef} onClick={handleCloseOutside}>
      <div className="modal-content" role="dialog" aria-modal="true">
        {onClose && (
          <button className="modal-close" onClick={handleClose}>
            <span className="sr-only">Close</span>
          </button>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
