import React, { useState, useEffect } from "react";
import Setup from "../setup/setup";
import store from "../../../store/store";
import { useProxy } from "valtio";
import Process from "../borrow/process";
import Modal from "../../modal/modal";
import Link from "next/link";
import Payment from "../borrow/payment";
import { InputMoney, parseMoney } from "../../formats/money";
import firebase from "../../../services/firebase";

function product({ product, handleApply }) {
  const snapshot = useProxy(store);

  return (
    <div className="product">
      <div className="product__img">
        <img src={product.product_img} alt={`${product.product_name} img`} />
      </div>
      <div className="namenprice">
        <p className="name">{product.product_name}</p>
        <p className="price">N {product.product_price}</p>
      </div>
      <div className="btn_holder">
        <button
          className="btn btn-primary"
          disabled={snapshot.userInfo?.amountborrowed !== 0}
          onClick={handleApply}
        >
          Request
        </button>
      </div>
    </div>
  );
}

export default product;
