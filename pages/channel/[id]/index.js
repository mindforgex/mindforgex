import React from 'react'
import BreadCrumbs from '../../../components/BreadCrumbs'
import { ProfileInfo } from '../../../components/ListProfile'
import { Image } from '@chakra-ui/react'
import Table from '../../../components/Table'
import { useRouter } from 'next/router'
import { MOCK_DETAIL_PROFILE_DATA, MOCK_NEW_DATA, MOCK_COLLECTION_DATA, MOCK_DATA_POST } from '../../../utils/data'
import classNames from 'classnames'
import SocialList from '../../../components/SocialList'
import TopRecent from '../../../components/TopRecent'
import Pagination from "../../../components/Pagination";

function DetailChannel() {
  const router = useRouter()
  console.log(router.query.id);
  const detailChannel = MOCK_DETAIL_PROFILE_DATA
  const isUserSubscribed = false

  const pageCount = 100
  const tableColumns = [
    {
      keySelector: "image",
      className: "cyberpress-table-item-small",
      label: " ",
      render: (value) => {
        console.log(value);
        return (
          <Image
            width={150}
            height={150}
            src={value}
            className="cyberpress-team-players-thumb"
            alt=""
          />
        )
      }
    },
    {
      keySelector: "participants",
      className: "",
      label: "Participants"
    },
    {
      keySelector: "nftMinted",
      className: "",
      label: "NFT Minted"
    },
    {
      keySelector: "createdAt",
      className: "",
      label: "Created At"
    }
  ]

  const onPageChange = () => {

  }

  return (
    <div id="content" className="site-content">
      <div className="nk-gap-2" />
      <BreadCrumbs label={detailChannel.name} root={[{ label: "Channel", href: "/" }]} />
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
                        width={175}
                        height={175}
                        src="/assets/team-queend-300x300.png"
                        className="attachment-large size-large mr-3"
                        alt=""
                      />{" "}
                      <ProfileInfo metadata={detailChannel.metadata} />
                    </div>

                    <button className={classNames('nk-btn nk-btn-color-main-1 subscribe-btn ', {
                      "none": !isUserSubscribed,
                    })}>Subscribe</button>
                  </div>

                  <div className="mt-10" />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: detailChannel.description.replace(/\n/g, "<br />")
                    }}
                  />
                  <div className="mt-10" />


                  <h3>Posts</h3>
                  <Table pageCount={pageCount} onPageChange={onPageChange} tableColumns={tableColumns} data={MOCK_DATA_POST} />
                  <div className="mt-10" />

                  <h3>Collections</h3>
                  <ul className="cyberpress-row cyberpress-row-3 cyberpress-games-archive">
                    {
                      MOCK_COLLECTION_DATA.map(_item => {
                        return (
                          <li
                            key={_item.name}
                            className="cyberpress-col cyberpress-game game type-game status-publish has-post-thumbnail hentry"
                          >
                            <div className="cyberpress-game-thumbnail">
                              <Image
                                width={200}
                                height={200}
                                src={_item.image}
                                className="attachment-medium size-medium"
                                alt=""
                              />{" "}
                            </div>
                            <h2 className="cyberpress-game-title">
                              {_item.name}
                            </h2>
                          </li>
                        )
                      })
                    }
                  </ul>
                  <div className="nk-gap-2" />
                  <Pagination pageCount={100} onPageChange={() => { }} />
                  <div className="mt-10" />

                  <h3>Livestream</h3>
                  <div className="cyberpress-twitch">
                    <iframe
                      width={854}
                      height={480}
                      src="https://www.youtube.com/embed/lz_yZ6zaXvU"
                      title="Magnus v Wesley | Can Former 960 Champ Upset World #1? | Speed Chess Championship 2023 SF !coinbase" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                      sandbox="allow-modals allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    />
                  </div>
                </div>
              </article>
            </div>

            <div className="col-lg-4 nk-sidebar-sticky-parent">
              <aside className="nk-sidebar nk-sidebar-sticky nk-sidebar-right">
                <div>
                  <SocialList />

                  <TopRecent data={MOCK_NEW_DATA} total={3} />
                </div>
              </aside>
            </div>
          </div>
          <div className="nk-gap-2" />
        </main>
      </div>
    </div>
  )
}

export default DetailChannel