import { Link } from "@chakra-ui/react";
import Section from "./Section";
import { BsTwitch, BsYoutube, BsTwitter, BsInstagram } from 'react-icons/bs'
import { useTranslation } from "next-i18next";

export default function SocialList({ detail }) {
  const socialLinks = detail?.socialLinks?.reduce((a, v) => ({ ...a, [v.name]: v.url }), {}) || {}
  const { t } = useTranslation('common');
  const listSocial = [
    {
      type: "YOUTUBE",
      link: socialLinks?.youtube,
      className: "nk-social-youtube",
      icon: <BsYoutube />,
    },
    {
      type: "TWITCH",
      link: socialLinks?.twitch,
      className: "nk-social-twitch",
      icon: <BsTwitch />,
    },
    {
      type: "TWITTER",
      link: socialLinks?.twitter,
      className: "nk-social-twitch",
      icon: <BsTwitter />,
    },
    {
      type: "INSTAGRAM",
      link: socialLinks?.instagram,
      className: "nk-social-instagram",
      icon: <BsInstagram />,
    },
  ];

  return (
    <Section title={t('social_link')}>
      <div className="lazyblock-squadforce-social-links-Z1TH6RW wp-block-lazyblock-squadforce-social-links">
        <ul className="nk-social-links-3 nk-social-links-cols-4">
          {listSocial.map((social) => (
            <li key={social.type}>
              <Link
                className={social.className}
                href={social.link || "#"}
                rel="nofollow"
                target="_blank"
              >
                {social.icon}
              </Link>
            </li>
          ))}
          {/* 
          <li>
            <Link
              className="nk-social-google-plus"
              href="teams/#"
              target=""
            >
              <svg
                className="svg-inline--fa fa-google-plus"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google-plus"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M256,8C119.1,8,8,119.1,8,256S119.1,504,256,504,504,392.9,504,256,392.9,8,256,8ZM185.3,380a124,124,0,0,1,0-248c31.3,0,60.1,11,83,32.3l-33.6,32.6c-13.2-12.9-31.3-19.1-49.4-19.1-42.9,0-77.2,35.5-77.2,78.1S142.3,334,185.3,334c32.6,0,64.9-19.1,70.1-53.3H185.3V238.1H302.2a109.2,109.2,0,0,1,1.9,20.7c0,70.8-47.5,121.2-118.8,121.2ZM415.5,273.8v35.5H380V273.8H344.5V238.3H380V202.8h35.5v35.5h35.2v35.5Z"
                ></path>
              </svg>
            </Link>
          </li>
          <li>
            <Link
              className="nk-social-twitter"
              href="teams/#"
              target=""
            >
              <svg
                className="svg-inline--fa fa-twitter"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="twitter"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                ></path>
              </svg>
            </Link>
          </li>
          <li>
            <Link
              className="nk-social-instagram"
              href="teams/#"
              target=""
            >
              <svg
                className="svg-inline--fa fa-instagram"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="instagram"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                ></path>
              </svg>
            </Link>
          </li>
          <li>
            <Link
              className="nk-social-rss"
              href="teams/#"
              target=""
            >
              <svg
                className="svg-inline--fa fa-rss"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="rss"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M0 64C0 46.3 14.3 32 32 32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zM128 416c0 35.3-28.7 64-64 64s-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64zM32 160c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
                ></path>
              </svg>
            </Link>
          </li> */}
        </ul>
      </div>
    </Section>
  );
}
