import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useTranslation } from "next-i18next";
import { useWallet } from "@solana/wallet-adapter-react";
import { TYPE_CONTENT } from "./constant";

const ContentLoggedModal = ({ setTypeContent }) => {
  const { t } = useTranslation("common");
  const { select, wallet, publicKey, disconnect, connecting } = useWallet();

  useEffect(() => {
    !publicKey && setTypeContent(TYPE_CONTENT.SIGN_IN);
  }, [publicKey]);

  return (
    <>
      <ModalHeader></ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack my={"40px"}>
          <Text as="p" color={"white"} m={0} textAlign={"center"}>
            {t("modal.wallet.account_logged")}
          </Text>
          <Stack gap={4} flexDirection={"row"} justifyContent={"center"}>
            <Menu>
              <MenuButton>
                <Button
                  px={"0px"}
                  py={"6px"}
                  fontSize={"0.87rem"}
                  textTransform={"uppercase"}
                  height={"fit-content"}
                  lineHeight={1.2}
                  leftIcon={
                    <img
                      src={wallet?.adapter?.icon}
                      alt={wallet?.adapter?.name}
                      style={{ width: "32px", height: "32px" }}
                    />
                  }
                  color={"#fff"}
                  backgroundColor={"transparent"}
                  onClick={() => select(wallet.adapter.name)}
                  _hover={{ transform: "unset !important" }}
                  _active={{}}
                  isLoading={connecting}
                  loadingText={t("btn_wallet.connecting")}
                >
                  {`${publicKey?.toBase58().slice(0, 7)}...${publicKey
                    ?.toBase58()
                    .slice(-4)}`}
                </Button>
              </MenuButton>
              <MenuList>
                <MenuItem _hover={{ transform: "unset" }} onClick={() => {}}>
                  {t("modal.wallet.coppy_address")}
                </MenuItem>
                <MenuItem _hover={{ transform: "unset" }} onClick={disconnect}>
                  {t("modal.wallet.disconnect")}
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Stack>
      </ModalBody>
      <ModalFooter></ModalFooter>
    </>
  );
};

export default React.memo(ContentLoggedModal);
