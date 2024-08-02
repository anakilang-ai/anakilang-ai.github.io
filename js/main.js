import { get } from "https://jscroot.github.io/api/croot.js";
import { getCookie } from "https://jscroot.github.io/cookie/croot.js";
import { onClick } from 'https://jscroot.github.io/element/croot.js';
import { custom_menuBtn, navbarSupportedContent } from '/js/src/custom.js';

// Uncomment and use cookie check if needed
// let cookie = getCookie("Login");
// if (cookie === "") {
//     alert("You are not signed in. Please log in.");
//     window.location.href = "https://anakilang-ai.github.io/login.html";
// }

try {
    custom_menuBtn();
    navbarSupportedContent();
} catch (error) {
    console.error("Error initializing custom functions:", error);
}

// Adding event listeners with error handling
const elements = {
    'popup-closer': onClosePopupClick,
    'insertmarkerbutton': onSubmitMarkerClick,
    'hapusbutton': onDeleteMarkerClick,
    'hitungcogbutton': getAllCoordinates
};

for (const [id, handler] of Object.entries(elements)) {
    try {
        onClick(id, handler);
    } catch (error) {
        console.error(`Error adding click listener to ${id}:`, error);
    }
}
