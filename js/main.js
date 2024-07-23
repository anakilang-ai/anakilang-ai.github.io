import { get } from "https://jscroot.github.io/api/croot.js";
import {getCookie} from "https://jscroot.github.io/cookie/croot.js";
import {onClick} from 'https://jscroot.github.io/element/croot.js';

// let cookie = getCookie("Login")
// if (cookie == ""){
//     alert("Anda Belum Sign In Boss");
//     window.location.href = "https://anakilang-ai.github.io/login.html"
// }

onClick('popup-closer',onClosePopupClick);
onClick('insertmarkerbutton',onSubmitMarkerClick);
onClick('hapusbutton',onDeleteMarkerClick);
onClick('hitungcogbutton',getAllCoordinates);