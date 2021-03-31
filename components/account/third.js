import React from "react";
import banks from "../../banks.json";
import store from "../../store/store";
import firebase from "../../services/firebase";
import { useProxy } from "valtio";

const Third = ({ accountInfo, setStep, setAccountInfo }) => {
  const snapshot = useProxy(store);
  const handleChange = (event) => {
    const { value, name } = event.target;

    setAccountInfo({
      ...accountInfo,
      [name]: value,
    });
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
      <label className="text-mini">Bank Verification Number</label>
      <p className="text-gray mt-1">Please click verify button to continue the Verification (Beta)</p>
      <input
        type="number"
        className="form-input mt-1"
        name="bvn"
        placeholder="Enter 12345678901"
        value="12345678901"
        onChange={handleChange}
      />
      </div>
      <div className="btn-holder-2 mt-3">
        <button
          className="btn btn-outline"
          style={{ width: "120px" }}
          onClick={() => setStep(2)}
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

export default Third;
