import { useState } from "react";
export function useModalState(defaultModalState) {
  const [modalState, setModalState] = useState(defaultModalState);

  const open = (modal) => {
    setModalState({
      ...defaultModalState,
      [modal]: true,
    });
  };

  const close = (modal) => {
    setModalState({
      ...defaultModalState,
      [modal]: false,
    });
  };

  const closeAll = () => {
    setModalState(defaultModalState);
  };

  return { modalState, open, close, closeAll };
}
