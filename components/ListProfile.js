import { Image, Link } from "@chakra-ui/react";
import PropTypes from 'prop-types'
import { numberFormatter } from "../utils/helpers";
import { useTranslation } from 'next-i18next';
import { useAppRedireact } from "../utils/hook";

export const ProfileInfo = ({ metadata }) => {
  return (
    <li key={metadata.key}>
      <strong>{metadata.key}</strong>:{" "}
      {metadata.value}
    </li>
  )
}

export default function ListProfile({ data, total = 100, onPageChange = () => { }, pageSize = 6, }) {
  const { t } = useTranslation('common');
  const [generateRouter] = useAppRedireact();

  return (
    <>
      <ul className="cyberpress-row cyberpress-row-3 cyberpress-teams-archive">
        {
          data?.map(_item => {
            return (
              <li
                key={_item.channelName}
                className="cyberpress-col cyberpress-team team type-team status-publish has-post-thumbnail hentry"
              >
                <div className="cyberpress-team-thumbnail">
                  <Link href={generateRouter(`channel/${_item._id}`)}>
                    <Image
                      width={300}
                      height={300}
                      src={_item.avatarUrl}
                      className="attachment-medium size-medium"
                      alt=""
                    />{" "}
                  </Link>
                </div>

                {/* .post-thumbnail */}
                <h2 className="cyberpress-team-title">
                  <Link href={generateRouter(`channel/${_item._id}`)}>
                    {_item.channelName}
                  </Link>
                </h2>
                <ul className="cyberpress-team-info">
                  <ProfileInfo metadata={{ key: t("channel.country"), value: _item?.country?.name }} />
                  <ProfileInfo metadata={{ key: t("channel.founded"), value: _item?.founded }} />
                  {/* <ProfileInfo metadata={{ key: "Main Game", value: _item?.mainGame }} /> */}
                  <ProfileInfo metadata={{ key: t("channel.followers"), value: numberFormatter(_item?.follower || 0) }} />
                  <ProfileInfo metadata={{ key: t("channel.youtube_followers"), value: numberFormatter(_item?.followerYoutube || 0) }} />
                  <ProfileInfo metadata={{ key: t("channel.twitch_followers"), value: numberFormatter(_item?.followerTwitter || 0) }} />
                </ul>
              </li>
            )
          })
        }
      </ul>
      <div className="nk-gap-2" />
    </>
  )
}

ListProfile.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    href: PropTypes.string,
    metadata: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.string
    }))
  })).isRequired,
  total: PropTypes.number,
  pageSize: PropTypes.number,
  onPageChange: PropTypes.func // pageNumber
}
