import { fetchData } from "https://jscroot.github.io/api/croot.js";
import { retrieveCookie } from "https://jscroot.github.io/cookie/croot.js";
import { handleClick } from 'https://jscroot.github.io/element/croot.js';
import { customMenuButton, navbarContent } from '/js/src/custom.js';

// let userSession = retrieveCookie("Login")
// if (!userSession){
//     alert("Please log in to continue");
//     window.location.href = "https://anakilang-ai.github.io/login.html"
// }

customMenuButton();
navbarContent();

handleClick('popup-closer', onPopupClose);
handleClick('insertmarkerbutton', onMarkerSubmit);
handleClick('hapusbutton', onMarkerDelete);
handleClick('hitungcogbutton', retrieveAllCoordinates);
