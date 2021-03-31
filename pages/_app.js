import {useState, useEffect} from 'react'
import '../styles/globals.scss'
import { useProxy } from "valtio";
import { useRouter } from "next/router";
import store from "../store/store";

function MyApp({ Component, pageProps }) {

  const snapshot = useProxy(store)
  const router = useRouter()
// useEffect (() => {
//   if(!snapshot.user){
//     router.push('/login')
//   }
// }, [])

  return <Component {...pageProps}/>
}


export default MyApp
