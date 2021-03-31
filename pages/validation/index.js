import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Head from "next/head";
import firebase from "../../services/firebase";
import store from "../../store/store";
import { useProxy } from "valtio";
import { useRouter } from "next/router";
import Link from "next/link";

const Validation = () => {

const validation = {
  BVN:"12345678901",
  FirstName:"Uchenna",
  MiddleName:"Chijioke",
  LastName:"Nwanyanwu",
  DateOfBirth:"22-Oct-1970",
  PhoneNumber:"07033333333",
  RegistrationDate:"16-Nov-2014",
  EnrollmentBank:"900",
  EnrollmentBranch:"Victoria Island",
  WatchListed:"NO"
}

  return (
    <Layout>
      <Head>
          <title>Validation</title>
      </Head>
      <div className="dashboard text-left">
        <div className="">
        <h1>BVN Verification Completed</h1>
        <p> BVN: <span className="text-primary "> {validation.BVN}</span></p>
        <p> First Name: <span className="text-primary"> {validation.FirstName}</span></p>
        <p> Middle Name : <span className="text-primary"> {validation.MiddleName}</span></p>
        <p> Last Name: <span className="text-primary"> {validation.LastName} </span></p>
        <p> Date Of Birth : <span className="text-primary"> {validation.DateOfBirth} </span></p>
        <p> Phone Number : <span className="text-primary"> {validation.PhoneNumber} </span></p>
        <p> Registration Date :  <span className="text-primary"> {validation.RegistrationDate}</span></p>
        <p> Enrollment Bank :  <span className="text-primary"> {validation.EnrollmentBank}</span></p>
        <p>Enrollment Branch : <span className="text-primary"> {validation.EnrollmentBranch} </span></p>
        <p> WatchListed : <span className="text-gprimary"> {validation.WatchListed} </span></p>
        </div>
        <Link href="/account">
          <button className="btn btn-primary mt-2">Continue</button>
        </Link>
      </div>
    </Layout>
  )
};

export default Validation;
