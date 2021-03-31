import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/layout";
import Link from "next/link";
import firebase from "../../services/firebase";
import { formatNumber } from "../../services/userService";
import store from "../../store/store";
import { useProxy } from "valtio";
import { useRouter } from "next/router";

const Index = () => {
  return (
    <Layout>
      <Head>
          <title>Success Page</title>
      </Head>
      <div className="register">
        <div id="recaptcha-container"></div>
        <div className="reg-form">
          <h1 className="heading mb-3">Mun gode!</h1>
          <p className="text-center">Congratulation! Your request is successfully made. Kindly wait for call from us and subsequent personal and business verification. Thanks.</p>
        </div>
        <Link href="/dashboard">
          <button className="btn btn-primary mt-2">Back to Home</button>
        </Link>
      </div>
    </Layout>
  );
};

export default Index;
