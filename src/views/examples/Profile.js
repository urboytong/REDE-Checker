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
//test punch22
// reactstrap components
import React, { useState, useEffect, useRef } from "react";
import firebaseApp from "../../firebase";
import { useLocation } from "react-router-dom";
import { AuthContext } from "components/Auth/Auth.js";
import Draggable from "react-draggable";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  UncontrolledCollapse,
  Modal,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip,
} from "reactstrap";
import "assets/scss/argon-dashboard/custom/profile.scss";

// core components
import UserHeader from "components/Headers/UserHeader.js";
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";
import { async } from "@firebase/util";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

const current = new Date();
const date = `${current.getDate()}/${
  current.getMonth() + 1
}/${current.getFullYear()}`;

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [modalOpen4, setModalOpen4] = useState(false);
  const [modalOpen5, setModalOpen5] = useState(false);
  const [modalOpen6, setModalOpen6] = useState(false);
  const [modalOpen7, setModalOpen7] = useState(false);
  const [modalOpen8, setModalOpen8] = useState(false);
  const [modalOpen9, setModalOpen9] = useState(false);
  const [modalOpen11, setModalOpen11] = useState(false);
  const [modalOpen12, setModalOpen12] = useState(false);
  const [modalOpen13, setModalOpen13] = useState(false);
  const [modalOpen14, setModalOpen14] = useState(false);
  const [modalOpen15, setModalOpen15] = useState(false);
  const [modalOpen16, setModalOpen16] = useState(false);
  const [copiedText, setCopiedText] = useState();

  const [uploadFile, setUploadFile] = React.useState();
  const [superHero, setSuperHero] = React.useState();

  const [ClassRoom, setClassRoom] = useState({});
  const [Request, setRequest] = useState({});
  const [RequestNoti, setRequestNoti] = useState(false);
  const [EmptyRequest, setEmptyRequest] = useState(false);
  const [Members, setMembers] = useState([]);
  const [CurrentRequestProfile, setCurrentRequestProfile] = useState({});

  const [ObjectSelect, setObjectSelect] = useState("");
  const [CountdownTime, setCountdownTime] = useState("");
  const [FaceBoxposition, setFaceBoxposition] = useState({ x: 165, y: 250 });
  const [ObjectBoxposition, setObjectBoxposition] = useState({
    x: 480,
    y: 250,
  });
  const [CurrentQuest, setCurrentQuest] = useState({});
  const [StartTime, setStartTime] = useState();
  const [EndTime, setEndTime] = useState();
  const [Countdown, setCountdown] = useState();
  const [CountdownSec, setCountdownSec] = useState();
  const [AllQuest, setAllQuest] = useState([]);
  const [SeeMore, setSeeMore] = useState([]);
  const [SeeMoreDate, setSeeMoreDate] = useState("");
  const [AllQuestAndMember, setAllQuestAndMember] = useState([]);
  const [SeeMoreComplete, setSeeMoreComplete] = useState([]);
  const [SeeMoreAbsent, setSeeMoreAbsent] = useState([]);
  const [SeeMoreCompleteObject, setSeeMoreCompleteObject] = useState([]);
  const [CompleteSeeMore, setCompleteSeeMore] = useState({});
  const [Report, setReport] = useState({ Complete: [], Absent: [] });
  const [ReportData, setReportData] = useState({});
  const [Summary, setSummary] = useState([]);
  const [UploadLeaveFormImage, setUploadLeaveFormImage] = useState();
  const [UploadLeaveFormImageURL, setUploadLeaveFormImageURL] = useState("");
  const [LeaveFormSubmited, setLeaveFormSubmited] = useState(false);
  const [TargetQuestDocId, setTargetQuestDocId] = useState("");
  const [TargetLeaveFormStudentData, setTargetLeaveFormStudentData] = useState({});
  const [LeaveFormImage, setLeaveFormImage] = useState("");

  const [ObjectSelectError, setObjectSelectError] = useState("");
  const [CountdownTimeError, setCountdownTimeError] = useState("");

  const [NotOnQuest, setNotOnQuest] = useState(false);
  const [OnQuest, setOnQuest] = useState(false);

  const location = useLocation();

  const [data, setdata] = useState({
    labels: [
      "17/04/2022",
      "17/04/2022",
      "17/04/2022",
      "17/04/2022",
      "17/04/2022",
      "18/04/2022",
      "12/05/2022",
    ],
    datasets: [
      {
        label: "COMPLETED",
        data: [50, 45, 49, 40, 35, 42, 45],
        radius: 3,
        borderColor: "rgb(50, 168, 82)",
      },
      {
        label: "ABSENT",
        data: [0, 5, 1, 10, 15, 8, 5],
        radius: 3,
        borderColor: "rgb(255, 99, 132)",
      },
    ],
  });

  const [options, setoptions] = useState({
    scales: {
      yAxes: [{
          ticks: {
            min: 0, // it is for ignoring negative step.
            beginAtZero: true,
            callback: function(value, index, values) {
                if (Math.floor(value) === value) {
                    return value;
                }
            },
          }
      }]
  }
  });

  useEffect(() => {
    //ใช้ firebaseApp.auth().onAuthStateChanged เพื่อใช้ firebaseApp.auth().currentUser โดยไม่ติด error เมื่อทำการ signout
    firebaseApp.auth().onAuthStateChanged((user) => {
      const db = firebaseApp.firestore();
      const userCollection = db
        .collection("ClassRoom")
        .where("__name__", "==", location.search.substring(1));

      // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
      const unsubscribe = userCollection.onSnapshot((ss) => {
        // ตัวแปร local
        let ClassRoom = {};

        ss.forEach((document) => {
          // manipulate ตัวแปร local
          ClassRoom = document.data();
        });

        // เปลี่ยนค่าตัวแปร state
        setClassRoom(ClassRoom);
        if (ClassRoom.Request.length == 0) {
          setRequestNoti(false);
        }
        if (ClassRoom.Request.length != 0) {
          setRequestNoti(true);
        }

        const userCollection = db.collection("User");

        // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
        const unsubscribe = userCollection.onSnapshot((ss) => {
          // ตัวแปร local
          let request = {};
          let members = [];
          let count = 0;

          ss.forEach((document) => {
            // manipulate ตัวแปร local
            if (ClassRoom.Request.includes(document.data().Uid)) {
              request[document.id] = document.data();
            }
            if (ClassRoom.Members.includes(document.data().Uid)) {
              members[count] = document.data();
              members[count].key = document.id;
              count++;
            }
          });

          // เปลี่ยนค่าตัวแปร state
          setRequest(request);
          members.sort((a, b) =>
            a.StudentID > b.StudentID ? 1 : b.StudentID > a.StudentID ? -1 : 0
          );
          if (Object.keys(request).length == 0) {
            setEmptyRequest(true);
          }
          if (Object.keys(request).length != 0) {
            setEmptyRequest(false);
          }
          setMembers(members);

          const userCollection = db
            .collection("Quest")
            .where("ClassRoomId", "==", location.search.substring(1));

          // subscription นี้จะเกิด callback กับทุกการเปลี่ยนแปลงของ collection Food
          const unsubscribe = userCollection.onSnapshot((ss) => {
            // ตัวแปร local
            let CurrentQuest = {};
            let AllQuest = [];
            let countall = 0;

            ss.forEach((document) => {
              // manipulate ตัวแปร local
              if (document.data().EndTimeStamp >= Date.now()) {
                CurrentQuest = document.data();
                CurrentQuest.DocId = document.id;
              }

              AllQuest[countall] = document.data();
              AllQuest[countall].DocId = document.id;
              countall++;
            });

            // เปลี่ยนค่าตัวแปร state
            AllQuest.sort((a, b) =>
              a.EndTimeStamp < b.EndTimeStamp
                ? 1
                : b.EndTimeStamp < a.EndTimeStamp
                ? -1
                : 0
            );
            console.log(AllQuest);
            setAllQuest(AllQuest);
            setCurrentQuest(CurrentQuest);
            const startdate = new Date(CurrentQuest.StartTimeStamp);
            const enddate = new Date(CurrentQuest.EndTimeStamp);
            setStartTime(startdate.toLocaleString("en-GB"));
            setEndTime(enddate.toLocaleString("en-GB"));

            if (Object.keys(CurrentQuest).length != 0) {
              setOnQuest(true);
              setNotOnQuest(false);
            }
            if (Object.keys(CurrentQuest).length == 0) {
              setOnQuest(false);
              setNotOnQuest(true);
            }
          });

          return () => {
            // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
            unsubscribe();
          };
        });
        return () => {
          // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
          unsubscribe();
        };
      });

      return () => {
        // ยกเลิก subsciption เมื่อ component ถูกถอดจาก dom
        unsubscribe();
      };
    });
  }, []);

  useEffect(() => {
    console.log("Members");
    console.log(Members);
    let members = Members;
    let allquest = AllQuest;
    let absentlist = [];
    let membersid = [];
    let allquestid = [];
    let absent = [];

    for (let i = 0; i < members.length; i++) {
      membersid[i] = members[i].Uid;
    }

    for (let i = 0; i < allquest.length; i++) {
      let test = [];
      for (let j = 0; j < allquest[i].Complete.length; j++) {
        test.push(allquest[i].Complete[j].Uid);
      }
      allquestid[i] = test;
    }

    for (let i = 0; i < allquestid.length; i++) {
      absent[i] = membersid;
      for (let j = 0; j < allquestid[i].length; j++) {
        absent[i] = absent[i].filter((el) => !allquestid[i].includes(el));
      }
      allquest[i].Absent = absent[i];
    }

    for (let i = 0; i < allquest.length; i++) {
      for (let j = 0; j < allquest[i].Absent.length; j++) {
        if (!allquest[i].Absent[j].Uid) {
          let test = { Uid: allquest[i].Absent[j] };
          allquest[i].Absent[j] = test;
        }
      }
    }

    for (let i = 0; i < allquest.length; i++) {
      for (let j = 0; j < allquest[i].Absent.length; j++) {
        for (let k = 0; k < members.length; k++) {
          if (allquest[i].Absent[j].Uid == members[k].Uid) {
            allquest[i].Absent[j].FirstName = members[k].FirstName;
            allquest[i].Absent[j].LastName = members[k].LastName;
            allquest[i].Absent[j].StudentID = members[k].StudentID;
          }
        }
      }
    }

    for (let i = 0; i < allquest.length; i++) {
      for (let j = 0; j < allquest[i].Complete.length; j++) {
        for (let k = 0; k < members.length; k++) {
          if (allquest[i].Complete[j].Uid == members[k].Uid) {
            allquest[i].Complete[j].FirstName = members[k].FirstName;
            allquest[i].Complete[j].LastName = members[k].LastName;
            allquest[i].Complete[j].StudentID = members[k].StudentID;
          }
        }
      }
    }

    //ตัดรายการคนที่ออกจากห้อง
    for (let i = 0; i < allquest.length; i++) {
      for (let j = 0; j < allquest[i].Complete.length; j++) {
        if (!allquest[i].Complete[j].FirstName) {
          allquest[i].Complete[j] = "emp";
        }
      }
    }

    for (let i = 0; i < allquest.length; i++) {
      allquest[i].Complete = allquest[i].Complete.filter((x) => x !== "emp");
    }

    for (let i = 0; i < allquest.length; i++) {
      allquest[i].Complete.sort((a, b) =>
        a.StudentID > b.StudentID ? 1 : b.StudentID > a.StudentID ? -1 : 0
      );
    }

    let allmemberid = [];

    for (let i = 0; i < members.length; i++) {
      allmemberid.push(members[i].Uid)
    }
    
    for (let i = 0; i < allquest.length; i++) {
      let leave = []
      for (let j = 0; j < allquest[i].Leave.length; j++) {
        if(allmemberid.includes(allquest[i].Leave[j].Uid)){
          leave.push(allquest[i].Leave[j])
        }
      }
      allquest[i].Leave = leave;
    }



    console.log("allquest");
    console.log(allquest);

    //Chart

    setAllQuestAndMember(allquest);

    let chartdata = data;
    let chartlabel = [];
    let chartcompleteddata = [];
    let chartabsentdata = [];
    let max = 0;
    let option = options;

    for (let i = 0; i < allquest.length; i++) {
      chartlabel.push(allquest[allquest.length - 1 - i].Date);
      chartcompleteddata.push(
        allquest[allquest.length - 1 - i].Complete.length
      );
      chartabsentdata.push(allquest[allquest.length - 1 - i].Absent.length - allquest[allquest.length - 1 - i].Leave.length);
    }

    chartdata.labels = chartlabel;
    chartdata.datasets[0].data = chartcompleteddata;
    chartdata.datasets[1].data = chartabsentdata;

    max = Math.max.apply(Math, chartcompleteddata)
    if(Math.max.apply(Math, chartabsentdata) > Math.max.apply(Math, chartcompleteddata)){
      max = Math.max.apply(Math, chartabsentdata)
    }

    if(max < 10){
      option.scales.yAxes[0].ticks.max = 10
    }
    if(max >= 10){
      option.scales.yAxes[0].ticks.max = max
    }
    
    setdata(chartdata);
    setoptions(option);

    //Summary

    for (let i = 0; i < members.length; i++) {
      let completedcount = 0;
      let absentcount = 0;
      let leavecount = 0;
      for (let j = 0; j < allquest.length; j++) {
        for (let k = 0; k < allquest[j].Complete.length; k++) {
          if (allquest[j].Complete[k].Uid == members[i].Uid) {
            completedcount++;
          }
        }
        for (let l = 0; l < allquest[j].Absent.length; l++) {
          if (allquest[j].Absent[l].Uid == members[i].Uid) {
            let c = 0;
            for (let k = 0; k < allquest[j].Leave.length; k++) {
              if(allquest[j].Leave[k].Uid == members[i].Uid)
                c++;
            }
            if(c == 0){
              absentcount++;
            }      
            if(c != 0){
              leavecount++;
            }  
          }
        }
      }
      members[i].CompletedCount = completedcount;
      members[i].AbsentCount = absentcount;
      members[i].LeaveCount = leavecount;
      members[i].AllQuestCount = allquest.length;
    }
    setSummary(members);
  }, [AllQuest, Members]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() > CurrentQuest.EndTimeStamp) {
        setOnQuest(false);
        setNotOnQuest(true);
      }
      setCountdown(
        millisToMinutesAndSeconds(CurrentQuest.EndTimeStamp - Date.now())
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [millisToMinutesAndSeconds(CurrentQuest.EndTimeStamp - Date.now())]);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  const ProfileModalOpens = (requestinfo) => {
    setModalOpen2(!modalOpen2);
    setCurrentRequestProfile(requestinfo);
  };

  const ReportModalOpens = (requestinfo) => {
    setModalOpen3(!modalOpen3);
    let complete = [];
    let absent = [];
    let image = "";
    let count = 0;
    for (let i = 0; i < AllQuestAndMember.length; i++) {
      for (let j = 0; j < AllQuestAndMember[i].Complete.length; j++) {
        if (AllQuestAndMember[i].Complete[j].Uid == requestinfo.Uid) {
          count++;
          image = AllQuestAndMember[i].Complete[j].Image;
        }
      }
      if (count > 0) {
        complete.push({
          Date: AllQuestAndMember[i].Date,
          ObjectSelect: AllQuestAndMember[i].ObjectSelect,
          Image: image,
        });
      }
      if (count == 0) {
        let c = 0;
        for (let j = 0; j < AllQuestAndMember[i].Leave.length; j++) {
          if(AllQuestAndMember[i].Leave[j].Uid == requestinfo.Uid){
            c++
          }
        }
        if(c == 0){
          absent.push({
            Date: AllQuestAndMember[i].Date,
            ObjectSelect: AllQuestAndMember[i].ObjectSelect,
          });
        }
      }
      count = 0;
    }
    setReport({ Complete: complete, Absent: absent });
    setCurrentRequestProfile(requestinfo);
  };

  const DeleteModalOpens = (requestinfo) => {
    setModalOpen4(!modalOpen4);
    setCurrentRequestProfile(requestinfo);
  };

  const DeleteMember = async (id) => {
    const db = firebaseApp.firestore();
    let MemberList = ClassRoom.Members;
    var myIndex = MemberList.indexOf(id);
    if (myIndex !== -1) {
      MemberList.splice(myIndex, 1);
    }
    const res = await db
      .collection("ClassRoom")
      .doc(location.search.substring(1))
      .update({
        Members: MemberList,
      });
    setModalOpen4(!modalOpen4);
  };

  const accept = async (id) => {
    const db = firebaseApp.firestore();
    let RequestList = ClassRoom.Request;
    var myIndex = RequestList.indexOf(id);
    if (myIndex !== -1) {
      RequestList.splice(myIndex, 1);
    }
    const res = await db
      .collection("ClassRoom")
      .doc(location.search.substring(1))
      .update({
        Request: RequestList,
      });
    let MemberList = ClassRoom.Members;
    MemberList.push(id);
    const res2 = await db
      .collection("ClassRoom")
      .doc(location.search.substring(1))
      .update({
        Members: MemberList,
      });
  };

  const refuse = async (id) => {
    const db = firebaseApp.firestore();
    let RequestList = ClassRoom.Request;
    var myIndex = RequestList.indexOf(id);
    if (myIndex !== -1) {
      RequestList.splice(myIndex, 1);
    }
    const res = await db
      .collection("ClassRoom")
      .doc(location.search.substring(1))
      .update({
        Request: RequestList,
      });
  };

  const endquest = async () => {
    const db = firebaseApp.firestore();
    const res = await db.collection("Quest").doc(CurrentQuest.DocId).update({
      EndTimeStamp: Date.now(),
    });
    setModalOpen16(!modalOpen16);
  };

  const cancelquest = () => {
    const db = firebaseApp.firestore();
    const userCollection = db.collection("Quest");

    const documentRef = userCollection.doc(CurrentQuest.DocId);

    documentRef.delete();

    setModalOpen15(!modalOpen15);
  };

  const seemore = (date) => {
    setModalOpen6(!modalOpen6);
    let quest = [];
    for (let i = 0; i < AllQuestAndMember.length; i++) {
      if (AllQuestAndMember[i].Date == date) {
        quest.push(AllQuestAndMember[i]);
      }
    }
    console.log(quest);
    setSeeMore(quest);
    setSeeMoreDate(date);
  };

  const seemorecomplete = (data) => {
    setSeeMoreComplete(data.Complete);
    setSeeMoreCompleteObject(data.ObjectSelect);
  };

  const seemoreabsent = (data) => {
    let absent = data.Absent
    let leave = data.Leave
    for (let i = 0; i < absent.length; i++) {
      absent[i].Leave = false;
      for (let j = 0; j < leave.length; j++) {
        if(absent[i].Uid == leave[j].Uid){
          absent[i].Leave = true;
          absent[i].Image = leave[j].Image;
        }
      }
    }
    setTargetQuestDocId(data.DocId)
    setSeeMoreAbsent(absent);
    setSeeMoreCompleteObject(data.ObjectSelect);
  };

  const completeseemore = (data, obj) => {
    setModalOpen9(!modalOpen9);
    const ndata = data;
    const menmbers = Members;
    const index = menmbers.findIndex((object) => {
      return object.Uid === ndata.Uid;
    });
    ndata.Faculty = menmbers[index].Faculty;
    ndata.Department = menmbers[index].Department;
    ndata.Major = menmbers[index].Major;
    ndata.ObjectSelect = obj;
    setCompleteSeeMore(ndata);
  };

  const report = (data) => {
    setModalOpen11(!modalOpen11);
    setReportData(data);
  };

  const leaveform = (SeeMoreAbsent) => {
    setModalOpen12(!modalOpen12);
    setUploadLeaveFormImageURL("");
    setUploadLeaveFormImage();
    setLeaveFormSubmited(false);
    setTargetLeaveFormStudentData(SeeMoreAbsent)
  };
  
  const leaveformuploadfile = (value, file) => {
    setUploadLeaveFormImage(file);
    setUploadLeaveFormImageURL(URL.createObjectURL(file))
  };

  const seeleaveform = (image) => {
    setModalOpen13(!modalOpen13)
    setLeaveFormImage(image);
  };

  const submitleaveform = async (con) => {
    if(LeaveFormSubmited == false){
      if(con == "withfile"){
        setLeaveFormSubmited(true);
        const files = UploadLeaveFormImage;
        const data = new FormData();
        data.append("file", files);
        data.append("upload_preset", "LeaveFile_images");
        const res = await fetch(
          "	https://api.cloudinary.com/v1_1/daxwfdlwj/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const file = await res.json();
        //เปลี่ยน setIimage เป็น setImage เพื่อเก็บ url โดยตรง
        console.log(file.secure_url);

        let quest = AllQuestAndMember;
        let tid = TargetQuestDocId;
        const index = quest.findIndex((object) => {
          return object.DocId === tid;
        });
        let leavesubmit = {};
        leavesubmit.FirstName = TargetLeaveFormStudentData.FirstName
        leavesubmit.LastName = TargetLeaveFormStudentData.LastName
        leavesubmit.StudentID = TargetLeaveFormStudentData.StudentID
        leavesubmit.Uid = TargetLeaveFormStudentData.Uid
        leavesubmit.Image = file.secure_url

        let questleave = quest[index].Leave
        questleave.push(leavesubmit)
    
        const db = firebaseApp.firestore();
        const res2 = await db
          .collection("Quest")
          .doc(TargetQuestDocId)
          .update({
            Leave: questleave,
          });

          let absent = SeeMoreAbsent
          for (let i = 0; i < absent.length; i++) {
            if(absent[i].Uid == TargetLeaveFormStudentData.Uid){
              absent[i].Leave = true;
              absent[i].Image = file.secure_url;
            }
          }
          setSeeMoreAbsent(absent);
    
          setModalOpen12(!modalOpen12);
      }
      if(con == "withoutfile"){
        setLeaveFormSubmited(true);
        let quest = AllQuestAndMember;
        let tid = TargetQuestDocId;
        const index = quest.findIndex((object) => {
          return object.DocId === tid;
        });
        let leavesubmit = {};
        leavesubmit.FirstName = TargetLeaveFormStudentData.FirstName
        leavesubmit.LastName = TargetLeaveFormStudentData.LastName
        leavesubmit.StudentID = TargetLeaveFormStudentData.StudentID
        leavesubmit.Uid = TargetLeaveFormStudentData.Uid
        leavesubmit.Image = ""

        let questleave = quest[index].Leave
        questleave.push(leavesubmit)
    
        const db = firebaseApp.firestore();
        const res2 = await db
          .collection("Quest")
          .doc(TargetQuestDocId)
          .update({
            Leave: questleave,
          });

          let absent = SeeMoreAbsent
          for (let i = 0; i < absent.length; i++) {
            if(absent[i].Uid == TargetLeaveFormStudentData.Uid){
              absent[i].Leave = true;
              absent[i].Image = "";
            }
          }
          setSeeMoreAbsent(absent);
    
          setModalOpen12(!modalOpen12);
      }
    }

  };
  

  const FacetrackPos = (data) => {
    setFaceBoxposition({ x: data.x + 110, y: data.y + 110 });
  };
  const ObjecttrackPos = (data) => {
    setObjectBoxposition({ x: data.x + 110, y: data.y + 110 });
  };

  async function SendQuest() {
    clearErrors();
    ErrorsCheck();
    let UId = firebaseApp.auth().currentUser.uid;
    let ClassRoomId = location.search.substring(1);
    let Complete = [];
    let Absent = [];
    let Leave = [];
    let StartTimeStamp = Date.now();
    let EndTimeStamp = Date.now() + CountdownTime * 60000;
    function padTo2Digits(num) {
      return num.toString().padStart(2, "0");
    }

    function formatDate(date) {
      return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
      ].join("/");
    }
    let date = formatDate(new Date());
    if (ObjectSelect != "" && CountdownTime != "") {
      const db = firebaseApp.firestore();
      const userCollection = db.collection("Quest");
      const documentRef = await userCollection.add({
        UId,
        ClassRoomId,
        ObjectSelect,
        CountdownTime,
        StartTimeStamp,
        EndTimeStamp,
        Date: date,
        FaceBoxposition,
        ObjectBoxposition,
        Complete,
        Absent,
        Leave,
      });
      setModalOpen14(!modalOpen14);
      setObjectSelect("");
      setCountdownTime("");
      setFaceBoxposition({ x: 165, y: 250 });
      setObjectBoxposition({ x: 480, y: 250 });
    }
  }

  function ErrorsCheck() {
    if (ObjectSelect == "") setObjectSelectError("Must not be empty");
    if (CountdownTime == "") setCountdownTimeError("Must not be empty");
  }

  const clearErrors = () => {
    setObjectSelectError("");
    setCountdownTimeError("");
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0 margin-b" xl="3">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle img-facedetection"
                        src={
                          require("../../assets/img/theme/team-3-800x800.gif")
                            .default
                        }
                      />
                    </a>
                  </div>
                </Col>

                <Modal
                  toggle={() => setModalOpen(!modalOpen)}
                  isOpen={modalOpen}
                  size="md"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen(!modalOpen)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    {" "}
                    <div className="text-center">
                      {" "}
                      <h1 className="invite-className subjectname-invite">
                        <span>{ClassRoom.SubjectCode}</span> &nbsp;
                        <span>{ClassRoom.SubjectName}</span>
                      </h1>
                      {/* <h1 className="invite-className">
                        {ClassRoom.SubjectCode} {ClassRoom.SubjectName}
                      </h1> */}
                      <CopyToClipboard
                        text={location.search.substring(1)}
                        onCopy={() =>
                          setCopiedText(location.search.substring(1))
                        }
                      >
                        <button
                          className="btn-icon-clipboard copy-link-box"
                          id="tooltip982655500"
                          type="button"
                        >
                          <div className="link-box">
                            <i class="fas fa-solid fa-link link-icon"></i>
                            <h4 className="link-text">
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              {location.search.substring(1)}
                            </h4>
                          </div>
                        </button>
                      </CopyToClipboard>
                      <UncontrolledTooltip
                        delay={0}
                        trigger="hover focus"
                        target="tooltip982655500"
                      >
                        {copiedText === "ni ni-active-40"
                          ? "This was Copied!"
                          : "Copy To Clipboard"}
                      </UncontrolledTooltip>
                    </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>

                <Modal
                  toggle={() => setModalOpen1(!modalOpen1)}
                  isOpen={modalOpen1}
                  size="lg"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen1(!modalOpen1)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    {" "}
                    <Col className="order-xl-1">
                      <Card className="bg-secondary shadow">
                        <CardHeader className="border-0">
                          <Row className="align-items-center">
                            <div className="col">
                              <h3 className="text-center header-request">
                                Request to join a class
                              </h3>
                            </div>
                          </Row>
                        </CardHeader>
                        <Table
                          className="align-items-center table-flush"
                          responsive
                        >
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">id</th>
                              <th scope="col">name</th>
                              <th scope="col">action</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(Request).map((id) => {
                              return (
                                <tr>
                                  <th scope="row">
                                    <Media className="align-items-center">
                                      <Media>
                                        <span className="mb-0 text-sm">
                                          {Request[id].StudentID}
                                        </span>
                                      </Media>
                                    </Media>
                                  </th>

                                  <td>
                                    <Badge color="" className="badge-dot mr-4">
                                      {Request[id].FirstName}{" "}
                                      {Request[id].LastName}
                                    </Badge>
                                  </td>
                                  <td>
                                    <Button
                                      color="success"
                                      onClick={() => accept(Request[id].Uid)}
                                      size="sm"
                                      className="icon-requestModal"
                                    >
                                      <i class="fas fa-solid fa-check"></i>
                                    </Button>
                                    <Button
                                      color="danger"
                                      onClick={() => refuse(Request[id].Uid)}
                                      size="sm"
                                      className="icon-requestModal"
                                    >
                                      <i class="fas fa-regular fa-xmark"></i>
                                    </Button>
                                  </td>
                                  <td className="text-right threedot">
                                    <UncontrolledDropdown>
                                      <DropdownToggle
                                        className="btn-icon-only text-light"
                                        role="button"
                                        size="sm"
                                        color=""
                                        onClick={(e) => e.preventDefault()}
                                      >
                                        <i className="fas fa-ellipsis-v" />
                                      </DropdownToggle>
                                      <DropdownMenu
                                        className="dropdown-menu-arrow"
                                        right
                                      >
                                        <DropdownItem
                                          onClick={() =>
                                            ProfileModalOpens(Request[id])
                                          }
                                        >
                                          Profile
                                        </DropdownItem>
                                      </DropdownMenu>
                                    </UncontrolledDropdown>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                        {EmptyRequest ? (
                          <div className="no-request text-red">
                            No requests recently
                          </div>
                        ) : null}
                      </Card>
                    </Col>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen2(!modalOpen2)}
                  isOpen={modalOpen2}
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen2(!modalOpen2)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody className="profileModal">
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                      <Card className="card-profile shadow">
                        <Row className="justify-content-center">
                          <Col className="order-lg-2" lg="3">
                            <div className="card-profile-image">
                              <a onClick={(e) => e.preventDefault()}>
                                <img
                                  alt="..."
                                  className="rounded-circle img-profileModal"
                                  src={
                                    require("../../assets/img/theme/team-4-800x800.jpg")
                                      .default
                                  }
                                />
                              </a>
                            </div>
                          </Col>
                        </Row>
                        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                          <Row>
                            <div className="col">
                              <div className="card-profile-stats d-flex justify-content-center stdID-profileModal">
                                <div>
                                  <h2 className="heading">
                                    {CurrentRequestProfile.StudentID}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </Row>
                          <div className="text-center">
                            <h2>
                              {CurrentRequestProfile.FirstName}{" "}
                              {CurrentRequestProfile.LastName}
                            </h2>
                            <div className="h3 font-weight-300">
                              <i className="ni location_pin mr-2" />
                              {CurrentRequestProfile.Faculty},{" "}
                              {CurrentRequestProfile.Department}
                              <br /> {CurrentRequestProfile.Major}
                            </div>
                            <hr className="my-4" />
                            <div className="h5 mt-4">
                              <i className="ni business_briefcase-24 mr-2" />
                              {CurrentRequestProfile.Email}
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>

                <Modal
                  toggle={() => setModalOpen3(!modalOpen3)}
                  isOpen={modalOpen3}
                  size="xl"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen3(!modalOpen3)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    <Row>
                      {" "}
                      <Col>
                        <Card className="card-profile shadow profileModal">
                          <Row className="justify-content-center">
                            <Col className="order-lg-2" lg="3">
                              <div className="card-profile-image">
                                <a onClick={(e) => e.preventDefault()}>
                                  <img
                                    alt="..."
                                    className="rounded-circle img-profileModal"
                                    src={
                                      require("../../assets/img/theme/team-4-800x800.jpg")
                                        .default
                                    }
                                  />
                                </a>
                              </div>
                            </Col>
                          </Row>
                          <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 width-profilecard"></CardHeader>
                          <CardBody className="pt-0 pt-md-4 width-profilecard">
                            <Row>
                              <div className="col">
                                <div className="card-profile-stats d-flex justify-content-center stdID-profileModal">
                                  <div>
                                    <h2 className="heading">
                                      {CurrentRequestProfile.StudentID}
                                    </h2>
                                  </div>
                                </div>
                              </div>
                            </Row>
                            <div className="text-center">
                              <h2>
                                {CurrentRequestProfile.FirstName}{" "}
                                {CurrentRequestProfile.LastName}
                              </h2>
                              <div className="h3 font-weight-300">
                                <i className="ni location_pin mr-2" />
                                {CurrentRequestProfile.Faculty},{" "}
                                {CurrentRequestProfile.Department}
                                <br /> {CurrentRequestProfile.Major}
                              </div>
                              <hr className="my-4" />
                              <div className="h5 mt-4">
                                <i className="ni business_briefcase-24 mr-2" />
                                {CurrentRequestProfile.Email}
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                      <ModalBody className="none-padding-profilecard width-reportcard">
                        <Col className="order-xl-1" xl="12">
                          <row>
                            <Card className="bg-secondary shadow">
                              <CardHeader className="border-0">
                                <Row className="align-items-center">
                                  <div className="col">
                                    <h3 className="mb-0">Report</h3>
                                  </div>
                                  <div className="col text-right">
                                    <h3>{ClassRoom.SubjectCode}</h3>
                                  </div>
                                </Row>
                              </CardHeader>
                              <Table
                                className="align-items-center table-flush"
                                responsive
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th scope="col"></th>
                                    <th scope="col">completed</th>
                                    <th scope="col">absent</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            Quest Check
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      {" "}
                                      <div>
                                        <Button
                                          color="success"
                                          outline
                                          type="button"
                                          id="toggler1"
                                        >
                                          {Report.Complete.length}
                                        </Button>
                                      </div>
                                    </td>
                                    <td>
                                      <Button
                                        color="danger"
                                        outline
                                        type="button"
                                        id="toggler"
                                      >
                                        {Report.Absent.length}
                                      </Button>
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </Card>
                          </row>
                          <UncontrolledCollapse toggler="#toggler1">
                            <Card className="bg-secondary shadow mt-3">
                              <CardHeader className="border-0">
                                <Row className="align-items-center">
                                  <div className="col">
                                    <h3 className="mb-0">Completed</h3>
                                  </div>
                                </Row>
                              </CardHeader>
                              <Table
                                className="align-items-center table-flush"
                                responsive
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Quest</th>
                                    <th scope="col" className="col text-right">
                                      details
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Object.keys(Report.Complete).map((id) => {
                                    return (
                                      <tr>
                                        <th scope="row">
                                          <Media className="align-items-center">
                                            <Media>
                                              <span className="mb-0 text-sm">
                                                {Report.Complete[id].Date}
                                              </span>
                                            </Media>
                                          </Media>
                                        </th>

                                        <td>
                                          <Badge
                                            color=""
                                            className="badge-dot mr-4"
                                          >
                                            <i className="bg-success" />
                                            Selfie with a{" "}
                                            {Report.Complete[id].ObjectSelect}
                                          </Badge>
                                        </td>
                                        <td className="text-right">
                                          <Button
                                            className="btn-icon btn-2"
                                            color="dark"
                                            type="button"
                                            size="sm"
                                            onClick={() =>
                                              report(
                                                Report.Complete[id]
                                              )
                                            }
                                          >
                                            <i class="fa-solid fa-image" />
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </Table>
                              {Report.Complete.length == 0 ? (
                                <div className="no-request text-red">
                                  There is no quest completed currently.
                                </div>
                              ) : null}
                            </Card>
                          </UncontrolledCollapse>

                          <UncontrolledCollapse toggler="#toggler">
                            <Card className="bg-secondary shadow mt-3">
                              <CardHeader className="border-0">
                                <Row>
                                  <div className="col">
                                    <h3 className="mb-0">Absent</h3>
                                  </div>
                                  <div className="col text-right"></div>
                                </Row>
                              </CardHeader>
                              <Table
                                className="align-items-center table-flush"
                                responsive
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Quest</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {Object.keys(Report.Absent).map((id) => {
                                    return (
                                      <tr>
                                        <th scope="row">
                                          <Media className="align-items-center">
                                            <Media>
                                              <span className="mb-0 text-sm">
                                                {Report.Absent[id].Date}
                                              </span>
                                            </Media>
                                          </Media>
                                        </th>

                                        <td>
                                          <Badge
                                            color=""
                                            className="badge-dot mr-4"
                                          >
                                            <i className="bg-danger" />
                                            Selfie with a{" "}
                                            {Report.Absent[id].ObjectSelect}
                                          </Badge>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </Table>
                              {Report.Absent.length == 0 ? (
                                <div className="no-request text-red">
                                  There is no quest missed currently.
                                </div>
                              ) : null}
                            </Card>
                          </UncontrolledCollapse>
                        </Col>
                      </ModalBody>
                    </Row>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen11(!modalOpen11)}
                  isOpen={modalOpen11}
                  size="md"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen11(!modalOpen11)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    {" "}
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                      <Card className="card-profile shadow">
                        <CardBody className="pt-0 pt-md-4">
                          <div className="text-center">
                            <h2 className="text-success text-complete">
                              Completed
                            </h2>
                            <h2 className="text-success">
                              " Selfie with a {ReportData.ObjectSelect}"
                            </h2>
                            <div>
                              <h4>{ReportData.Date}</h4>
                            </div>
                            <img
                              src={ReportData.Image}
                              width="640"
                              height="480"
                              className="img-fluid shadow-4"
                              alt="..."
                              style={{
                                transform: "rotateY(180deg)",
                              }}
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen9(!modalOpen9)}
                  isOpen={modalOpen9}
                  size="md"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen9(!modalOpen9)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    <Col className="order-xl-2 mb-5 mb-xl-0" xl="12">
                      <Card className="card-profile shadow profileModal">
                        <Row className="justify-content-center">
                          <Col className="order-lg-2" lg="3">
                            <div className="card-profile-image">
                              <a onClick={(e) => e.preventDefault()}>
                                <img
                                  alt="..."
                                  className="rounded-circle img-profileModal"
                                  src={
                                    require("../../assets/img/theme/team-4-800x800.jpg")
                                      .default
                                  }
                                />
                              </a>
                            </div>
                          </Col>
                        </Row>
                        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
                        <CardBody className="pt-0 pt-md-4">
                          <Row>
                            <div className="col">
                              <div className="card-profile-stats d-flex justify-content-center stdID-profileModal">
                                <div>
                                  <h2 className="heading">
                                    {CompleteSeeMore.StudentID}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </Row>
                          <div className="text-center">
                            <h2>
                              {CompleteSeeMore.FirstName}{" "}
                              {CompleteSeeMore.LastName}
                            </h2>
                            <div className="h3 font-weight-300">
                              <i className="ni location_pin mr-2" />
                              {CompleteSeeMore.Faculty},{" "}
                              {CompleteSeeMore.Department}
                              <br/>{CompleteSeeMore.Major}
                            </div>
                            <hr className="my-4" />
                          </div>
                          <div className="text-center">
                            <h2 className="text-success">Completed</h2>
                            <h2 className="text-success">
                              " Selfie with a {CompleteSeeMore.ObjectSelect}"
                            </h2>
                            <div>
                              <h4>{SeeMoreDate}</h4>
                            </div>

                            <img
                              src={CompleteSeeMore.Image}
                              width="640"
                              height="480"
                              className="img-fluid shadow-4"
                              alt="..."
                              style={{
                                transform: "rotateY(180deg)",
                              }}
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen4(!modalOpen4)}
                  isOpen={modalOpen4}
                  className="confirm-modal"
                >
                  <div className=" modal-header"></div>
                  <ModalBody>
                    {" "}
                    <span className="font-weight-light">
                      You want to delete &nbsp;
                      <span className="font-weight-bold">
                        {CurrentRequestProfile.FirstName}{" "}
                        {CurrentRequestProfile.LastName}
                      </span>
                      &nbsp; ?
                    </span>
                    <div className="col text-center mt-4">
                      <Button
                        color="success"
                        onClick={() => DeleteMember(CurrentRequestProfile.Uid)}
                        className="ml-2 mr-2"
                        size="l"
                      >
                        Confirm
                      </Button>
                      <Button
                        color="danger"
                        size="l"
                        aria-label="Close"
                        onClick={() => setModalOpen4(!modalOpen4)}
                        className="ml-2 mr-2"
                      >
                        Cancel
                      </Button>
                    </div>{" "}
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen5(!modalOpen5)}
                  isOpen={modalOpen5}
                  size="lg"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen5(!modalOpen5)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    <Row>
                      {" "}
                      <Col className="order-xl-1">
                        <Card className="bg-secondary shadow margintop-card">
                          <CardHeader className="border-0">
                            <Row className="align-items-center">
                              <div className="col">
                                <h3 className="mb-0">Summary</h3>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">id</th>
                                <th scope="col" className="td-nonePadding">
                                  name
                                </th>
                                <th scope="col">quest completed</th>
                                <th scope="col">completed</th>
                                <th scope="col">absent</th>
                                <th scope="col" className="text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.keys(Summary).map((id) => {
                                return (
                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            {Summary[id].StudentID}
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td className="td-nonePadding">
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4 short-name"
                                      >
                                        {Summary[id].FirstName}{" "}
                                        {Summary[id].LastName}
                                      </Badge>
                                    </td>
                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        {(
                                          ((Summary[id].CompletedCount + Summary[id].LeaveCount) * 100) /
                                          Summary[id].AllQuestCount
                                        ).toFixed(0)}{" "}
                                        %
                                      </Badge>
                                    </td>
                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-success" />
                                        {Summary[id].CompletedCount}
                                      </Badge>
                                    </td>
                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-danger" />
                                        {Summary[id].AbsentCount}
                                      </Badge>
                                    </td>
                                    <td className="text-right threedot">
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          className="btn-icon-only text-light"
                                          role="button"
                                          size="sm"
                                          color=""
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu
                                          className="dropdown-menu-arrow"
                                          right
                                        >
                                          <DropdownItem
                                            onClick={() =>
                                              ProfileModalOpens(Summary[id])
                                            }
                                          >
                                            Profile
                                          </DropdownItem>
                                          <DropdownItem
                                            onClick={() =>
                                              ReportModalOpens(Summary[id])
                                            }
                                          >
                                            Report
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </Card>
                      </Col>
                      <Col>
                        <Card className="shadow">
                          <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                              <div className="col">
                                <h2 className="mb-0">Dashboard</h2>
                              </div>
                            </Row>
                          </CardHeader>
                          <CardBody>
                            <div className="chart">
                              <Line data={data} options={options} />
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen6(!modalOpen6)}
                  isOpen={modalOpen6}
                  size="lg"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen6(!modalOpen6)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    <Col className="order-xl-1">
                      <row>
                        <Card className="bg-secondary shadow">
                          <CardHeader className="border-0 width-card">
                            <Row className="align-items-center">
                              <div className="col">
                                <h3 className="mb-0">Quest Check</h3>
                              </div>
                              <div className="col text-right">
                                <h3>{SeeMoreDate}</h3>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">Quest</th>
                                <th scope="col">completed</th>
                                <th scope="col">absent/leave</th>
                                <th scope="col"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.keys(SeeMore).map((id) => {
                                return (
                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            Selfie with a{" "}
                                            {SeeMore[id].ObjectSelect}
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      {" "}
                                      <div>
                                        <Button
                                          color="success"
                                          outline
                                          type="button"
                                          id="toggler1"
                                          onClick={() =>
                                            seemorecomplete(SeeMore[id])
                                          }
                                        >
                                          {SeeMore[id].Complete.length}
                                        </Button>
                                      </div>
                                    </td>
                                    <td>
                                      <Button
                                        color="danger"
                                        outline
                                        type="button"
                                        id="toggler"
                                        onClick={() =>
                                          seemoreabsent(SeeMore[id])
                                        }
                                      >
                                        {SeeMore[id].Absent.length}
                                      </Button>
                                    </td>
                                    <td></td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </Card>
                      </row>
                      <UncontrolledCollapse toggler="#toggler1">
                        <Card className="bg-secondary shadow margintop-card">
                          <CardHeader className="border-0 width-card">
                            <Row className="align-items-center">
                              <div className="col">
                                <h3 className="mb-0">
                                  Selfie with a {SeeMoreCompleteObject}
                                </h3>
                              </div>
                              <div className="align-items-center">
                                <h4 className="col text-right text-success status-report">
                                  COMPLETED
                                </h4>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col" className="col text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.keys(SeeMoreComplete).map((id) => {
                                return (
                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            {SeeMoreComplete[id].StudentID}
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        <i className="bg-success" />
                                        {SeeMoreComplete[id].FirstName}{" "}
                                        {SeeMoreComplete[id].LastName}
                                      </Badge>
                                    </td>
                                    <td className="text-right threedot">
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          className="btn-icon-only text-light"
                                          role="button"
                                          size="sm"
                                          color=""
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu
                                          className="dropdown-menu-arrow"
                                          right
                                        >
                                          <DropdownItem
                                            onClick={() =>
                                              completeseemore(
                                                SeeMoreComplete[id], SeeMoreCompleteObject
                                              )
                                            }
                                          >
                                            See More
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                          {SeeMoreComplete.length == 0 ? (
                            <div className="no-request text-red">
                              There is no quest completed currently.
                            </div>
                          ) : null}
                        </Card>
                      </UncontrolledCollapse>

                      <UncontrolledCollapse toggler="#toggler">
                        <Card className="bg-secondary shadow margintop-card">
                          <CardHeader className="border-0">
                            <Row>
                              <div className="col">
                                <h3 className="mb-0">
                                  Selfie with a {SeeMoreCompleteObject}
                                </h3>
                              </div>
                              <div className="align-items-center">
                                <h4 className="col text-right text-danger status-report">
                                  ABSENT / LEAVE
                                </h4>
                              </div>
                            </Row>
                          </CardHeader>
                          <Table
                            className="align-items-center table-flush"
                            responsive
                          >
                            <thead className="thead-light">
                              <tr>
                                <th scope="col">id</th>
                                <th scope="col">name</th>
                                <th scope="col">status</th>
                                <th scope="col" className="col text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.keys(SeeMoreAbsent).map((id) => {
                                return (
                                  <tr>
                                    <th scope="row">
                                      <Media className="align-items-center">
                                        <Media>
                                          <span className="mb-0 text-sm">
                                            {SeeMoreAbsent[id].StudentID}
                                          </span>
                                        </Media>
                                      </Media>
                                    </th>

                                    <td>
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4 short-name2"
                                      >
                                        <i className="bg-danger" />
                                        {SeeMoreAbsent[id].FirstName}{" "}
                                        {SeeMoreAbsent[id].LastName}
                                      </Badge>
                                    </td>

                                    {SeeMoreAbsent[id].Leave == false ? (<td className="height-statusReport">
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        Absent
                                      </Badge>
                                    </td>) : null}

                                    {SeeMoreAbsent[id].Leave == false ? (<td className="text-right threedot">
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          className="btn-icon-only text-light"
                                          role="button"
                                          size="sm"
                                          color=""
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu
                                          className="dropdown-menu-arrow"
                                          right
                                        >
                                          <DropdownItem
                                            onClick={() => 
                                              leaveform(SeeMoreAbsent[id])
                                            }
                                          >
                                            Leave
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    </td>) : null}

                                    {SeeMoreAbsent[id].Leave == true ? (<td className="height-statusReport">
                                      <Badge
                                        color=""
                                        className="badge-dot mr-4"
                                      >
                                        Leave
                                      </Badge>
                                    </td>) : null}

                                    {SeeMoreAbsent[id].Leave == true && SeeMoreAbsent[id].Image != "" ? (<td className="text-right threedot">
                                      <UncontrolledDropdown>
                                        <DropdownToggle
                                          className="btn-icon-only text-light"
                                          role="button"
                                          size="sm"
                                          color=""
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <i className="fas fa-ellipsis-v" />
                                        </DropdownToggle>
                                        <DropdownMenu
                                          className="dropdown-menu-arrow"
                                          right
                                        >
                                          <DropdownItem
                                            onClick={() => 
                                              seeleaveform(SeeMoreAbsent[id].Image)
                                            }
                                          >
                                            See Leave form
                                          </DropdownItem>
                                        </DropdownMenu>
                                      </UncontrolledDropdown>
                                    </td>) : null}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                          {SeeMoreAbsent.length == 0 ? (
                            <div className="no-request text-red">
                              There is no quest missed currently.
                            </div>
                          ) : null}
                        </Card>
                      </UncontrolledCollapse>
                      <row></row>
                    </Col>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen7(!modalOpen7)}
                  isOpen={modalOpen7}
                  size="md"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen7(!modalOpen7)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>777</ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen8(!modalOpen8)}
                  isOpen={modalOpen8}
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen8(!modalOpen8)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>8888</ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen12(!modalOpen12)}
                  isOpen={modalOpen12}
                  size="sm"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen12(!modalOpen12)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    {" "}
                    <div className="text-center">
                      {" "}
                      <h2 className="upload-leave-form">
                        Please upload leave form
                      </h2>
                      {UploadLeaveFormImageURL == "" ? (<img
                        src={
                          require("../../assets/img/theme/img-upload.png")
                            .default
                        }
                        className="img-fluid shadow-4 img-upload"
                        alt="..."
                      />) : null}
                      <br/>
                      <img src={UploadLeaveFormImageURL} style={{width: "100%"}} className="shadow-imgLeave"/>
                    </div>
                    <div class="upload-btn-wrapper text-center">
                      <button class="btn-uploadFile">Upload File</button>
                      <input type="file" name="myfile" onChange={(e) => leaveformuploadfile(e.target.value, e.target.files[0])}/>
                    </div>
                    {!UploadLeaveFormImageURL == "" ? (<button class="btn-uploadFile" onClick={() => submitleaveform("withfile")}>Submit with file</button>) : null}
                    <div className="box mt-3">
                      <div className="line"></div>
                      <div className="lightGray-textSize or">OR</div>
                      <div className="line"></div>
                    </div>
                    <div>
                      <button class="btn-uploadFile2" onClick={() => submitleaveform("withoutfile")}>Submit without file</button>
                    </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen13(!modalOpen13)}
                  isOpen={modalOpen13}
                  size="sm"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen13(!modalOpen13)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    {" "}
                    <div className="text-center">
                      {" "}
                      <h2 className="heading-leaveForm">Leave form</h2>
                      <img
                        src={LeaveFormImage}
                        className="img-fluid shadow-4 img-leaveForm shadow-imgLeave"
                        alt="..."
                      />
                    </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen14(!modalOpen14)}
                  isOpen={modalOpen14}
                  size="lg"
                >
                  <div className=" modal-header">
                    <button
                      aria-label="Close"
                      className=" close"
                      type="button"
                      onClick={() => setModalOpen14(!modalOpen14)}
                    >
                      <span aria-hidden={true}>×</span>
                    </button>
                  </div>
                  <ModalBody>
                    <Row>
                      {" "}
                      <Col>
                        <Card className="shadow">
                          <CardHeader className="bg-transparent">
                            <Row className="align-items-center">
                              <div className="col">
                                <h2 className="mb-0">Create Quest</h2>
                              </div>
                            </Row>
                          </CardHeader>
                          <CardBody className="createQuest">
                            <Row className="align-items-center mb-4">
                              <Col className="col-selectQuest">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Object
                                  <span className="text-red">*</span>
                                  &nbsp;
                                  <span className="text-red">
                                    {ObjectSelectError}
                                  </span>
                                </label>
                                <Input
                                  type="select"
                                  placeholder="Department"
                                  style={{
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                  }}
                                  className="select-quest"
                                  onChange={(event) =>
                                    setObjectSelect(event.target.value)
                                  }
                                >
                                  <option value="" disabled selected hidden>
                                    Select Object
                                  </option>
                                  <option value="cup">cup</option>
                                  <option value="bottle">bottle</option>
                                  <option value="toothbrush">toothbrush</option>
                                  <option value="fork">fork</option>
                                  <option value="spoon">spoon</option>
                                  <option value="bowl">bowl</option>
                                  <option value="cellphone">cellphone</option>
                                  <option value="scissors">scissors</option>
                                </Input>
                              </Col>
                              &nbsp;
                              <Col className="col-selectQuest">
                                <label
                                  className="form-control-label"
                                  htmlFor="input-username"
                                >
                                  Countdown Time
                                  <span className="text-red">*</span>
                                  &nbsp;
                                  <span className="text-red">
                                    {CountdownTimeError}
                                  </span>
                                </label>
                                <Input
                                  type="select"
                                  placeholder="Department"
                                  style={{
                                    textAlignVertical: "center",
                                    textAlign: "center",
                                  }}
                                  className="select-quest2"
                                  onChange={(event) =>
                                    setCountdownTime(event.target.value)
                                  }
                                >
                                  <option value="" disabled selected hidden>
                                    Countdown Time
                                  </option>
                                  <option value="5">5 minute</option>
                                  <option value="10">10 minute</option>
                                  <option value="15">15 minute</option>
                                  <option value="20">20 minute</option>
                                  <option value="25">25 minute</option>
                                  <option value="30">30 minute</option>
                                </Input>
                              </Col>
                            </Row>
                            <Row>
                              <div
                                className="box"
                                style={{
                                  height: "480px",
                                  width: "640px",
                                  position: "relative",
                                  overflow: "auto",
                                  padding: "0",
                                  background: "lightgrey",
                                }}
                              >
                                <div
                                  style={{
                                    height: "480px",
                                    width: "640px",
                                    padding: "10px",
                                  }}
                                >
                                  <Draggable
                                    bounds="parent"
                                    onDrag={(e, data) => FacetrackPos(data)}
                                    defaultPosition={{ x: 55, y: 140 }}
                                  >
                                    <div
                                      style={{
                                        height: "200px",
                                        width: "200px",
                                        position: "absolute",
                                        cursor: "move",
                                        color: "black",
                                        borderRadius: "5px",
                                        margin: "auto",
                                        userSelect: "none",
                                        background: "white",
                                      }}
                                      className="box-position"
                                    >
                                      Face x : {FaceBoxposition.x.toFixed(0)}, y :{" "}
                                      {FaceBoxposition.y.toFixed(0)}
                                    </div>
                                  </Draggable>
                                  <Draggable
                                    bounds="parent"
                                    onDrag={(e, data) => ObjecttrackPos(data)}
                                    defaultPosition={{ x: 370, y: 140 }}
                                  >
                                    <div
                                      style={{
                                        height: "200px",
                                        width: "200px",
                                        position: "absolute",
                                        cursor: "move",
                                        color: "black",
                                        borderRadius: "5px",
                                        margin: "auto",
                                        userSelect: "none",
                                        background: "white",
                                      }}
                                      className="box-position"
                                    >
                                      Object x : {ObjectBoxposition.x.toFixed(0)}
                                      , y : {ObjectBoxposition.y.toFixed(0)}
                                    </div>
                                  </Draggable>
                                </div>
                              </div>
                            </Row>
                            <Row>
                              <Button
                                className="mt-4 buttonStyle btn-create"
                                color="dark"
                                type="button"
                                onClick={(e) => SendQuest()}
                              >
                                SEND QUEST
                              </Button>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen15(!modalOpen15)}
                  isOpen={modalOpen15}
                  size="sm"
                >
                  <div className=" modal-header"></div>
                  <ModalBody className="question-box">
                    {" "}
                    <span className="font-weight-bold confirm-leaveRoom text-center ">
                      Do you want to cancel this quest ?
                    </span>
                    <div className="col text-center mt-4">
                      <Button
                        color="success"
                        // onClick={() => leaveclassroom()}
                        className="ml-2 mr-2 btn-confirm-leaveRoom"
                        size="l"
                        onClick={() => cancelquest()}
                      >
                        Confirm
                      </Button>
                      <Button
                        color="danger"
                        size="l"
                        aria-label="Close"
                        onClick={() => setModalOpen15(!modalOpen15)}
                        className="ml-2 mr-2 btn-confirm-leaveRoom"
                      >
                        Cancel
                      </Button>
                    </div>{" "}
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
                <Modal
                  toggle={() => setModalOpen16(!modalOpen16)}
                  isOpen={modalOpen16}
                  size="sm"
                >
                  <div className=" modal-header"></div>
                  <ModalBody className="question-box">
                    {" "}
                    <span className="font-weight-bold confirm-leaveRoom text-center ">
                      Do you want to end this quest ?
                    </span>
                    <div className="col text-center mt-4">
                      <Button
                        color="success"
                        className="ml-2 mr-2 btn-confirm-leaveRoom"
                        size="l"
                        onClick={() => endquest()}
                      >
                        Confirm
                      </Button>
                      <Button
                        color="danger"
                        size="l"
                        aria-label="Close"
                        onClick={() => setModalOpen16(!modalOpen16)}
                        className="ml-2 mr-2 btn-confirm-leaveRoom"
                      >
                        Cancel
                      </Button>
                    </div>{" "}
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </Modal>
              </Row>

              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4 header-createQuest">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-3">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats card-quest d-flex justify-content-center mt-md-5"></div>
                  </div>
                </Row>
                <div className="text-center">
                  <h1>QUEST CHECK</h1>
                  <div className="h5 font-weight-300">
                    <h2 className="date-profile">{date}</h2>
                  </div>
                  <div className="text-center">
                    {NotOnQuest ? (
                      <Button
                        className="mt-3"
                        color="dark"
                        type="button"
                        onClick={() => setModalOpen14(!modalOpen14)}
                      >
                        CREATE QUEST
                      </Button>
                    ) : null}
                    {OnQuest ? (
                      <div>
                        <p>Object : {CurrentQuest.ObjectSelect}</p>
                        <p>
                          Countdown Time: {CurrentQuest.CountdownTime} Minute
                        </p>
                        {/* <p className="mt-5">Start: {StartTime}</p> */}
                        {/* <p>End: {EndTime}</p> */}
                        <h3 className="text-red mt-5">
                          Remaining Time: {Countdown} Minute
                        </h3>
                        <p className="text-red">End: {EndTime}</p>
                        <Button
                          className="mt-3"
                          color="dark"
                          type="button"
                          onClick={() => setModalOpen16(!modalOpen16)}
                        >
                          END QUEST
                        </Button>
                        <Button
                          className="mt-3"
                          color="dark"
                          type="button"
                          onClick={() => setModalOpen15(!modalOpen15)}
                        >
                          CANCEL QUEST
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1 mg-b20 margin-b" xl="4">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Member</h3>
                  </div>
                  <Row className="text-right">
                    <Col className="padding0">
                      <Button
                        color="dark"
                        onClick={() => setModalOpen(!modalOpen)}
                        size="sm"
                      >
                        Invite
                      </Button>
                    </Col>
                    <Col className="box-request">
                      <Button
                        color="dark"
                        onClick={() => setModalOpen1(!modalOpen1)}
                        size="sm"
                        className="request-btn"
                      >
                        Request
                      </Button>
                      <div className="box-redNoti">
                        {RequestNoti ? (
                          <div className="circle-noti"></div>
                        ) : null}
                      </div>
                    </Col>
                  </Row>
                </Row>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col" className="td-nonePadding">
                      name
                    </th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(Members).map((id) => {
                    return (
                      <tr>
                        <th scope="row">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {Members[id].StudentID}
                              </span>
                            </Media>
                          </Media>
                        </th>

                        <td className="td-nonePadding hightBox-profile">
                          <Badge
                            color=""
                            className="badge-dot mr-4  short-name"
                          >
                            {Members[id].FirstName} {Members[id].LastName}
                          </Badge>
                        </td>
                        <td className="text-right threedot">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                onClick={() => ProfileModalOpens(Members[id])}
                              >
                                Profile
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => ReportModalOpens(Members[id])}
                              >
                                Report
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => DeleteModalOpens(Members[id])}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {Members.length == 0 ? (
                <div className="no-request text-red">No member recently</div>
              ) : null}
            </Card>
          </Col>
          <Col className="order-xl-1" xl="5">
            <Card className="bg-secondary shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Attendence</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="dark"
                      onClick={() => setModalOpen5(!modalOpen5)}
                      size="sm"
                    >
                      Dashboard
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col" className="td-nonePadding4">
                      Date
                    </th>
                    <th scope="col" className="td-nonePadding2">
                      completed
                    </th>
                    <th scope="col" className="td-nonePadding3">
                      absent/leave
                    </th>
                    <th scope="col" className="td-nonePadding5" />
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(AllQuestAndMember).map((id) => {
                    return (
                      <tr className="hightBox-profile">
                        <th scope="row" className="td-nonePadding4">
                          <Media className="align-items-center">
                            <Media>
                              <span className="mb-0 text-sm">
                                {AllQuestAndMember[id].Date}
                              </span>
                            </Media>
                          </Media>
                        </th>

                        <td className="td-nonePadding2">
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                            {AllQuestAndMember[id].Complete.length}
                          </Badge>
                        </td>
                        {AllQuestAndMember[id].EndTimeStamp < Date.now() ? (
                          <td className="td-nonePadding3">
                            <Badge color="" className="badge-dot mr-4">
                              <i className="bg-danger" />
                              {AllQuestAndMember[id].Absent.length}
                            </Badge>
                          </td>
                        ) : null}

                        {AllQuestAndMember[id].EndTimeStamp >= Date.now() ? (
                          <td className="td-nonePadding3">
                            <Badge color="" className="badge-dot mr-4"></Badge>
                          </td>
                        ) : null}

                        {AllQuestAndMember[id].EndTimeStamp < Date.now() ? (
                          <td className="td-nonePadding5">
                            <div className="d-flex align-items-right">
                              <Button
                                color="dark"
                                type="button"
                                onClick={() =>
                                  seemore(AllQuestAndMember[id].Date)
                                }
                                className="btn-seeMore-attendence"
                              >
                                See More
                              </Button>
                            </div>
                          </td>
                        ) : null}

                        {AllQuestAndMember[id].EndTimeStamp >= Date.now() ? (
                          <td className="td-nonePadding5">
                            <div className="d-flex align-items-right">
                              On going...
                            </div>
                          </td>
                        ) : null}
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              {AllQuestAndMember.length == 0 ? (
                <div className="no-request text-red">No quest recently</div>
              ) : null}
            </Card>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </>
  );
};

export default Profile;
