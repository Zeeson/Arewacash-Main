import firebase from "../services/firebase";
import store from "../store/store";

export const formatNumber = (number) => {
  let phone;
  if (number[0] === "0") {
    phone = number.slice(1);
  } else {
    phone = number;
  }
  return `+234${phone}`;
};

export const getInfo = (user) => {
  let data = {};
  firebase
    .database()
    .ref("userinfo")
    .child(user.uid)
    .on("value", (snapshot) => {
      data = snapshot.val();
      store.userInfo = data;
      store.accountInfo = data;
      // updateStarCount(postElement, data);
    });
  return data;
};

export const publicKey = "6Ld03GgaAAAAAEbBBa431UPcgsHstxQGgWLxACuE";
