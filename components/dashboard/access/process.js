import React, { useState, useEffect } from "react";
import Modal from "../../modal/modal";
import store from "../../../store/store";
import { useProxy } from "valtio";
import firebase from "../../../services/firebase";
import { snapshot } from "valtio";

const Process = ({ close, product }) => {
  const snapshot = useProxy(store);
  const [sent, setSent] = useState(false);
  const [loanInfo, setInfo] = useState({
    payment: product.product_price,
    product: {
      product_name: product.product_name,
      product_price: product.product_price,
    },
    tenure: product.product_tenure,
  });

  const requestLoan = () => {
    store.loading = true;
    console.log(snapshot.userInfo);
    console.log(snapshot.user.uid);
    firebase
      .database()
      .ref("userinfo/" + snapshot.user.uid)
      .set({
        ...snapshot.userInfo,
        amountborrowed: loanInfo.product.product_price,
        // tenure: loanInfo.tenure,
        product: loanInfo.product,
        time: Date.now(),
      })
      .then(() => {
        store.loading = false;
        setSent(true);
      });
  };

  return (
    <div className="product-details process">
      <span className="back text-mini" onClick={close}>
        <img src={require("../../../public/assets/go_back.svg")} />
        Go Back
      </span>
      <div>
        <div className="d-flex">
          <div className="product_image">
            <img src={product.product_img} alt="product-image" />
          </div>

          <div className="product_details">
            <p className="product_name">{product.product_name}</p>
            <div className="d-flex stocknterm">
              <p className="product_stock">{product.product_stock} Available</p>
              <p className="product_term">{product.product_tenure} Months</p>
            </div>
            <p className="product_price">{`N ${product.product_price}`}</p>

            <button className="btn btn-primary mt-3" onClick={requestLoan}>
              Send Request
            </button>
          </div>
        </div>
        <div className="product_desc">
          <p>{product.product_description}</p>
        </div>
      </div>

      {sent && (
        <Modal close={close}>
          <div className="pop-message">
            <img
              src={require("../../../public/assets/happy_face.svg")}
              height={90}
              width={90}
            />
            <p className="sub-heading mt-2">Request Success</p>
            <p className="text-gray mt-1">
              Your application was successful! You will be notified soon.
            </p>
            <button className="btn btn-primary mt-2" onClick={close}>
              Back to Home
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Process;
