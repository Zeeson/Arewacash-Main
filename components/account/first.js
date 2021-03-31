import React, { useEffect, useState } from "react";
import banks from "../../banks.json";
import store from "../../store/store";
import firebase from "../../services/firebase";
import { useProxy } from "valtio";

export async function getServerSideProps(context) {

  await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return {
    props: { bvnData: data }, // will be passed to the page component as props
  };
}

const First = ({ accountInfo, setStep, setAccountInfo, bvnData }) => {
  const snapshot = useProxy(store);

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

  const saveInfo = () => {
    store.loading = true;
    firebase
      .database()
      .ref("userinfo/" + snapshot.user.uid)
      .set(snapshot.accountInfo)
      .then(() => {
        store.loading = false;
        setStep(3);
      });
  };

  return (
    <div className="form-col mt-2">
      <div className="form-group mb-2">
        <label className="text-mini">First Name</label>
        <input
          type="text"
          className="form-input mt-1"
          name="first_name"
          placeholder="First Name"
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
          placeholder="Last Name"
          value={accountInfo.last_name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group mb-2">
        <label className="text-mini">Date of Birth</label>
        <input
          type="text"
          className="form-input mt-1"
          name="Date_Of_Birth"
          placeholder="Date of Birth"
          value={accountInfo.Date_Of_Birth}
          onChange={handleChange}
          style={{ border: "1px green solid" }}
        />
      </div>

      <label className="text-mini">Phone</label>
      <div className="phone-input">
        <p>+234</p>
        <p className="text-normal">
          0{splitNumber(snapshot.user?.phoneNumber || "")}
        </p>
      </div>
      <p className="text-mini text-gray mb-2">
        Must be the phone number linked to your BVN
      </p>

      <div className="form-group mb-2">
        <label className="text-mini">Bank Name</label>
        <select
          className="form-input mt-1 text-gray"
          value={accountInfo.bank_name}
          name="bank_name"
          onChange={handleChange}
          style={{ border: "1px green solid" }}
        >
          <option className="text-gray" value="">
            Select Bank
          </option>
          {banks.map((bank) => (
            <option className="text-gray" key={bank.code} value={bank.name}>
              {bank.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-2">
        <label className="text-mini">Account Number</label>
        <input
          type="number"
          className="form-input mt-1"
          placeholder="Account no."
          name="bank_account_number"
          value={accountInfo.bank_account_number}
          onChange={handleChange}
          style={{ border: "1px green solid" }}
        />
      </div>

      <div className="btn-holder-2 ">
        <button
          className="btn btn-outline"
          style={{ width: "120px", color: "green", border: "1px solid green" }}
          onClick={() => setStep(1)}
        >
          Prev
        </button>
        <button
          className="btn btn-primary"
          style={{ width: "120px" }}
          onClick={saveInfo}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default First;
