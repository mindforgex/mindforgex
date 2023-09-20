import { Link, Image } from '@chakra-ui/react'
import BreadCrumbs from '../components/BreadCrumbs';
import ListProfile from '../components/ListProfile';
import { MOCK_NEW_DATA, MOCK_PROFILE_DATA } from '../utils/data';
import SearchBox from '../components/SearchBox';
import TopRecent from '../components/TopRecent';

export default function Home() {
  return (
    <div id="content" className="site-content">
      <div className="nk-gap-2" />
      <BreadCrumbs label="Home" />
      <div className="nk-gap-2 mt-10" />
      <div id="primary" className="content-area container cyberpress">
        <main id="main" className="site-main" role="main">
          <div className="row">
            <div className="col-lg-8">
              <article className="hentry">
                <div className="entry-content">
                  <ListProfile data={MOCK_PROFILE_DATA} />
                </div>
              </article>
            </div>

            <div className="col-lg-4 nk-sidebar-sticky-parent">
              <aside className="nk-sidebar nk-sidebar-sticky nk-sidebar-right">
                <div>
                  <SearchBox />

                  <TopRecent data={MOCK_NEW_DATA} />
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div >

  )
}
