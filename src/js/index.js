function init() {
  function getTime() {
    const currentTime = new Date();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();
    const second = currentTime.getSeconds();
    const showTime = document.querySelector("h1");
    showTime.innerText = `${hour < 10 ? `0${hour}` : hour} : ${
      minute < 10 ? `0${minute}` : minute
    } : ${second < 10 ? `0${second}` : second} `;
  }

  //reset

  const btnReset = document.querySelector(".btn_reset");
  btnReset.addEventListener("click", () => {
    localStorage.clear();
    askName.classList.remove("off");
    showName.classList.add("off");
  });

  //name

  const currentName = "username";
  const userName = document.querySelector(".username");
  const askName = document.querySelector(".askname");
  const showName = document.querySelector(".showname");
  const cntName = document.querySelector(".cnt_name");
  const nameData = localStorage.getItem(currentName);

  function loadName() {
    if (nameData !== null) {
      askName.classList.add("off");
      userName.innerHTML = nameData;
    } else {
      askName.classList.remove("off");
      showName.classList.add("off");
    }
  }

  function getName() {
    const nameForm = document.querySelector(".nameform");
    const inputName = document.querySelector(".name");
    // const nameSubmit = document.querySelector(".namesubmit");

    nameForm.addEventListener("submit", () => {
      const nameValue = inputName.value;
      cntName.appendChild(askName);

      function saveName() {
        localStorage.clear();
        localStorage.setItem(currentName, nameValue);
      }

      saveName();
      inputName.value = "";
      userName.innerHTML = nameValue;

      askName.classList.add("off");
      showName.classList.remove("off");

      console.log(nameValue);
    });
  }

  //weather
  const weatherInfo = "weatherinfo";
  const apiKey = "3a0744433a81219ac1c1b35e44c4b7b3";
  const curWeather = document.querySelector(".cur_weather");

  function getLocation(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric
`)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;
        curWeather.innerHTML = `${temperature} at${place}`;
      });
  }

  function savePlace(currentPlace) {
    localStorage.setItem(weatherInfo, JSON.stringify(currentPlace));
  }

  function successPlace(place) {
    console.log(place.coords);
    const latitude = place.coords.latitude;
    const longitude = place.coords.longitude;
    const currentPlace = {
      latitude,
      longitude
    };
    savePlace(currentPlace);
    getLocation(latitude, longitude);
  }

  function failPlace() {
    console.log("fail");
  }

  function getPlace() {
    navigator.geolocation.getCurrentPosition(successPlace, failPlace);
  }

  function seeWeather() {
    const btnWeather = document.querySelector(".seeweather");
    btnWeather.addEventListener("click", getPlace);
  }
  //img
  const body = document.querySelector("body");
  const imgArray = [
    "https://cdn.pixabay.com/photo/2015/03/30/12/37/jellyfish-698521_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/05/01/beach-1867436_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/11/07/11/17/golden-gate-bridge-1030999_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/07/29/12/07/hot-air-balloon-865817_1280.jpg"
  ];

  function bgChange() {
    const image = new Image();
    const imgNum = imgArray.length - 1;
    let idx = Math.floor(Math.random() * imgNum);
    image.src = imgArray[idx];
    image.classList.add("abs");
    body.appendChild(image);
  }

  //todo
  // localStorage.clear();
  const taskForm = document.querySelector(".taskform");
  const inputTask = document.querySelector(".task");
  const taskList = document.querySelector(".tasklist");
  // const finishList = document.querySelector(".finishlist");

  const TASK = "Tasklist";
  let taskArray = [];
  const FIN = "Finished";
  // let finArray = [];

  function saveTask() {
    localStorage.setItem(TASK, JSON.stringify(taskArray));
  }

  taskForm.addEventListener("submit", submitTask);

  function submitTask(e) {
    let taskValue = inputTask.value;
    addTask(TASK, taskValue, null);
    inputTask.value = "";
    e.preventDefault();
  }

  // function saveFin() {
  //   localStorage.setItem(FIN, JSON.stringify(finArray));
  // }

  function loadTask() {
    const getTask = localStorage.getItem(TASK);

    if (getTask !== null) {
      const taskString = JSON.parse(getTask);
      taskString.forEach(function (todo) {
        addTask(todo.id, todo.text);
      });
    }
  }

  function deleteE(event) {
    const btn = event.target;
    const li = btn.parentNode;
    taskList.removeChild(li);
    const cleanE = taskArray.filter(function (taskObj) {
      return taskObj.id !== li.id;
    });
    taskArray = cleanE;
    saveTask();
  }

  let idNumbers = 1;

  function addTask(listString, text, id) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const taskId = idNumbers;

    idNumbers += 1;
    li.id = taskId;

    taskList.appendChild(li);

    li.appendChild(span);
    span.innerText = text;

    const makeDel = document.createElement("button");
    const makeFin = document.createElement("button");

    li.appendChild(makeDel);
    li.appendChild(makeFin);
    makeFin.classList.add("finbtn");
    makeDel.classList.add("delbtn");

    makeFin.innerText = "✅";
    makeDel.innerText = "❌";

    const delBtn = document.querySelectorAll(".delbtn");
    delBtn.forEach(function (del) {
      del.addEventListener("click", deleteE);
    });
    const taskObj = {
      text,
      id: li.id
    };
    // taskArray.push
    taskArray.push(taskObj);
    saveTask();
  }

  getTime();
  setInterval(getTime, 1000);
  getName();
  seeWeather();
  bgChange();
  loadName();
  loadTask();
}
init();






// $(function () {

    


        

   
    

        
    
    
//     // top

// //    $(window).scroll(function () {
// //        var sc = $(this).scrollTop();
// //        if (sc > 150) {
// //            $("nav").addClass("fixed");
// //        } else {
// //            $("nav").removeClass("fixed");
// //        }
// //        if (sc < 4300) {
// //            $("header .gnb").addClass("nav1");
// //            $("header .gnb").removeClass("nav2");
// //        }
// //
// //        if (sc > 4400) {
// //            $("header .gnb").addClass("nav2");
// //        }
// //    });
// //    
    

    
//     $(window).scroll(function () {
//         var sc = $(this).scrollTop();
//         var scrollH1 = $('.event01-1').offset().top - 100;
//         var scrollH2 = $('.event02-1').offset().top ;
//         var w = $(window).width();
//              $("header .gnb").removeClass("nav3");

        

//             if (sc > 150) {
//             $("nav").addClass("fixed");
//             $(".gnb2").addClass("on");
//             $(".main-kv").addClass("gap");
                    
    
//         }else {
//             $("nav").removeClass("fixed");
//              $(".gnb2").removeClass("on");
//               $(".main-kv").removeClass("gap");
//         }
        
        
//         if ($(document).scrollTop() < scrollH1) {
//             $("header .gnb").addClass("nav00");
//               $("header .gnb").removeClass("nav0");
//               $("header .gnb").removeClass("nav2");
//               $("header .gnb").removeClass("nav1");
    
//         }
//              if ($(document).scrollTop() > scrollH1) {
//             $("header .gnb").addClass("nav1");
//             $("header .gnb").removeClass("nav2");
//         }
        
//              if ($(document).scrollTop() > scrollH2) {
//             $("header .gnb").addClass("nav2");
//         }
        
    
        
      
//     });
   
    
    
    
    
    
    
    


//     //check
//     $('#chkbox1, #chkbox3, #chkbox5').click(function () {
//         $("input[id=chkbox2]:checkbox").prop("checked", false);
//         $("input[id=chkbox4]:checkbox").prop("checked", false);
//         $("input[id=chkbox6]:checkbox").prop("checked", false);
//     });
//     $('#chkbox2, #chkbox4, #chkbox6').click(function () {
//         $("input[id=chkbox1]:checkbox").prop("checked", false);
//         $("input[id=chkbox3]:checkbox").prop("checked", false);
//         $("input[id=chkbox5]:checkbox").prop("checked", false);
//     });


//     // alert

//     $(".e2-pop .pop1 .next").click(function () {
//         if ($("#chkbox1").is(":checked")) {
//             alert("첫 번째 체크 리스트 확인 OK!");
//         } else {
//             alert("다시 한번 생각해보세요!");
//             return ture;
//         }
//     });


//     $(".e2-pop .pop2 .next").click(function () {
//         if ($("#chkbox4").is(":checked")) {
//             alert("두 번째 체크 리스트 확인 OK!");
//         } else {
//             alert("다시 한번 생각해보세요!");
//             return ture;
//         }
//     });



//     $(".e2-pop .pop3 .okay").click(function () {
//         if ($("#chkbox5").is(":checked")) {
//             alert("모든 체크 리스트 확인 완료!");
//         } else {
//             alert("다시 한번 생각해보세요!");
//             return ture;
//         }
//     });


//     //alert-info 




//     $(".phone-number-check, .phone-number-check0").on('keydown', function (e) {
//         // 숫자만 입력받기
//         var trans_num = $(this).val().replace(/-/gi, '');
//         var k = e.keyCode;

//         if (trans_num.length >= 11 && ((k >= 48 && k <= 126) || (k >= 12592 && k <= 12687 || k == 32 || k == 229 || (k >= 45032 && k <= 55203)))) {
//             e.preventDefault();
//         }
//     }).on('blur', function () { // 포커스를 잃었을때 실행합니다.
//         if ($(this).val() == '') return;

//         // 기존 번호에서 - 를 삭제합니다.
//         var trans_num = $(this).val().replace(/-/gi, '');

//         // 입력값이 있을때만 실행합니다.
//         if (trans_num != null && trans_num != '') {
//             // 총 핸드폰 자리수는 11글자이거나, 10자여야 합니다.
//             if (trans_num.length == 11 || trans_num.length == 10) {
//                 // 유효성 체크
//                 var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
//                 if (regExp_ctn.test(trans_num)) {
//                     // 유효성 체크에 성공하면 하이픈을 넣고 값을 바꿔줍니다.
//                     trans_num = trans_num.replace(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
//                     $(this).val(trans_num);
//                 } else {
//                     alert("연락처를 확인해주세요");
//                     $(this).val("");
//                     $(this).focus();
//                 }
//             } else {
//                 alert("연락처를 확인해주세요");
//                 $(this).val("");
//                 $(this).focus();
//             }
//         } else {
//             alert("연락처를 확인해주세요");
//         }
//     });



//     //nav


//     $('.evt01').on('click', function () {
        
//               var w = $(window).width();
//            var navH = $(".gnb").height();
        

        
//         if ( w< 719){
            
                         
            
            
//             $('html, body').animate({
//             scrollTop: $(".event01-1").offset().top - navH
//         }, 500);

//             }
        
        
//         else{
//                    $('html, body').animate({
//             scrollTop: $(".event01-1").offset().top - 80
//         }, 500);
//         $("header .gnb").addClass("nav1");
//         $("header .gnb").removeClass("nav2");
//         $("header .gnb").removeClass("nav3"); 
//         }
        
        
        
        
        

//     });
//     $('.evt02').on('click', function () {
//         $('html, body').animate({
//             scrollTop: $(".event02-1").offset().top + 10
//         }, 500);

//         $("header .gnb").addClass("nav2");
//         $("header .gnb").removeClass("nav1");
//     });

//     $('.evt03').on('click', function () {

//           $("header .gnb").addClass("nav3");
//         $("header .gnb").removeClass("nav2");

//     });

//     // main 


//     $(".main-kv .add .open").click(function () {
//         $("#pop-wrap").addClass("on");
//         $("body").addClass("over");
//         $(".pop-kv").addClass("on");

//     });

//     $(".main-kv .close").click(function () {
//         $(".main-kv .add").hide();
//         $("body").removeClass("over");
//     });

//     $(".exit").click(function () {
//         $("#pop-wrap").removeClass("on");
//         $(".pop-kv").removeClass("on");
//         $("body").removeClass("over");
//     });



//     //하나만 선택, 체크박스





//     // on



//     $(".ok1").on("click", function () {

//         $(".ok1").addClass("click-ok");


//     });

//     $(".ok2").on("click", function () {

//         $(".ok2").addClass("click-ok");

//     });

//     $(".ok3").on("click", function () {

//         $(".ok3").addClass("click-ok");

//     });

//     $(".ok4").on("click", function () {

//         $(".ok4").addClass("click-ok");


//     });
//     $(".ok li").on("click", function () {

//         if ($(".ok li.click-ok").length >= 8) {
//             window.setTimeout(function () {
//                 $(".e1-pop  .pop1").removeClass("on");
//                 $(".e1-pop  .pop2").addClass("on");
//             }, 500);
//         }

//     });




//     //close


//     $(".exit").click(function () {
//         $(".pop1, .pop2, .pop3, .pop-info, .pop-last").removeClass("on");

//     });


//     // event01



//     $(".event01-1 .join").click(function () {
//         $("#pop-wrap").addClass("on");
//         $("body").addClass("over");
//         $(".e1-pop .pop1").addClass("on");
//         $(".ok li").removeClass("click-ok");

//     });



//     $(".e1-pop .pop2 .join2").click(function () {
//         $(".e1-pop .pop-info").addClass("on");
//         $(".e1-pop .pop2").removeClass("on");

//     });

//     $(".e1-pop .pop-info .okay").click(function () {

//         if ($(".name-check0").val() == '') {
//             alert("정보를 입력해주세요!");
//         } else if ($(".phone-number-check0").val() == '') {
//             alert("정보를 입력해주세요!");

//         } else if ($(".map-check0").val() == '') {
//             alert("정보를 입력해주세요!");

//         } else if (!$("#chkbox0").is(":checked")) {

//             alert("개인 정보 취급/이용 약관에 동의해주세요");

//         } else {
//             alert("참여가 완료되었습니다");
//             $(".e1-pop .pop-last").addClass("on");
//             $(".e1-pop  .pop-info").removeClass("on");
//         }









//     });
//     $(" .pop-last .okay").click(function () {
//         $(" .pop-last").removeClass("on");
//         $("#pop-wrap").removeClass("on");
//               $("body").removeClass("over");
//     });

//     // event02
//     $(".event02-1 .join").click(function () {
//         $("body").addClass("over");
//         $("#pop-wrap").addClass("on");
//         $(".e2-pop .pop1").addClass("on");
//     });

//     $(".e2-pop .pop1 .next").click(function () {
//         $(".e2-pop .pop2").addClass("on");
//         $(".e2-pop .pop1").removeClass("on");
//     });

//     $(".e2-pop .pop2 .next").click(function () {
//         $(".e2-pop .pop3").addClass("on");
//         $(".e2-pop .pop2").removeClass("on");
//     });

//     $(".e2-pop .pop3 .okay").click(function () {
//         $(".e2-pop .pop-info").addClass("on");
//         $(".e2-pop .pop3").removeClass("on");
//     });


//     $(".e2-pop .pop-info .okay").click(function () {

//         if ($(".name-check").val() == '') {
//             alert("정보를 입력해주세요!");
//         } else if ($(".phone-number-check").val() == '') {
//             alert("정보를 입력해주세요!");

//         } else if ($(".map-check").val() == '') {
//             alert("정보를 입력해주세요!");

//         } else if (!$("#chkbox").is(":checked")) {

//             alert("개인 정보 취급/이용 약관에 동의해주세요");

//         } else {
//             alert("참여가 완료되었습니다");
//             $(".e2-pop .pop-last").addClass("on");
//             $(".e2-pop  .pop-info").removeClass("on");
//         }









//     });





//     $(".e2-pop .pop-last .okay").click(function () {
//         $(".e2-pop .pop-last").removeClass("on");



//     });

//     $(".pop1, .pop2, .pop3, .pop-info, .pop-last").removeClass("on");









// });
