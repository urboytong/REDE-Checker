/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Profile from "views/examples/Profile.js";

import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";

import Quest from "views/examples/Quest.js";
import FaceRegis from "views/examples/FaceRegis.js";
import student from "views/examples/student";
import teacherrhome from "views/examples/professor-home";
import studenthome from "views/examples/student-home";
var routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-yellow",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },
];
export default routes;
