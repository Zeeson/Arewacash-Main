import React, { useEffect, useState } from "react";
import firebase from "../../services/firebase";
import Layout from "../../components/layout";
import { getInfo } from "../../services/userService";
import store from "../../store/store";
import face from "../../public/assets/happy_face.svg";
import { useProxy } from "valtio";
import First from "../../components/account/first";
import Second from "../../components/account/second";
import Third from "../../components/account/third";
import Modal from "../../components/modal/modal";
import Link from "next/link";

const Index = () => {
  const snapshot = useProxy(store);
  const [showDash, setShowDash] = useState(false);
  const [accountInfo, setAccountInfo] = useState({
    bvn: "",
    first_name: "",
    last_name: "",
    bank_name: "",
    bank_account_number: "",
    nok_name: "",
    nok_phone: "",
    ...snapshot.accountInfo
  });
  const [step, setStep] = useState(1);

  const handleChange = (event) => {
    const { value, name } = event.target;

    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
  };

  const splitNumber = (number) => {
    let phone = number.split("");
    phone.splice(0, 4);
    return phone;
  };

// useEffect(() => {
//   if(verification){
//     setAccountInfo({
//       bvn: "",
//       first_name: verification.FirstName,
//       last_name: verification.LastName,
//       bank_name: "",
//       bank_account_number: "",
//       nok_name: "",
//       nok_phone: ""
//     })
//   }

// }, [verification])

  useEffect(() => {
    store.loading = true;
  const unsubscribe =  firebase.auth().onAuthStateChanged(function (user) {
      console.log(user)
      if (!user) {
        router.push("/login");
      } else {
        store.user = user;
        getInfo(user);
        setShowDash(true);
        store.loading = false;
      }
    })
  return () => {unsubscribe()}
  }, []);

  // useEffect(() => {
  //   if (snapshot.accountInfo) {
  //     store.loading = false;
  //     setAccountInfo(snapshot.accountInfo);
  //   }
  //   console.log('snapshot')
  // }, [snapshot.accountInfo]);
  //
  useEffect(() => {
    if (snapshot.accountInfo) {
      let newInfo = {
        ...snapshot.userInfo,
        ...accountInfo,
      };
      store.accountInfo = newInfo;
    }
  }, [accountInfo]);

  return (
    <Layout>
      <div className="container">
        <div className="account">
          <h5 className="heading" style={{ fontSize: "25px" }}>
            Your Account Information
          </h5>
          {step === 1 ? (
            <div className="form-col mt-2">
              <div className="form-group mb-2">
                <label className="text-mini">First Name</label>
                <input
                  type="text"
                  className="form-input mt-1"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={accountInfo.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-2">
                <label className="text-mini">Last Name</label>
                <input
                  type="text"
                  className="form-input mt-1"
                  name="last_name"
                  placeholder="Enter your last name"
                  value={accountInfo.last_name}
                  onChange={handleChange}
                />
              </div>
              <label className="text-mini">Phone</label>
              <div className="phone-input">
                <p>+234</p>
                <p className="text-normal">
                  0{splitNumber(snapshot.user?.phoneNumber || "")}
                </p>
              </div>
              <div className="form-group mb-3">
                <label className="text-mini">Bank Verification Number</label>
                <input
                  type="number"
                  className="form-input mt-3"
                  name="bvn"
                  placeholder="Enter your BVN"
                  value={accountInfo.bvn}
                  onChange={handleChange}
                />
              </div>
              <div className="btn-holder-2 ">
                <div />
                <button
                  className="btn btn-primary"
                  style={{ width: "120px" }}
                  onClick={() => setStep(2)}
                >
                  Next
                </button>
              </div>
            </div>
          ) : (
              <Second
                handleChange={handleChange}
                accountInfo={accountInfo}
                setAccountInfo={setAccountInfo}
                setStep={setStep}
              />
            )}
          {step === 3 && (
            <Modal>
              <div className="pop-message">
                <img src={face} height={55} width={55} />
                <h1 className="heading mb-3">Mun gode!</h1>
                <p className="sub-heading">Account Updated</p>
                <p className="text-gray mt-1">
                  Your account details was updated successfully!
                </p>
                <Link href="/dashboard">
                  <button className="btn btn-primary mt-2">Back to Home</button>
                </Link>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
