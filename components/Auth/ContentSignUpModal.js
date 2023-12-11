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
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "next-i18next";
import { useWallet } from "@solana/wallet-adapter-react";
import RadioGroupController from "../Form/RadioGroupController";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputController from "../Form/InputController";
import FormChanelKOL from "./FormChanelKOL";
import { useCreateChannel } from "../../hooks/api/useChannel";
import { TYPE_CONTENT } from "./constant";
import { getAndSaveUser } from "../../utils/auth";

const USER_TYPE = {
  KOL: "1",
  USER: "2",
};

const ContentSignUpModal = ({ setTypeContent }) => {
  const { t } = useTranslation("common");
  const { select, wallet, wallets, publicKey, disconnect, connecting } =
    useWallet();
  const { mutate: createChannel, isLoading } = useCreateChannel({
    onSuccess: async (success) => {
      await getAndSaveUser(publicKey);
      setTypeContent(TYPE_CONTENT.LOGGED);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const defaultValues = {
    userType: USER_TYPE.KOL,
    email: "",
    name: "",
    age: "",
    nickName: "",
    description: "",
    // avatar: "",
    discord: "",
    youtube: "",
    x: "",
    walletAddress: "",
  };

  const validation = Yup.object().shape({
    walletAddress: Yup.string().required("required"),
    userType: Yup.string().required(t("validate.required")),
    email: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.USER,
      then: () =>
        Yup.string()
          .required(t("validate.required"))
          .email(t("validate.is_email"))
          .max(100, t("validate.string_max_100")),
    }),
    name: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.string()
          .required(t("validate.required"))
          .max(255, t("validate.string_max_255")),
    }),
    nickName: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.string()
          .required(t("validate.required"))
          .max(255, t("validate.string_max_255")),
    }),
    description: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.string()
          .required(t("validate.required"))
          .max(1000, t("validate.string_max_1000")),
    }),
    age: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .required(t("validate.required"))
          .min(18, t("validate.number_min_18")),
    }),
    discord: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.string()
          .url(t("validate.is_url"))
          .max(255, t("validate.string_max_255")),
    }),
    youtube: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.string()
          .url(t("validate.is_url"))
          .max(255, t("validate.string_max_255")),
    }),
    x: Yup.string().when("userType", {
      is: (value) => value === USER_TYPE.KOL,
      then: () =>
        Yup.string()
          .url(t("validate.is_url"))
          .max(255, t("validate.string_max_255")),
    }),
  });

  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues,
    resolver: yupResolver(validation),
  });

  const listWalletReady = useMemo(
    () => wallets.filter((wallet) => wallet.readyState === "Installed"),
    [wallets]
  );

  useEffect(() => {
    setValue("walletAddress", publicKey?.toString());
  }, [publicKey]);

  const onSubmit = (data) => {
    const { walletAddress, ...dataForm } = data;
    let formatData;
    if (dataForm.userType === USER_TYPE.USER) {
      formatData = {
        userType: dataForm.userType,
        email: dataForm.email,
      };
    } else {
      formatData = {
        ...dataForm,
        discord: dataForm.discord || null,
        youtube: dataForm.youtube || null,
        x: dataForm.x || null,
      };
    }
    createChannel(formatData);
  };
  return (
    <>
      <ModalHeader borderBottom={"1px"}>
        <Text as="h4" m={0}>
          {t("modal.wallet.sign_up")}
        </Text>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Stack>
          <Text as="p" color={"white"} fontSize={"md"} p={0} m={0}>
            {t("modal.wallet.select_wallet")}:
          </Text>
          {!publicKey ? (
            <Stack
              direction="row"
              flexWrap={"wrap"}
              gap={"4"}
              justifyContent={"space-between"}
            >
              {listWalletReady.length ? (
                listWalletReady.map((wallet) => (
                  <Tooltip
                    key={wallet.adapter.name}
                    label={wallet.adapter.name}
                    placement="bottom"
                  >
                    <Button
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
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
                      _hover={{}}
                      isLoading={connecting}
                      loadingText={t("btn_wallet.connecting")}
                    >
                      {wallet.adapter.name}
                    </Button>
                  </Tooltip>
                ))
              ) : (
                <Text>{t("modal.wallet.no_wallet")}</Text>
              )}
            </Stack>
          ) : (
            <Stack gap={4} flexDirection={"row"} alignItems={"center"}>
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
                    {`${publicKey?.toString().slice(0, 7)}...${publicKey
                      ?.toString()
                      .slice(-4)}`}
                  </Button>
                </MenuButton>
                <MenuList>
                  <MenuItem _hover={{ transform: "unset" }} onClick={() => {}}>
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
          )}
        </Stack>
        <Stack>
          <RadioGroupController
            control={control}
            name="userType"
            label="User type:"
            option={[
              { value: USER_TYPE.KOL, label: "Streamers, KOLs, KOCs" },
              { value: USER_TYPE.USER, label: "Fans, Followers, Users" },
            ]}
          />
          <InputController control={control} name="email" label="Email:" />
          {watch("userType") === USER_TYPE.KOL && (
            <FormChanelKOL control={control} />
          )}
        </Stack>
      </ModalBody>
      <ModalFooter justifyContent={"center"}>
        <Button onClick={handleSubmit(onSubmit)}>
          {t("modal.wallet.sign_up")}
        </Button>
      </ModalFooter>
    </>
  );
};

export default React.memo(ContentSignUpModal);
