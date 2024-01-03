import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { useWallet } from "@solana/wallet-adapter-react";
import ContentSignUpModal from "./ContentSignUpModal";
import ContentSignInModal from "./ContentSignInModal";
import { TYPE_CONTENT, USER_STATUS } from "./constant";
import { getUserInfo } from "../../utils/helpers";
import ContentLoggedModal from "./ContentLoggedModal";

const SelectWalletButton = () => {
  const { t } = useTranslation("common");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { publicKey } = useWallet();
  const userInfo = getUserInfo();
  const [typeContent, setTypeContent] = useState(() => {
    if (
      userInfo?.user?.walletAddress === publicKey?.toString() &&
      userInfo?.user?.status === USER_STATUS.ACTIVE
    )
      return TYPE_CONTENT.LOGGED;
    return TYPE_CONTENT.SIGN_IN;
  });

  let titleButton = t("modal.wallet.select_wallet");
  if (publicKey) {
    const base58 = publicKey.toBase58();
    titleButton = base58.slice(0, 4) + '..' + base58.slice(-4);
  }

  return (
    <>
      <Button
        px={"20px"}
        py={"14px"}
        fontSize={"0.87rem"}
        textTransform={"uppercase"}
        height={"fit-content"}
        lineHeight={1.2}
        color={"#fff"}
        backgroundColor={"transparent"}
        _hover={{}}
        borderRadius={"4px"}
        border={"1px"}
        borderColor={"red"}
        sx={{
          fontSize: "lg",
        }}
        onClick={onOpen}
      >
        {titleButton}
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size={"xl"}>
        <ModalOverlay />
        <ModalContent bg={"#181c23"} minHeight={"360px"}>
          {typeContent === TYPE_CONTENT.LOGGED && (
            <ContentLoggedModal setTypeContent={setTypeContent} />
          )}
          {typeContent === TYPE_CONTENT.SIGN_UP && (
            <ContentSignUpModal setTypeContent={setTypeContent} />
          )}
          {typeContent === TYPE_CONTENT.SIGN_IN && (
            <ContentSignInModal setTypeContent={setTypeContent} />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default React.memo(SelectWalletButton);
