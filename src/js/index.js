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
  const finishList = document.querySelector(".finishlist");

  const TASK = "Tasklist";
  let taskArray = [];
  const FIN = "Finished";
  let finArray = [];

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

  function saveFin() {
    localStorage.setItem(FIN, JSON.stringify(finArray));
  }

  function loadTask() {
    const getTask = localStorage.getItem(TASK);
    const getFin = localStorage.getItem(FIN);

    if (getTask !== null) {
      const taskString = JSON.parse(getTask);
      taskString.forEach(function (todo) {
        addTask(todo.id, todo.text);
      });
    }
    if (getFin !== null) {
      const FinString = JSON.parse(getFin);
      FinString.forEach(function (td) {
        addFin(td.id, td.text);
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

  function prevE(event) {
    const btn = event.target;
    const li = btn.parentNode;
    taskList.appendChild(li);

    const cleanF = finArray.filter(function (finishObj) {
      return finishObj.id !== li.id;
    });
    finArray = cleanF;
    saveFin();
  }

  function doneE() {}

  function addFin(listString, text, id) {
    // const li = document.createElement("li");
    // const span = document.createElement("span");
    // const taskId = idNumbers;
    const li = document.querySelector("li");
    // idNumbers += 1;
    // li.id = taskId;

    finishList.appendChild(li);

    const finishObj = {
      text,
      id: li.id
    };
    finArray.push(finishObj);
    saveFin();

    const makePrev = document.createElement("button");
    const makeDone = document.createElement("button");

    li.appendChild(makePrev);
    li.appendChild(makeDone);

    makePrev.classList.add("prevbtn");
    makeDone.classList.add("donebtn");

    makePrev.innerText = "⏪";
    makeDone.innerText = "⭕";

    const prevBtn = document.querySelectorAll(".prevbtn");
    prevBtn.forEach(function (prev) {
      prev.addEventListener("click", prevE);
    });

    const doneBtn = document.querySelectorAll(".donebtn");
    doneBtn.forEach(function (done) {
      done.addEventListener("click", doneE);
    });
  }

  function finishE(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishList.appendChild(li);

    const cleanF = finArray.filter(function (taskObj) {
      return taskObj.id !== li.id;
    });
    finArray = cleanF;
    addFin();
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

    const finBtn = document.querySelectorAll(".finbtn");
    finBtn.forEach(function (fin) {
      fin.addEventListener("click", finishE);
    });

    const taskObj = {
      text,
      id: li.id
    };
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
