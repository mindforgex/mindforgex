import { Link } from "@chakra-ui/react";
import { BsDiscord, BsTwitter, BsYoutube } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="nk-footer">
      <div className="nk-copyright">
        <div className="container">
          <div className="nk-copyright-left">
            <p className="mb-0">
              Copyright © {new Date().getFullYear()} {" "} The Re-Techie Pirates
            </p>
          </div>
          <div className="nk-copyright-right">
            <ul className="nk-social-links-2">
              <li>
                <Link
                  className="nk-social-youtube"
                  href='https://www.youtube.com/channel/UCKrLBqxAKASRlmu_2yUtplw'
                  target="_blank"
                >
                  <BsYoutube className="bsp-icon" />
                </Link>
              </li>
              <li>
                <Link
                  className="nk-social-twitter"
                  href='https://twitter.com/MindForgeX'
                  target="_blank"
                >
                  <BsTwitter className="bsp-icon" />
                </Link>
              </li>
              <li>
                <Link
                  className="nk-social-discord"
                  href='https://discord.gg/pAwxpnZW'
                  target="_blank"
                >
                  <BsDiscord className="bsp-icon" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

  )
}