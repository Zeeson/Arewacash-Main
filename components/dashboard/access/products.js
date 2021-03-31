import React, { useState, useEffect } from "react";
import Process from "./process";
import Product from "./product";

import Setup from "../setup/setup";
import store from "../../../store/store";
import { useProxy } from "valtio";

import Modal from "../../modal/modal";
import Link from "next/link";
import Payment from "../borrow/payment";
import { InputMoney, parseMoney } from "../../formats/money";
import firebase from "../../../services/firebase";

function products() {
  const DUMMY_PRODUCTS = [
    {
      product_img:
        "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/S/e/Sewing-Machine---Automatic-And-Manual-7922904.jpg",
      product_name: "Butterfly sewing machine",
      product_price: 20000,
      product_stock: 30,
      product_tenure: 9,
      product_description:
        "Butterfly electronic sewing machines. These work by a single motor that sends an electrical impulse to move the needle. Butterfly sewing machines have been the preferred choice of most Nigerian fashion designers.",
    },
    {
      product_img:
        "https://www.decorhubng.com/wp-content/uploads/2017/03/SUMEC-FIRMAN-SPG30002.8KVA-REMOTE.jpg",
      product_name: "Sumec Generator",
      product_price: 24000,
      product_stock: 12,
      product_tenure: 16,
      product_description:
        "FIRMAN is a generating equipment brand under SUMEC Group.As an important member of SINOMACH, a Fortune 500 enterprise, SUMEC Group was founded in 1978 and specializes in trade and service, engineering contracting, and investment development.  ",
    },
    {
      product_img:
        "https://www.decorhubng.com/wp-content/uploads/2016/11/Binatone-Blender-BLG-650.jpg",
      product_name: "Binatone Blender",
      product_price: 14000,
      product_stock: 9,
      product_tenure: 32,
      product_description:
        "Binatone Blenders & Prices in Nigeria · Binatone Professional Blender 1500W — (NGN) 30,000 naira — (NGN) 64,000 naira · Binatone Blender & Smoothie make",
    },
  ];

  const snapshot = useProxy(store);
  const [payment, setPayment] = useState(false);

  const [show, setShow] = useState({
    process: false,
    message: false,
  });
  const [products, setProducts] = useState(DUMMY_PRODUCTS);
  const [product, setProduct] = useState({});

  const closeMessage = () => {
    setShow({
      ...show,
      message: false,
    });
  };

  const handleApply = (product) => {
    if (!snapshot.userInfo.bvn) {
      setShow({
        ...show,
        message: true,
      });
    } else {
      setShow({
        ...show,
        process: true,
      });
      setProduct(product);
    }
  };

  const closeApply = () => {
    setShow({
      ...show,
      process: !show.process,
    });
  };

  useEffect(() => {
    console.log("info", store.userInfo);
  }, []);

  return (
    <div className="container">
      <div className="products">
        <div
          className="searchbox mb-3"
          style={{ paddingBottom: 0, paddingTop: 0 }}
        >
          <form>
            <input type="text" placeholder="Search here" />
          </form>
        </div>
        <div className="products_list">
          {products.map((product, index) => {
            return (
              <Product
                product={product}
                handleApply={() => handleApply(product)}
                key={index}
              />
            );
          })}
        </div>

        {show.process && <Process close={closeApply} product={product} />}
        {show.message && (
          <Modal close={closeMessage}>
            <div className="pop-message">
              <img
                src={require("../../../public/assets/sad_face.svg")}
                height={90}
                width={90}
              />
              <p className="sub-heading mt-2">Update account</p>
              <p className="text-gray mt-1">
                You need update your account information to continue.
              </p>
              <Link href="/bvn">
                <button className="btn btn-primary mt-2">Update Now</button>
              </Link>
            </div>
          </Modal>
        )}
        {payment && (
          <Modal close={() => setPayment(!Payment)}>
            <Payment action={payLoan} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default products;
