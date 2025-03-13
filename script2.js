document.addEventListener("DOMContentLoaded", function() {
    loadDoctors();
    loadPatients();
});

function loadDoctors() {
    fetch('https://643e-197-58-104-183.ngrok-free.app/admin/getAllDoctors')
    .then(response => response.json())
    .then(data => {
        let table = document.getElementById("doctorsTable");
        table.innerHTML = "<tr><th>Name</th><th>Email</th><th>Photo</th><th>Phone</th><th>Retire</th></tr>";

        data.forEach(doctor => {
            let row = table.insertRow();
            row.innerHTML = `
                <td>${doctor.name}</td>
                <td>${doctor.email}</td>
                <td><img src="${doctor.photo}" alt="Photo" width="40"></td>
                <td>${doctor.phone}</td>
                <td><button class="remove" onclick="removeDoctor('${doctor.id}', this)">Remove</button></td>`;
        });
    })
    .catch(error => console.error('Error loading doctors:', error));
}

function addDoctor(event) {
    event.preventDefault(); 

    let name = document.getElementById("doctorName").value;
    let email = document.getElementById("doctorEmail").value;
    let phone = document.getElementById("doctorPhone").value;
    let photo = document.getElementById("doctorPhoto").value;

    if (name && email && phone && photo) {
        fetch('https://643e-197-58-104-183.ngrok-free.app/admin/addDoctor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, phone, photo })
        })
        .then(response => response.json())
        .then(data => {
            alert("Doctor added successfully!");
            loadDoctors(); 
        })
        .catch(error => console.error('Error adding doctor:', error));
    }
}
//https://643e-197-58-104-183.ngrok-free.app/admin/addDoctor

function removeDoctor(doctorId, button) {
    fetch(`https://643e-197-58-104-183.ngrok-free.app/admin/removeDoctor/${doctorId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        button.parentElement.parentElement.remove();
        alert("Doctor removed successfully!");
    })
    .catch(error => console.error('Error removing doctor:', error));
}

function removeRow(button) {
    button.parentElement.parentElement.remove();
}

function loadPatients() {
    fetch('https://643e-197-58-104-183.ngrok-free.app/admin/getPatients')
    .then(response => response.json())
    .then(data => {
        let table = document.getElementById("patientsTable");
        table.innerHTML = "<tr><th>Name</th><th>Email</th><th>Photo</th><th>Phone</th><th>Action</th></tr>";

        data.forEach(patient => {
            let row = table.insertRow();
            row.innerHTML = `
                <td>${patient.name}</td>
                <td>${patient.email}</td>
                <td><img src="${patient.photo}" alt="Photo" width="40"></td>
                <td>${patient.phone}</td>
                <td><button class="remove" onclick="removeRow(this)">Remove</button></td>`;
        });
    })
    .catch(error => console.error('Error loading patients:', error));
}
function updateAdminProfile(event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة عند النقر على الزر

    let firstName = document.querySelector(".info input[placeholder='John']").value;
    let lastName = document.querySelector(".info input[placeholder='Doe']").value;
    let birthDate = document.querySelector(".info input[placeholder='1985-06-15']").value;
    let gender = document.querySelector(".info input[placeholder='Male']").value;
    let email = document.querySelector(".info input[placeholder='admin@example.com']").value;
    let phone = document.querySelector(".info input[placeholder='+1234567890']").value;

    let updatedData = {
        firstName,
        lastName,
        birthDate,
        gender,
        email,
        phone
    };

    fetch('https://643e-197-58-104-183.ngrok-free.app/auth/login', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Admin profile updated successfully!");
    })
    .catch(error => console.error('Error updating admin profile:', error));
}
function updateDocrotProfile(event) {
    event.preventDefault();
    let firstName = document.querySelector(".info input[placeholder='John']").value;
    let lastName = document.querySelector(".info input[placeholder='Doe']").value;
    let birthDate = document.querySelector(".info input[placeholder='1985-06-15']").value;
    let gender = document.querySelector(".info input[placeholder='Male']").value;
    let email = document.querySelector(".info input[placeholder='admin@example.com']").value;
    let phone = document.querySelector(".info input[placeholder='+1234567890']").value;

    let updatedData = {
        firstName,
        lastName,
        birthDate,
        gender,
        email,
        phone
    };

    fetch('https://643e-197-58-104-183.ngrok-free.app/doctor/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Admin profile updated successfully!");
    })
    .catch(error => console.error('Error updating admin profile:', error));
}

// function addDoctor() {
//     let name = document.getElementById("doctorName").value;
//     let email = document.getElementById("doctorEmail").value;
//     let phone = document.getElementById("doctorPhone").value;
//     let photo = document.getElementById("doctorPhoto").value;
//     if (name && email && phone && photo) {
//         let table = document.getElementById("doctorsTable");
//         let row = table.insertRow();
//         row.innerHTML = `<td>${name}</td>
//                          <td>${email}</td>
//                          <td><${photo} alt="Photo" width="40"></td>
//                          <td>${phone}</td>
//                          <td><button class="remove" onclick="removeRow(this)">Remove</button></td>`;
//     }
// }
// function loadDoctors() {
//     let table = document.getElementById("doctorsTable");
//     let dummyDoctor = `<tr>
//                          <td>Dr. Smith</td>
//                          <td>smith@example.com</td>
//                          <td><img src="default.png" alt="Photo" width="40"></td>
//                          <td>+1111111111</td>
//                          <td><button class="remove" onclick="removeRow(this)">Remove</button></td>
//                        </tr>`;
//     table.innerHTML += dummyDoctor;
// }


// function loadPatients() {
//     let table = document.getElementById("patientsTable");
//     let dummyPatient = `<tr>
//                           <td>John Doe</td>
//                           <td>johndoe@example.com</td>
//                           <td><img src="default.png" alt="Photo" width="40"></td>
//                           <td>+2222222222</td>
//                           <td><button class="remove" onclick="removeRow(this)">Remove</button></td>
//                         </tr>`;
//     table.innerHTML += dummyPatient;
// }
