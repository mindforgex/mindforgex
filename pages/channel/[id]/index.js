import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../../../components/BreadCrumbs'
import { ProfileInfo } from '../../../components/ListProfile'
import { Image, useToast } from '@chakra-ui/react'
import Table from '../../../components/Table'
import { useRouter } from 'next/router'
import { MOCK_DETAIL_PROFILE_DATA, MOCK_NEW_DATA, MOCK_COLLECTION_DATA, MOCK_DATA_POST, MOCK_INVENTORY } from '../../../utils/data'
import classNames from 'classnames'
import SocialList from '../../../components/SocialList'
import TopRecent from '../../../components/TopRecent'
import Pagination from "../../../components/Pagination";
import Head from 'next/head'
import Section from '../../../components/Section'
import NFTProfile from '../../../components/NFTProfile'
import ChannelPost from '../../../components/Channel/Post'
import { getDetailChannel, subscribeChannel } from '../../../services'
import { getUserInfo, numberFormatter } from '../../../utils/helpers'

function DetailChannel() {
  const router = useRouter();
  const toast = useToast();
  const userInfo = getUserInfo();
  const [detailChannel, setDetail] = useState(MOCK_DETAIL_PROFILE_DATA);
  const [isUserSubscribed, setSubscribed] = useState(false);

  const userSubscribeChannel = async () => {
    if (!userInfo?.user?.walletAddress) {
      return toast({
        title: 'Please connect wallet!',
        status: 'error',
        duration: 9000,
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
      duration: 9000,
      isClosable: true,
      position: 'top'
    })
  }
  useEffect(() => {
    const getDetail = async () => {
      const res = await getDetailChannel(router.query.id);
      setDetail(res);
      setSubscribed(!!res?.userSubcribe?.find(user => user === userInfo?.user?.walletAddress));
    }
    getDetail && getDetail();
  }, [router.query?.id]);


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
                          <ProfileInfo metadata={{ key: "Main Game", value: detailChannel?.mainGame }} />
                          <ProfileInfo metadata={{ key: "FOLLOWERS", value: numberFormatter(detailChannel?.follower) }} />
                          <ProfileInfo metadata={{ key: "YOUTUBE FOLLOWERS", value: numberFormatter(detailChannel?.followerYoutube) }} />
                          <ProfileInfo metadata={{ key: "TWITCH FOLLOWERS", value: numberFormatter(detailChannel?.followerTwitter) }} />
                        </ul>
                      </div>

                      <button
                        className={classNames('nk-btn nk-btn-color-main-1 subscribe-btn')}
                        onClick={userSubscribeChannel}
                      >
                        {isUserSubscribed ? "Subscribed" : "Subscribe"}
                      </button>
                    </div>

                    <div className="mt-10" />
                    <p
                      dangerouslySetInnerHTML={{
                        __html: detailChannel?.description?.replace(/\n/g, "<br />")
                      }}
                    />
                    <div className="mt-10" />

                    <h3>About Me</h3>
                    <div className="cyberpress-twitch"
                      dangerouslySetInnerHTML={{
                        __html: detailChannel.aboutMe
                      }}
                    >
                    </div>
                    <div className="mt-10" />
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
    </>
  )
}

export default DetailChannel
