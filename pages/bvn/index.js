import React, { useEffect, useState } from "react";
// import React from 'react';
import firebase from "../../services/firebase";
import Layout from "../../components/layout";
import { getInfo } from "../../services/userService";
import store from "../../store/store";
import face from "../../public/assets/happy_face.svg";
import { useProxy } from "valtio";
import First from "../../components/account/first";
import Second from "../../components/account/second";
import Modal from "../../components/modal/modal";
import Link from "next/link";
import axios from "axios";
import { withRouter } from "next/router";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Index = () => {
  const [{ details, bvn }, setState] = useState({
    bvn: "12345678901",
    details: "",
    loading: false,
  });

  const style = {
    height: 100,
    width: 100,
  };

  const snapshot = useProxy(store);
  const handleChange = (e) => {
    setState({ ...state, bvn: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://verify-bvn.herokuapp.com/verify/bvn",
        { bvn: bvn }
      );
      store.accountInfo = {
        bvn: res.data.verification.BVN,
        first_name: res.data.verification.FirstName,
        last_name: res.data.verification.LastName,
        bank_name: "",
        bank_account_number: "",
        nok_name: "",
        nok_phone: "",
      };
      // this.props.router.push('/account')
    } catch (e) {
      setLoading(false);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="account">
          <h5 className="heading" style={{ fontSize: "25px" }}></h5>
          <div className="form-group mb-1">
            <form onSubmit={handleSubmit}>
              <label className="text-mini">Bank Verification Number</label>
              <p className="text-gray mt-1">
                Please click verify button to continue the Verification as this
                App is still at BETA stage
              </p>
              <input
                type="number"
                className="form-input mt-1"
                name="bvn"
                placeholder="Enter 12345678901"
                value={bvn}
                onChange={handleChange}
              />
              <button type="submit" className="btn btn-primary mt-2">
                Verify
              </button>
              {snapshot.accountInfo && (
                <Loader
                  type="Puff"
                  color="#00BFFF"
                  height={100}
                  width={100}
                  timeout={3000} //3 secs
                />
              )}
              {snapshot.accountInfo && (
                <div>
                  <h1>
                    Verified{" "}
                    <span>
                      {" "}
                      <img
                        style={style}
                        src="https://bigppcgeek.files.wordpress.com/2011/06/tick.jpg"
                      />{" "}
                    </span>{" "}
                  </h1>
                  <Link href="/account">
                    <button className="btn btn-primary mt-2">Continue</button>
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withRouter(Index);

// export default Index;
