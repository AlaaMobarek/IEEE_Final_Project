

function SetCookie(name, value, expireInHours) {
    const date = new Date();
    date.setTime(date.getTime() + (expireInHours * 60 * 60 * 1000)); // Add hours to the current time
    const expires = date.toUTCString(); // Convert to UTC string
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(cookieName) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
            return decodeURIComponent(value);
        }
    }
    return null;
}
//            LOGIN
function LogIn(form){
    let Error_msg= document.getElementById("error1");

    let email= form.querySelector("#txt-input").value;
    let password= form.querySelector("#pwd").value;
    axios.post("https://1a96-102-44-90-152.ngrok-free.app/auth/login",{
        email: email,
        password: password
    },{
        "headers": {
            "ngrok-skip-browser-warning": "true"
        }
    
    })
    .then((response)=>{
        let data = response.data;
        
            Error_msg.textContent="";
            let user= JSON.stringify(data.user);
            SetCookie("user",user,1);
            if(user.role == "patient")
                window.location.href="/uprofile.html";
            else if(user.role == "doctor")
                window.location.href="/Doctor.html";
            else
                window.location.href="/Admin.html";

    })
    .catch((error)=>{
        Error_msg.textContent= JSON.stringify(error.message).replaceAll('"','');
        
    })
    
}

function SignUp(form){
    let Error_msg= document.getElementById("error2");
    let name = form.querySelector("#txt-name").value;
    let phone = form.querySelector("#phone").value;
    let email = form.querySelector("#txt-email").value;
    let password = form.querySelector("#pwd").value;
    let gender = form.querySelector("input[name=Gender]:checked").value;
    let age = form.querySelector("#age").value;
    let birth_date = form.querySelector("#date").value;
    axios.post("https://1a96-102-44-90-152.ngrok-free.app/auth/signup",{
        name: name,
        email: email,
        password: password,
        phone: phone,
        birthDate: birth_date,
        age: age,
        role: "patient",
        gender: gender,
        disease: ["Flu"],

    },{
        "headers": {
            "ngrok-skip-browser-warning": "true"
        }
    
    })
    .then((response)=>{

            Error_msg.textContent="";
            window.location.href="/login.html";

    })
    .catch((error)=>{
            Error_msg.textContent=error.response.data.message;
        
    })
}
function GetUserId(){
    return getCookie("user") ? (JSON.parse(getCookie("user")))._id : null;
}
let get_user_data = () => {
    axios.get("https://1a96-102-44-90-152.ngrok-free.app/admin/getPatientById",{
        headers: {
            "ngrok-skip-browser-warning": "true",
            "user-id": "67cc3639cd7a5c21d5466129",
        },
        data:{
            patientId : "67cc85c5655469223ad62c87",
            adminId: "67cc3639cd7a5c21d5466129",
        },
    })
    .then((response)=>{
            let user = response.data;
            // console.log(user);
            return user;
    })
    .catch((error)=>{
            console.log(error.message);
            return getCookie("user") ? JSON.parse(getCookie("user")) : null;
    })
}

function LogOut(){
    if(getCookie("user")){
        SetCookie("user","",0);
    }
    axios.post("https://1a96-102-44-90-152.ngrok-free.app/auth/logout",
       { headers: {
            "ngrok-skip-browser-warning": "true"
        }})
    .then((response) => {
        if(window.location.href != "/login.html") window.location.href = "/login.html";
    })
    .catch((error) => {
        console.log(error.response.data);
    })
}

// update profile
function updateProfile(form) {
    let errorMsg = document.getElementById("error1");

    let name = form.querySelector("#txt-name").value;
    let phone = form.querySelector("#phone").value;
    let email = form.querySelector("#txt-email").value;
    let password = form.querySelector("#pwd").value;
    let age = form.querySelector("#age").value;
    let birth_date = form.querySelector("#date").value;
    let profile = {
        name: name,
        email: email,
        phone: phone,
        birthDate: birth_date,
        age: age,
    };
    if(password){
        profile.password = password;
    }


    axios.put("https://1a96-102-44-90-152.ngrok-free.app/patient/update-profile", {
        profile: profile
    }, {
        params:{
            userId: (JSON.parse(getCookie("user")))._id,
        },
        headers: {
            "ngrok-skip-browser-warning": "true"
        }
    })
    .then((response) => {
        let data = response.data;
        errorMsg.textContent = "";  // Clear any previous errors
        window.location.href = "/uprofile.html";
    })
    .catch((error) => {
        errorMsg.textContent = JSON.stringify(error.response.data).replaceAll('"', '');
    });
}

// Get User Data
function GetDoctors(){
    let table = document.getElementById("doctors_table");
    table.innerHTML = `<tr>
                <th>Doctor's Name</th>
                <th>Phone Number</th>
            </tr>`;
    axios.get("https://1a96-102-44-90-152.ngrok-free.app/patient/doctors", {
    params: {
        userId: "67cc85c5655469223ad62c87"
    },
    headers: {
        "ngrok-skip-browser-warning": "true"
    }})
    .then((response) => {
        let doctors = response.data;
        console.log(doctors);
        doctors.forEach(doctor => {
            table.innerHTML += `<tr>
            <td>${doctor.name}</td>
            <td>${doctor.phone}</td>
            </tr>`;
        });
    })
    .catch((error) => {
        console.log(error.response.data);
    });
}



