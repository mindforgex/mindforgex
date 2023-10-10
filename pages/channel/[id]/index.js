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
import { donateChannel, getDetailChannel, subscribeChannel, generateTransactionEncode } from '../../../services'
import { compose, confirmTransactionsFromFrontend, getUserInfo, numberFormatter } from '../../../utils/helpers'
import DonateModel from '../../../components/Channel/DonateModel';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { clusterApiUrl, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js'; 

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
      title: res ? 'Subscribe channel success!' : 'Subscribe channel failed!',
      status: res ? 'success' : 'error',
      isClosable: true,
      position: 'top'
    });
  }
  useEffect(() => {
    const getDetail = async () => {
      const res = await getDetailChannel(router.query.id);
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
    const { context: {slot}} = await connection.confirmTransaction(tx, 'processed');
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
        title: `Donate for idol success with ${args?.donate}SOL`,
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
        title: `Donate failed`,
        status: 'error',
        isClosable: true,
        position: 'top'
      });
    }
  };

  const handleDonate = () => {
    publicKey && setOpen(!isOpen);
    !publicKey &&  toast({
      title: `Please connect wallet to donate`,
      status: 'error',
      isClosable: true,
      position: 'top'
    });
  };

  const donateTooltip = useMemo(() => {
    return publicKey ? 'Donate for idol' : 'Please connect wallet';
  }, [publicKey]);

  const subscribeChannelLabel = useMemo(() => {
    return isUserSubscribed ? "Subscribed" : "Subscribe"
  }, [isUserSubscribed]);

  return (
    <>
      <Head>
        <title>{detailChannel.channelName}</title>
      </Head>
      <div id="content" className="site-content">
        <div className="nk-gap-2" />
        <BreadCrumbs label={detailChannel.name} root={{ label: "Channel", href: "/" }} />
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
                          <ProfileInfo metadata={{ key: "Country", value: detailChannel?.country?.name }} />
                          <ProfileInfo metadata={{ key: "Sex", value: detailChannel?.sex }} />
                          <ProfileInfo metadata={{ key: "Date Of Birth", value: detailChannel?.dateOfBirth }} />
                          <ProfileInfo metadata={{ key: "Professional Field", value: detailChannel?.profestionalFeild }} />
                          <ProfileInfo metadata={{ key: "FOUNDED", value: detailChannel?.founded }} />
                          {/* <ProfileInfo metadata={{ key: "Main Game", value: detailChannel?.mainGame }} /> */}
                          <ProfileInfo metadata={{ key: "FOLLOWERS", value: numberFormatter(detailChannel?.follower) }} />
                          <ProfileInfo metadata={{ key: "YOUTUBE FOLLOWERS", value: numberFormatter(detailChannel?.followerYoutube) }} />
                          <ProfileInfo metadata={{ key: "TWITCH FOLLOWERS", value: numberFormatter(detailChannel?.followerTwitter) }} />
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
                          Donate
                        </Button>
                      </Tooltip>
                    </div>

                    <div className="mt-10" />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: detailChannel?.description?.replace(/\n/g, "<br />")
                      }}
                    />

                    <div style={{ marginTop: '60px' }} />
                    <section className='nk-decorated-h-2'>
                      <h3 className='px-4'>About Me</h3>
                    </section>
                    <div className="mt-10" />
                    <div className="cyberpress-twitch"
                      dangerouslySetInnerHTML={{
                        __html: detailChannel.aboutMe
                      }}
                    />

                    <div style={{ marginTop: '60px' }} />
                    <section className='nk-decorated-h-2'>
                      <h3 className='px-4'>Post</h3>
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
                    <Section title="Collection">
                      <NFTProfile data={detailChannel.nftInfos} className='columns-1' />
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
