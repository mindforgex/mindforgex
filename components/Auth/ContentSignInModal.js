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
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import { useWallet } from "@solana/wallet-adapter-react";
import { TYPE_CONTENT } from "./constant";
import { getUserInfo } from "../../utils/helpers";
import { USER_STATUS, getAndSaveUser } from "../../utils/auth";

const ContentSignInModal = ({ setTypeContent = () => {} }) => {
  const { t } = useTranslation("common");
  const {
    select,
    wallet,
    wallets,
    publicKey,
    disconnect,

    connecting,
  } = useWallet();

  const listWalletReady = useMemo(
    () => wallets.filter((wallet) => wallet.readyState === "Installed"),
    [wallets]
  );

  useEffect(() => {
    publicKey &&
      (async () => {
        const data = getUserInfo();
        if (
          data?.user?.walletAddress === publicKey?.toString() &&
          data?.user?.status === USER_STATUS.ACTIVE
        ) {
          setTypeContent(TYPE_CONTENT.LOGGED);
          return;
        }

        const dataUser = await getAndSaveUser(publicKey?.toString());
        if (dataUser?.user?.status === USER_STATUS.ACTIVE) {
          setTypeContent(TYPE_CONTENT.LOGGED);
          return;
        }
        return;
      })();
  }, [publicKey]);

  return (
    <>
      <ModalHeader borderBottom={"1px"}>
        <Text as="h4" m={0}>
          {t("modal.wallet.sign_in")}
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack>
          {publicKey ? (
            <Stack my={"40px"}>
              <Text
                as="p"
                color={"white"}
                fontSize={"xl"}
                m={0}
                textAlign={"center"}
              >
                Do you want to{" "}
                <Button
                  backgroundColor={"transparent"}
                  m={0}
                  p={0}
                  fontSize={"x-large"}
                  color={"white"}
                  _hover={{}}
                  _active={{}}
                  onClick={() => setTypeContent(TYPE_CONTENT.SIGN_UP)}
                >
                  {t("modal.wallet.sign_up")}?
                </Button>
              </Text>
              <Stack
                gap={4}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                my={"10px"}
              >
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
                      onClick={async () => {
                        select(wallet.adapter.name);
                      }}
                      _hover={{ transform: "unset !important" }}
                      _active={{}}
                      isLoading={connecting}
                      loadingText={t("btn_wallet.connecting")}
                    >
                      {`${publicKey?.toString().slice(0, 7)}...${publicKey
                        ?.toString()
                        .slice(-4)}`}
                    </Button>
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      _hover={{ transform: "unset" }}
                      onClick={() => {}}
                    >
                      {t("modal.wallet.coppy_address")}
                    </MenuItem>
                    <MenuItem
                      _hover={{ transform: "unset" }}
                      onClick={disconnect}
                    >
                      {t("modal.wallet.disconnect")}
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
              <Text as="p" color={"white"} m={0} textAlign={"center"}>
                {t("modal.wallet.account_not_registered")}
              </Text>
            </Stack>
          ) : (
            <Stack mb={"24px"} mt={"30px"}>
              {listWalletReady.length ? (
                listWalletReady.map((wallet) => (
                  <Tooltip
                    key={wallet.adapter.name}
                    label={wallet.adapter.name}
                    placement="bottom"
                  >
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
                      onClick={async () => select(wallet.adapter.name)}
                      _hover={{}}
                      _active={{}}
                      isLoading={connecting}
                      loadingText={t("btn_wallet.connecting")}
                    >
                      Login via {wallet.adapter.name}
                    </Button>
                  </Tooltip>
                ))
              ) : (
                <Text>{t("modal.wallet.no_wallet")}</Text>
              )}
            </Stack>
          )}
        </Stack>
      </ModalBody>
      <ModalFooter justifyContent={"center"}>
        {!publicKey && (
          <Text as="p" color={"white"} fontSize={"md"}>
            {t("modal.wallet.please_sign_up")}
          </Text>
        )}
      </ModalFooter>
    </>
  );
};

export default React.memo(ContentSignInModal);
