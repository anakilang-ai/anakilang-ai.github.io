import { get } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { onClick } from 'https://jscroot.github.io/element/croot.js';
import { custom_menuBtn, navbarSupportedContent } from '/js/src/custom.js';

// let userCookie = getCookie("Login")
// if (userCookie === "") {
//     alert("Please Sign In First");
//     window.location.href = "https://anakilang-ai.github.io/login.html";
// }

custom_menuBtn();
navbarSupportedContent();

onClick('popup-closer', handlePopupClose);
onClick('insertmarkerbutton', handleMarkerInsert);
onClick('hapusbutton', handleMarkerDelete);
onClick('hitungcogbutton', fetchAllCoordinates);

function handlePopupClose() {
    // Add your popup close logic here
}

function handleMarkerInsert() {
    // Add your marker insert logic here
}

function handleMarkerDelete() {
    // Add your marker delete logic here
}

function fetchAllCoordinates() {
    // Add your logic to get all coordinates here
}
