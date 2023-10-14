import React, { useEffect, useMemo, useState } from 'react'
import BreadCrumbs from '../../../components/BreadCrumbs'
import { ProfileInfo } from '../../../components/ListProfile'
import { Button, Image, Tooltip, useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MOCK_DETAIL_PROFILE_DATA, } from '../../../utils/data'
import classNames from 'classnames'
import SocialList from '../../../components/SocialList'
import Head from 'next/head'
import Section from '../../../components/Section'
import NFTProfile from '../../../components/NFTProfile'
import ChannelPost from '../../../components/Channel/Post'
import { donateChannel, getDetailChannel, subscribeChannel } from '../../../services'
import { compose, getUserInfo, numberFormatter } from '../../../utils/helpers'
import DonateModel from '../../../components/Channel/DonateModel';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js'; 
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import axios from 'axios';
import Statistic from '../../../components/Channel/Statistic'

function DetailChannel() {
  const router = useRouter();
  const toast = useToast();
  const userInfo = getUserInfo();
  const [detailChannel, setDetail] = useState(MOCK_DETAIL_PROFILE_DATA);
  const [isUserSubscribed, setSubscribed] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const { t } = useTranslation('common');

  const userSubscribeChannel = async () => {
    if (!userInfo?.user?.walletAddress) {
      return toast({
        title: 'Please connect wallet!',
        status: 'error',
        isClosable: true,
        position: 'top'
      })
    }
    if (isUserSubscribed) return;
    const res = await subscribeChannel(router.query.id);
    res && setSubscribed(true);
    toast({
      title: t(res ? 'channel.subscribe_success' : 'channel.subscribe_failed'),
      status: res ? 'success' : 'error',
      isClosable: true,
      position: 'top'
    });
  }

  useEffect(() => {
    const getDetail = async () => {
      const res = await getDetailChannel(router.query.id);
      const nftCollectionData = await Promise.all(
        res?.nftCollections?.map(async (_item) => {
          const getMetadataRes = await axios.get(_item.metadata_uri)
          return {
            ..._item,
            ...getMetadataRes.data
          }  
        }) || [async () => {}]
      )
      res.nftCollections = nftCollectionData || []
      setDetail(res);
      setSubscribed(!!res?.userSubcribe?.find(user => user === userInfo?.user?.walletAddress));
    }
    getDetail && getDetail();
  }, [router.query?.id]);

  const donateForIdol = async (args) => {
    const { encode: transaction } = args;
    try {
      const signature = await sendTransaction(transaction, connection);
      return {...args, tx: signature};
    } catch (err) {
      throw err
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const getDonateEndcode = async(args) => {
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

  const verifyTransaction = async(args) => {
    const { tx, donate } = args;
    await sleep(5000);
    const { context: {slot}} = await connection.confirmTransaction(tx, 'finalized');
    try {
      await donateChannel(detailChannel._id, { tx, amount: Number(donate) });
      return {...args, confirm: slot};
    } catch(err) {
      throw err;
    }
  }

  const notifyDonate = (args) => {
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('channel.donate_success', { donate: args?.donate}),
        status: 'success',
        isClosable: true,
        position: 'top'
      });
    }, 1000);
  };

  const donateForChannel = async(donate) => {
    try {
      await compose(notifyDonate, verifyTransaction, donateForIdol, getDonateEndcode)(donate);
    } catch (error) {
      setIsLoading(false);
      toast({
        title: t('donate_failed'),
        status: 'error',
        isClosable: true,
        position: 'top'
      });
    }
  };

  const handleDonate = () => {
    publicKey && setOpen(!isOpen);
    !publicKey &&  toast({
      title: t('please_connect_wallet'),
      status: 'error',
      isClosable: true,
      position: 'top'
    });
  };

  const donateTooltip = useMemo(() => {
    return t(publicKey ? 'channel.donate_idol' : 'please_connect_wallet');
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
        <BreadCrumbs label={detailChannel.name} root={{ label: t("channel.label"), href: '' }} />
        <div className="nk-gap-2 mt-10" />
        <div className="content-area container cyberpress">
          <main id="main" className="site-main" role="main">
            <div className="row">
              <div className="col-lg-8">
                <article
                  className="team type-team status-publish has-post-thumbnail hentry"
                >
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
                          <ProfileInfo metadata={{ key: t("channel.country"), value: detailChannel?.country?.name }} />
                          <ProfileInfo metadata={{ key: t("channel.sex"), value: detailChannel?.sex }} />
                          <ProfileInfo metadata={{ key: t("channel.birthday"), value: detailChannel?.dateOfBirth }} />
                          <ProfileInfo metadata={{ key: t("channel.perfessional_field"), value: detailChannel?.profestionalFeild }} />
                          <ProfileInfo metadata={{ key: t("channel.founded"), value: detailChannel?.founded }} />
                          {/* <ProfileInfo metadata={{ key: "Main Game", value: detailChannel?.mainGame }} /> */}
                          <ProfileInfo metadata={{ key: t("channel.followers"), value: numberFormatter(detailChannel?.follower) }} />
                          <ProfileInfo metadata={{ key: t("channel.youtube_followers"), value: numberFormatter(detailChannel?.followerYoutube) }} />
                          <ProfileInfo metadata={{ key: t("channel.twitch_followers"), value: numberFormatter(detailChannel?.followerTwitter) }} />
                        </ul>
                      </div>
                      <Tooltip label={subscribeChannelLabel} placement='bottom'>
                        <button
                          className={classNames('nk-btn nk-btn-color-main-1 subscribe-btn')}
                          onClick={userSubscribeChannel}
                        >
                          {subscribeChannelLabel}
                        </button>
                      </Tooltip>
                      <Tooltip label={donateTooltip} placement='bottom'>
                        <Button
                          colorScheme={'facebook'}
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          px={'20px'}
                          py={'15px'}
                          fontSize={'0.87rem'}
                          textTransform={'uppercase'}
                          lineHeight={1.2}
                          height={'fit-content'}
                          onClick={handleDonate}
                          isLoading={isLoading}
                          loadingText='Donating...'
                          isDisabled={!publicKey}
                        >
                          {t("channel.donate")}
                        </Button>
                      </Tooltip>
                    </div>

                    <div className="mt-10" />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: detailChannel?.description?.replace(/\n/g, "<br />")
                      }}
                    />
                    <Statistic detail={detailChannel} />
                    <div style={{ marginTop: '60px' }} />
                    <section className='nk-decorated-h-2'>
                      <h3 className='px-4'>{t('channel.about_me')}</h3>
                    </section>
                    <div className="mt-10" />
                    <div className="cyberpress-twitch"
                      dangerouslySetInnerHTML={{
                        __html: detailChannel.aboutMe
                      }}
                    />
                    <div style={{ marginTop: '60px' }} />
                    <section className='nk-decorated-h-2'>
                      <h3 className='px-4'>{t('channel.posts')}</h3>
                    </section>
                    <ChannelPost
                      posts={detailChannel.posts}
                      avatar={detailChannel?.avatarUrl}
                      channelName={detailChannel?.channelName}
                      channelId={detailChannel._id}
                    />
                  </div>
                </article>
              </div>

              <div className="col-lg-4 nk-sidebar-sticky-parent">
                <aside className="nk-sidebar nk-sidebar-sticky nk-sidebar-right">
                  <div>
                    <SocialList detail={detailChannel} />
                    <Section title={t("channel.collection")}>
                      <NFTProfile data={detailChannel.nftCollections} className='columns-1' />
                      <button 
                        className='nk-btn nk-btn-color-main-1'
                        onClick={() => router.push(window.location.href + '/collections')}
                      >{t('channel.detail')} {">"}</button>
                    </Section>
                  </div>
                </aside>
              </div>
            </div>
            <div className="nk-gap-2" />
          </main>
        </div>
      </div>
      <DonateModel isOpen={isOpen} setOpen={setOpen} onConfirm={donateForChannel} />
    </>
  )
}

export default DetailChannel

export const getServerSideProps = async({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  }
}
