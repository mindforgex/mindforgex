import { Image, Link } from "@chakra-ui/react";
import React from "react";
import {
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { NAV_BAR_ITEM } from "../utils/constants";
import classNames from "classnames";

export default function NavBar() {
  const onToggleMenu = () => {
    document.getElementById("nk-nav-mobile").classList.toggle("open")
    document.getElementsByClassName("nk-navbar-overlay").item(0).classList.toggle("open")
  }

  return (
    <>
      <header className="nk-header nk-header-opaque">
        <nav className="nk-navbar nk-navbar-top nk-navbar-sticky nk-navbar-autohide nk-onscroll-show">
          <div className="container">
            <div className="nk-nav-table">
              <Link href="/" className="nk-nav-logo">
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
                        className={classNames("menu-item menu-item-type-custom menu-item-object-custom", {
                          "active": window.location.pathname === _item.path,
                          "menu-item-has-children ghost_menu__item nk-drop-item": isItemHasChildren
                        })}
                      >
                        <Link href={_item.path}>{_item.label}</Link>
                        {
                          isItemHasChildren && (
                            <ul className="dropdown sub-menu" style={{ marginTop: "43.7656px", marginLeft: "-9px" }}>
                              {
                                _item.children.map(_itemChild => {
                                  return (
                                    <li key={_itemChild.label}
                                      className="menu-item menu-item-type-custom menu-item-object-custom ghost_menu__sub-menu__item ghost_menu__sub-menu--1__item">
                                      <Link href={_itemChild.path}>{_itemChild.label}</Link>
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
                  className="menu-item menu-item-type-custom menu-item-object-custom ghost_menu__item"
                >
                  <WalletMultiButton />
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
            <Link href="/" className="nk-nav-logo">
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
                        className={classNames("menu-item menu-item-type-custom menu-item-object-custom", {
                          "active": window.location.pathname === _item.path,
                          "menu-item-has-children ghost_menu__item nk-drop-item": isItemHasChildren
                        })}
                      >
                        <Link href={_item.path}>{_item.label}</Link>
                        {
                          isItemHasChildren && (
                            <ul className="dropdown sub-menu">
                              {
                                _item.children.map(_itemChild => {
                                  return (
                                    <li key={_itemChild.label} className="bropdown-back">
                                      <Link href={_itemChild.path}>{_itemChild.label}</Link>
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
                  className="menu-item menu-item-type-custom menu-item-object-custom text-uppercase"
                >
                  <WalletMultiButton />
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
