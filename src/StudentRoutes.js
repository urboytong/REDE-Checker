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
    path: "/student-class",
    name: "Student",
    icon: "ni ni-hat-3 text-yellow",
    component: student,
    layout: "/student",
  },
  {
    path: "/student-home",
    name: "Student-home",
    icon: "ni ni-hat-3 text-dark",
    component: studenthome,
    layout: "/student",
  },
  {
    path: "/FaceRegis",
    name: "FaceRegis",
    icon: "ni ni-satisfied text-green",
    component: FaceRegis,
    layout: "/student",
  },
  {
    path: "/Quest",
    name: "Quest",
    icon: "ni ni-controller text-purple",
    component: Quest,
    layout: "/student",
  },
];
export default routes;
