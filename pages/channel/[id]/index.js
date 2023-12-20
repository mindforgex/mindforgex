import React, { useEffect, useMemo, useState } from "react";
import BreadCrumbs from "../../../components/BreadCrumbs";
import { ProfileInfo } from "../../../components/ListProfile";
import {
  Button,
  Image,
  Tooltip,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MOCK_DETAIL_PROFILE_DATA } from "../../../utils/data";
import classNames from "classnames";
import SocialList from "../../../components/SocialList";
import Head from "next/head";
import Section from "../../../components/Section";
import NFTProfile from "../../../components/NFTProfile";
import ChannelPost from "../../../components/Channel/Post";
import { donateChannel } from "../../../services";
import { compose, getUserInfo, numberFormatter } from "../../../utils/helpers";
import DonateModel from "../../../components/Channel/DonateModel";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  LAMPORTS_PER_SOL,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import axios from "axios";
import Statistic from "../../../components/Channel/Statistic";
import { useModalState } from "../../../hooks/useModalState";
import { FaFacebook, FaTwitter } from "react-icons/fa";
import UpdateChannelModel from "../../../components/Channel/UpdateChannelModel";
import {
  useDetailChannel,
  useSubscribeChannel,
} from "../../../hooks/api/useChannel";
import UpdateAboutMeModel from "../../../components/Channel/UpdateAboutMeModel";
import { optionError, optionSuccess } from "../../../utils/optionToast";
import CreateOrUpdatePostModel from "../../../components/Channel/CreateOrUpdatePostModel";
import DeletePostModel from "../../../components/Channel/DeletePostModel";

const MODAL_DONATE = "modal_donate";
const MODAL_UPDATE_CHANNEL = "modal_update_channel";
const MODAL_UPDATE_ABOUT_ME = "modal_update_about_me";
const MODAL_CREATE_OR_UPDATE_POST = "modal_create_or_update_post";
const MODAL_DELETE_POST = "modal_delete_post";

const SOCIAL_SHARE = {
  FACEBOOK: "FACEBOOK",
  TWITTER: "TWITTER",
};

function DetailChannel() {
  const router = useRouter();
  const toast = useToast();
  const userInfo = getUserInfo();
  const { data: dataDetail, isLoading: loadingDetail } = useDetailChannel(
    router.query?.id
  );
  const { mutate: subscribeChannel, isLoading: isLoadingSubscribeChannel } =
    useSubscribeChannel({
      onSuccess: async (success) => {
        setSubscribed(true);
        toast({
          ...optionSuccess,
          title: t("channel.subscribe_success"),
        });
      },
      onError: (error) => {
        toast({
          ...optionError,
          title: t("channel.subscribe_failed"),
        });
      },
    });
  const [detailChannel, setDetail] = useState(MOCK_DETAIL_PROFILE_DATA);
  const [isUserSubscribed, setSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [currentPost, setCurrentPost] = useState(null);
  const { t } = useTranslation("common");
  const { open, close, modalState } = useModalState({
    [MODAL_DONATE]: false,
    [MODAL_UPDATE_CHANNEL]: false,
    [MODAL_UPDATE_ABOUT_ME]: false,
    [MODAL_CREATE_OR_UPDATE_POST]: false,
    [MODAL_DELETE_POST]: false,
  });

  const isAuthor = useMemo(() => {
    const idUserCurrent = userInfo?.user?.userId;
    const idUserFromChannel = detailChannel?.userId;
    return idUserCurrent === idUserFromChannel;
  }, [userInfo, detailChannel]);

  const userSubscribeChannel = async () => {
    if (!userInfo?.user?.walletAddress) {
      return toast({
        ...optionError,
        title: "Please connect wallet!",
      });
    }
    if (isUserSubscribed) return;
    subscribeChannel(router.query.id);
  };

  useEffect(() => {
    (async () => {
      if (dataDetail) {
        const { nftCollections, userSubcribe } = dataDetail;
        const nftCollectionData = await Promise.all(
          nftCollections.map(async (_item) => {
            const getMetadataRes = await axios.get(_item.metadata_uri);
            return {
              ..._item,
              ...getMetadataRes.data,
            };
          }) || [async () => {}]
        );
        setDetail({ ...dataDetail, nftCollections: nftCollectionData || [] });
        setSubscribed(
          !!userSubcribe.find((user) => user === userInfo?.user?.walletAddress)
        );
      }
    })();
  }, [dataDetail]);

  const donateForIdol = async (args) => {
    const { encode: transaction } = args;
    try {
      const signature = await sendTransaction(transaction, connection);
      return { ...args, tx: signature };
    } catch (err) {
      throw err;
    }
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const getDonateEndcode = async (args) => {
    const { donate } = args;
    setIsLoading(true);
    const latestBlockhash = await connection.getLatestBlockhash();
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(detailChannel.donateReceiver),
        lamports: LAMPORTS_PER_SOL * donate,
        latestBlockhash: latestBlockhash.blockhash,
      })
    );
    return { ...args, encode: transaction };
  };

  const verifyTransaction = async (args) => {
    const { tx, donate } = args;
    await sleep(5000);
    const {
      context: { slot },
    } = await connection.confirmTransaction(tx, "finalized");
    try {
      await donateChannel(detailChannel._id, { tx, amount: Number(donate) });
      return { ...args, confirm: slot };
    } catch (err) {
      throw err;
    }
  };

  const notifyDonate = (args) => {
    setTimeout(() => {
      setIsLoading(false);
      toast({
        ...optionSuccess,
        title: t("channel.donate_success", { donate: args?.donate }),
      });
    }, 1000);
  };

  const donateForChannel = async (donate) => {
    try {
      await compose(
        notifyDonate,
        verifyTransaction,
        donateForIdol,
        getDonateEndcode
      )(donate);
    } catch (error) {
      setIsLoading(false);
      toast({
        ...optionError,
        title: t("donate_failed"),
      });
    }
  };

  const handleDonate = () => {
    publicKey && open(MODAL_DONATE);
    !publicKey &&
      toast({
        ...optionError,
        title: t("please_connect_wallet"),
      });
  };

  const handleShare = (type) => {
    const url = encodeURIComponent(window.location.href);
    let shareUrl = "";
    switch (type) {
      case SOCIAL_SHARE.FACEBOOK:
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case SOCIAL_SHARE.TWITTER:
        shareUrl = `https://twitter.com/intent/tweet?url=${url}`;
        break;
      default:
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    }
    window.open(shareUrl, "_blank");
  };

  const donateTooltip = useMemo(() => {
    return t(publicKey ? "channel.donate_idol" : "please_connect_wallet");
  }, [publicKey]);

  const subscribeChannelLabel = useMemo(() => {
    return t(isUserSubscribed ? "channel.subscribed" : "channel.subscribe");
  }, [isUserSubscribed]);

  return (
    <>
      <Head>
        <title>{detailChannel.channelName}</title>
      </Head>
      <div id="content" className="site-content">
        <div className="nk-gap-2" />
        <BreadCrumbs
          label={detailChannel.name}
          root={{ label: t("channel.label"), href: "" }}
        />
        <div className="nk-gap-2 mt-10" />
        <div className="content-area container cyberpress">
          <main id="main" className="site-main" role="main">
            <div className="row">
              <div className="col-lg-8">
                <article className="team type-team status-publish has-post-thumbnail hentry">
                  <div className="entry-content">
                    <div className="cyberpress-team d-flex justify-content-between">
                      <div className="post-thumbnail d-flex">
                        <Image
                          width={300}
                          height={300}
                          src={detailChannel.avatarUrl}
                          className="attachment-large size-large mr-3"
                          alt=""
                        />{" "}
                        <ul className="cyberpress-team-info">
                          <ProfileInfo
                            metadata={{
                              key: t("channel.country"),
                              value: detailChannel?.country?.name,
                            }}
                          />
                          <ProfileInfo
                            metadata={{
                              key: t("channel.sex"),
                              value: detailChannel?.sex,
                            }}
                          />
                          <ProfileInfo
                            metadata={{
                              key: t("channel.birthday"),
                              value: detailChannel?.dateOfBirth,
                            }}
                          />
                          <ProfileInfo
                            metadata={{
                              key: t("channel.perfessional_field"),
                              value: detailChannel?.profestionalFeild,
                            }}
                          />
                          <ProfileInfo
                            metadata={{
                              key: t("channel.founded"),
                              value: detailChannel?.founded,
                            }}
                          />
                          {/* <ProfileInfo metadata={{ key: "Main Game", value: detailChannel?.mainGame }} /> */}
                          <ProfileInfo
                            metadata={{
                              key: t("channel.followers"),
                              value: numberFormatter(detailChannel?.follower),
                            }}
                          />
                          <ProfileInfo
                            metadata={{
                              key: t("channel.youtube_followers"),
                              value: numberFormatter(
                                detailChannel?.followerYoutube
                              ),
                            }}
                          />
                          <ProfileInfo
                            metadata={{
                              key: t("channel.twitch_followers"),
                              value: numberFormatter(
                                detailChannel?.followerTwitter
                              ),
                            }}
                          />
                        </ul>
                      </div>
                      <Tooltip label={subscribeChannelLabel} placement="bottom">
                        <button
                          className={classNames(
                            "nk-btn nk-btn-color-main-1 subscribe-btn"
                          )}
                          onClick={userSubscribeChannel}
                        >
                          {subscribeChannelLabel}
                        </button>
                      </Tooltip>
                      <Tooltip label={donateTooltip} placement="bottom">
                        <Button
                          colorScheme={"facebook"}
                          display={"flex"}
                          alignItems={"center"}
                          justifyContent={"center"}
                          px={"20px"}
                          py={"15px"}
                          fontSize={"0.87rem"}
                          textTransform={"uppercase"}
                          lineHeight={1.2}
                          height={"fit-content"}
                          onClick={handleDonate}
                          isLoading={isLoading}
                          loadingText="Donating..."
                          isDisabled={!publicKey}
                        >
                          {t("channel.donate")}
                        </Button>
                      </Tooltip>
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            px={"20px"}
                            py={"15px"}
                            fontSize={"0.87rem"}
                            textTransform={"uppercase"}
                            lineHeight={1.2}
                            height={"fit-content"}
                          >
                            {t("channel.share")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent color="white" bg="#292e38">
                          <PopoverHeader pt={4} fontWeight="bold" border="0">
                            {t("channel.share_social")}
                          </PopoverHeader>
                          <PopoverArrow bg="#292e38" />
                          <PopoverCloseButton />
                          <PopoverBody
                            border="0"
                            display="flex"
                            alignItems="center"
                            gap={4}
                            pb={6}
                          >
                            <Tooltip
                              label={t("channel.share_facebook")}
                              placement="bottom"
                            >
                              <Button
                                colorScheme={"facebook"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                px={"20px"}
                                py={"15px"}
                                fontSize={"0.87rem"}
                                textTransform={"uppercase"}
                                lineHeight={1.2}
                                onClick={() =>
                                  handleShare(SOCIAL_SHARE.FACEBOOK)
                                }
                                leftIcon={<FaFacebook />}
                              >
                                {t("channel.facebook")}
                              </Button>
                            </Tooltip>
                            <Tooltip
                              label={t("channel.share_x")}
                              placement="bottom"
                            >
                              <Button
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                px={"20px"}
                                py={"15px"}
                                fontSize={"0.87rem"}
                                textTransform={"uppercase"}
                                lineHeight={1.2}
                                onClick={() =>
                                  handleShare(SOCIAL_SHARE.TWITTER)
                                }
                                leftIcon={<FaTwitter />}
                                colorScheme="twitter"
                              >
                                {t("channel.x")}
                              </Button>
                            </Tooltip>
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="mt-10" />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: detailChannel?.description?.replace(
                          /\n/g,
                          "<br />"
                        ),
                      }}
                    />
                    {isAuthor && (
                      <Stack justifyContent={"end"} flexDirection={"row"}>
                        <Tooltip label={"Edit channel"} placement="bottom">
                          <Button
                            py={"15px"}
                            fontSize={"0.87rem"}
                            textTransform={"uppercase"}
                            lineHeight={1.2}
                            onClick={() => open(MODAL_UPDATE_CHANNEL)}
                          >
                            Edit
                          </Button>
                        </Tooltip>
                      </Stack>
                    )}

                    <Statistic detail={detailChannel} />
                    <div style={{ marginTop: "60px" }} />

                    <section className="nk-decorated-h-2">
                      <h3 className="px-4">{t("channel.about_me")}</h3>
                    </section>
                    <div className="mt-10" />
                    <div
                      className="cyberpress-twitch"
                      dangerouslySetInnerHTML={{
                        __html: detailChannel.aboutMe,
                      }}
                    />
                    {isAuthor && (
                      <Stack justifyContent={"end"} flexDirection={"row"}>
                        <Tooltip label={"Edit about me"} placement="bottom">
                          <Button
                            py={"15px"}
                            fontSize={"0.87rem"}
                            textTransform={"uppercase"}
                            lineHeight={1.2}
                            onClick={() => open(MODAL_UPDATE_ABOUT_ME)}
                          >
                            Edit
                          </Button>
                        </Tooltip>
                      </Stack>
                    )}
                    <div style={{ marginTop: "60px" }} />

                    <section className="nk-decorated-h-2">
                      <h3 className="px-4">{t("channel.posts")}</h3>
                    </section>
                    {true && (
                      <Stack justifyContent={"end"} flexDirection={"row"}>
                        <Tooltip label={"Create post"} placement="bottom">
                          <Button
                            py={"15px"}
                            fontSize={"0.87rem"}
                            textTransform={"uppercase"}
                            lineHeight={1.2}
                            onClick={() => open(MODAL_CREATE_OR_UPDATE_POST)}
                          >
                            Create
                          </Button>
                        </Tooltip>
                      </Stack>
                    )}
                    <ChannelPost
                      posts={detailChannel.posts}
                      avatar={detailChannel?.avatarUrl}
                      channelName={detailChannel?.channelName}
                      channelId={detailChannel._id}
                      isAuthor={isAuthor}
                      onOpenModalEdit={(post) => {
                        setCurrentPost(post);
                        open(MODAL_CREATE_OR_UPDATE_POST);
                      }}
                      onOpenModalDelete={(post) => {
                        setCurrentPost(post);
                        open(MODAL_DELETE_POST);
                      }}
                    />
                  </div>
                </article>
              </div>

              <div className="col-lg-4 nk-sidebar-sticky-parent">
                <aside className="nk-sidebar nk-sidebar-sticky nk-sidebar-right">
                  <div>
                    <SocialList detail={detailChannel} />
                    <Section title={t("channel.collection")}>
                      <NFTProfile
                        data={detailChannel.nftCollections}
                        className="columns-1"
                      />
                      <button
                        className="nk-btn nk-btn-color-main-1"
                        onClick={() =>
                          router.push(window.location.href + "/collections")
                        }
                      >
                        {t("channel.detail")} {">"}
                      </button>
                    </Section>
                  </div>
                </aside>
              </div>
            </div>
            <div className="nk-gap-2" />
          </main>
        </div>
      </div>
      {modalState[MODAL_DONATE] && (
        <DonateModel
          isOpen={modalState[MODAL_DONATE]}
          onConfirm={donateForChannel}
          onClose={() => close(MODAL_DONATE)}
        />
      )}
      {modalState[MODAL_UPDATE_CHANNEL] && (
        <UpdateChannelModel
          detailChannel={detailChannel}
          isOpen={modalState[MODAL_UPDATE_CHANNEL]}
          onClose={() => close(MODAL_UPDATE_CHANNEL)}
        />
      )}
      {modalState[MODAL_UPDATE_ABOUT_ME] && (
        <UpdateAboutMeModel
          detailChannel={detailChannel}
          isOpen={modalState[MODAL_UPDATE_ABOUT_ME]}
          onClose={() => close(MODAL_UPDATE_ABOUT_ME)}
        />
      )}
      {modalState[MODAL_CREATE_OR_UPDATE_POST] && (
        <CreateOrUpdatePostModel
          detailChannel={detailChannel}
          currentPost={currentPost}
          setCurrentPost={setCurrentPost}
          isOpen={modalState[MODAL_CREATE_OR_UPDATE_POST]}
          onClose={() => close(MODAL_CREATE_OR_UPDATE_POST)}
        />
      )}
      {modalState[MODAL_DELETE_POST] && (
        <DeletePostModel
          detailChannel={detailChannel}
          currentPost={currentPost}
          setCurrentPost={setCurrentPost}
          isOpen={modalState[MODAL_DELETE_POST]}
          onClose={() => close(MODAL_DELETE_POST)}
        />
      )}
    </>
  );
}

export default DetailChannel;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ["common"])) },
  };
};
