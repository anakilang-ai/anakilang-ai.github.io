import {setInner,addChild, getValue } from "https://jscroot.github.io/element/croot.js";
import { setCookieWithExpireHour } from 'https://jscroot.github.io/cookie/croot.js';
import Draw from 'https://cdn.skypack.dev/ol/interaction/Draw.js';

export function getTokenFromAPI() {
    const tokenUrl = "https://ailang-api.up.railway.app/login";
    fetch(tokenUrl)
      .then(response => response.json())
      .then(tokenData => {
        if (tokenData.token) {
          userToken = tokenData.token;
          console.log('Token dari API:', userToken);
        }
      })
      .catch(error => console.error('Gagal mengambil token:', error));
  }


export function ResponsePostLogin(response) {
    if (response && response.token) {
      console.log('Token User:', response.token);
      setCookieWithExpireHour('Login', response.token, 3);
      window.location.href = 'https://1214005gis5.my.id/dashboard';
      alert("Selamat Datang")
    } else {
      alert('Login gagal. Silakan coba lagi.');
    }
  }

  export function ResponseLogin(result) {
    ResponsePostLogin(result)
  }

export function PostLogin() {
    const username = getValue("username");
    const password = getValue("password");
  
    const data = {
      username: username,
      password: password
    };
    return data;
  }

  export function GetDataForm(){
    const username = getValue("username");
    const password = getValue("password");
    console.log(password)

    const data = {
        username: username,
        password: password
    };
    return data
}

export function AlertPost(value){
    alert(value.message + "\nRegistrasi Berhasil")
    window.location.href= "signin.html"
}

export function ResponsePost(result) {
    AlertPost(result);
}