import { Image, Link } from "@chakra-ui/react";
import React from "react";
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { NAV_BAR_ITEM } from "../utils/constants";
import classNames from "classnames";
import { useTranslation } from 'next-i18next';
import SwitchLanguage from "./SwitchLanguage";
import { useAppRedireact } from "../utils/hook";

export default function NavBar() {
  const { t } = useTranslation('common');
  const [generateRouter] = useAppRedireact();

  const onToggleMenu = () => {
    document.getElementById("nk-nav-mobile").classList.toggle("open")
    document.getElementsByClassName("nk-navbar-overlay").item(0).classList.toggle("open")
  };

  const activeClassName = (path) => classNames({
    'selected': path === '' ? window.location.pathname === '/' : window.location.pathname.includes(path)
  })

  return (
    <>
      <header className="nk-header nk-header-opaque">
        <nav className="nk-navbar nk-navbar-top nk-navbar-sticky nk-navbar-autohide nk-onscroll-show">
          <div className="container">
            <div className="nk-nav-table">
              <Link href={generateRouter('')} className="nk-nav-logo">
                <Image src="/assets/logo.svg" fill={true} alt="" />
              </Link>

              <ul
                id="menu-main-menu" className="nk-nav nk-nav-right d-none d-lg-table-cell"
                data-nav-mobile="#nk-nav-mobile"
              >
                {
                  NAV_BAR_ITEM.map(_item => {
                    const isItemHasChildren = Array.isArray(_item.children) && _item.children.length > 0

                    return (
                      <li
                        key={_item.label}
                        className={classNames("", {
                          "active": window.location.pathname === _item.path,
                          "nk-drop-item": isItemHasChildren
                        })}
                      >
                        <Link
                          className={activeClassName(_item.path)}
                          href={generateRouter(_item.path)}
                          onClick={(e) => {
                            if (isItemHasChildren) {
                              e.preventDefault();
                            }
                          }}
                        >{t(_item.label)}</Link>
                        {
                          isItemHasChildren && (
                            <ul className="dropdown" style={{ marginTop: "43.7656px", marginLeft: "-9px" }}>
                              {
                                _item.children.map(_itemChild => {
                                  return (
                                    <li key={_itemChild.label}>
                                      <Link className={activeClassName(_itemChild.path)} href={generateRouter(_item.path + _itemChild.path)}>{t(_itemChild.label)}</Link>
                                    </li>
                                  )
                                })
                              }
                            </ul>
                          )
                        }
                      </li>
                    )
                  })
                }

                <li
                  className=" ghost_menu__item"
                >
                  <WalletMultiButton />
                </li>
                <li>
                  <SwitchLanguage />
                </li>
              </ul>

              <ul className="nk-nav nk-nav-right nk-nav-icons" onClick={onToggleMenu}>
                <li className="single-icon d-lg-none">
                  <span className="nk-icon-burger">
                    <span className="nk-t-1"></span>
                    <span className="nk-t-2"></span>
                    <span className="nk-t-3"></span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div style={{ height: "105px", display: "none" }}></div>
      </header>

      {/* START: Navbar Mobile */}
      <div
        id="nk-nav-mobile"
        className="nk-navbar nk-navbar-side d-lg-none nk-navbar-right-side nk-navbar-overlay-content"
      >
        <div className="nano has-scrollbar">
          <div className="nano-content" tabIndex={0} style={{ right: "-15px" }}>
            <Link href={generateRouter('')} className="nk-nav-logo">
              <Image
                src="/assets/logo.svg"
                fill={true}
                alt=""
              />{" "}
            </Link>
            <div className="nk-navbar-mobile-content">
              <ul className="nk-nav">
                {
                  NAV_BAR_ITEM.map(_item => {
                    const isItemHasChildren = Array.isArray(_item.children) && _item.children.length > 0

                    return (
                      <li
                        key={_item.label}
                        className={classNames("", {
                          "active": window.location.pathname === _item.path,
                          "nk-drop-item": isItemHasChildren
                        })}
                      >
                        <Link 
                          className={activeClassName(_item.path)} 
                          href={generateRouter(_item.path)}
                          onClick={(e) => {
                            if (isItemHasChildren) {
                              e.preventDefault();
                              const el = document.getElementById(`dropdown-${_item.path}`)
                              el.classList.toggle('dropdown')
                              el.querySelectorAll('a').forEach((_el) => {
                                _el.style.display = (_el.style.display === 'none' || !_el.style.display) ? 'block' : 'none'
                              })
                            }
                          }}
                        >{t(_item.label)}</Link>
                        {
                          isItemHasChildren && (
                            <ul id={`dropdown-${_item.path}`} className="dropdown">
                              {
                                _item.children.map(_itemChild => {
                                  return (
                                    <li key={_itemChild.label} className="bropdown-back">
                                      <Link className={activeClassName(_itemChild.path)} href={generateRouter(_item.path + _itemChild.path)}>{t(_itemChild.label)}</Link>
                                    </li>
                                  )
                                })
                              }
                            </ul>
                          )
                        }

                      </li>
                    )
                  })
                }
                <li
                  className="mb-15 text-uppercase"
                >
                  <WalletMultiButton />
                </li>

                <li>
                  <SwitchLanguage />
                </li>
              </ul>
            </div>
          </div >
          <div className="nano-pane" style={{ display: "none" }}>
            <div
              className="nano-slider"
              style={{ height: 20, transform: "translate(0px, 0px)" }}
            />
          </div>
        </div >
      </div >
      {/* END: Navbar Mobile */}

      <div className="nk-navbar-overlay" onClick={onToggleMenu}></div>
    </>
  )
}
