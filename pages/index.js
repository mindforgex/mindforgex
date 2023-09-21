import BreadCrumbs from '../components/BreadCrumbs';
import ListProfile from '../components/ListProfile';
import { MOCK_NEW_DATA, MOCK_PROFILE_DATA } from '../utils/data';
import TopRecent from '../components/TopRecent';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getChannels } from '../services';

export default function Channel() {
  const [channels, setChannels] = useState([]);
  const [pageParams] = useState({ pageSize: 6, pageIndex: 1 });
  useEffect(() => {
    const getAppChannels = async() => {
      const { items } = await getChannels(pageParams);
      setChannels(items);
    }
    getAppChannels && getAppChannels();
  }, []);

  return (
    <>
      <Head>
        <title>MindForgeX</title>
      </Head>
      <div id="content" className="site-content">
        <div className="nk-gap-2" />

        <BreadCrumbs label="Channel" />
        <div className="nk-gap-2 mt-10" />

        <div id="primary" className="content-area container cyberpress">
          <main id="main" className="site-main" role="main">
            <div className="row">
              <div className="col-lg-8">
                <article className="hentry">
                  <div className="entry-content">
                    <ListProfile data={channels} />
                  </div>
                </article>
              </div>

              <div className="col-lg-4 nk-sidebar-sticky-parent">
                <aside className="nk-sidebar nk-sidebar-sticky nk-sidebar-right">
                  <div>
                    <TopRecent total={5} data={MOCK_NEW_DATA} />
                  </div>
                </aside>
              </div>
            </div>
          </main>
        </div>
      </div >
    </>
  )
}
