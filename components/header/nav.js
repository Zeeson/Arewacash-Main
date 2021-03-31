import React, { useEffect, useState } from "react";
import firebase from "../../services/firebase";
import { useRouter } from "next/router";
import store from "../../store/store";
import logo from "../../public/assets/logo@2x.png";
import burgerIcon from "../../public/assets/menu_icon.svg";
import Modal from "../../components/modal/modal";
import Link from "next/link";

const Nav = () => {
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [menu, setMenu] = useState(false);

  const signOut = () => {
    store.loading = true;
    firebase.auth().signOut();
    console.log("signed out");

    store.loading = false;
    router.push("/login");
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setLogin(true);
      }
      setShowNav(true);
    });
  }, []);
  return showNav ? (
    <header className="header">
      <div className="wrap">
        <Link href="/">
          <div className="logo">ArewaPreneurs</div>
        </Link>
        {login ? (
          <div className="menu-nav">
            <ul className="nav-items">
              <div>
                <Link href="/dashboard">
                  <a className="sub-heading">Home</a>
                </Link>
              </div>
              <div>
                <Link href="/account">
                  <a className="sub-heading">Profile</a>
                </Link>
              </div>
              <div>
                <Link href="/faqs">
                  <a className="sub-heading">FAQs</a>
                </Link>
              </div>
            </ul>
          </div>
        ) : null}
        {login ? (
          <button className="btn btn-outline" onClick={signOut}>
            Logout
          </button>
        ) : (
          <div>
            <Link href="/login">
              <a className="btn btn-outline">Login</a>
            </Link>
          </div>
        )}
      </div>
    </header>
  ) : null;
};

export default Nav;
