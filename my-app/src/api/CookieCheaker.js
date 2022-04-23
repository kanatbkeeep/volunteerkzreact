import {getUserEmail} from "./UserService";

// export default async function checkCookie() {
//     let token = getCookie("Authorization");
//     if (token != null) {
//         const boxes = document.querySelectorAll('.singInButton');
//         boxes.forEach(box => {
//             box.style.display = 'none';
//         });
//
//         document.getElementById('profileMiniBox').style.display = 'unset'
//         document.getElementById('profileMiniBox').innerHTML = await getUserEmail(token);
//     }
// }
//
// function getCookie(user) {
//     let cookieArr = document.cookie.split(";");
//     for(let i = 0; i < cookieArr.length; i++) {
//         let cookiePair = cookieArr[i].split("=");
//         if(user === cookiePair[0].trim()) {
//             return decodeURIComponent(cookiePair[1]);
//         }
//     }
//     return null;
// }