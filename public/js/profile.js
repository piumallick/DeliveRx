document.addEventListener('DOMContentLoaded', function () {
    console.log('profile.js started')
    fetch('http://localhost:3000/customer/profile/results')
        .then(response => response.json())//服务器端返回的response,convert into json
        .then(response => insertData(response['success']['rows'][0]))
});


function insertData(data){

    console.log('insertData')
    console.log(data)

    let table = document.querySelector("table");

    let name = table.insertRow();
    let cell = name.insertCell();
    let text = document.createTextNode('Name: ')
    cell.appendChild(text)
    cell = name.insertCell();
    text = document.createTextNode(data['name'])
    cell.appendChild(text)

    let email = table.insertRow();
    cell = email.insertCell();
    text = document.createTextNode('Email: ')
    cell.appendChild(text)
    cell = email.insertCell();
    text = document.createTextNode(data['email_address'])
    cell.appendChild(text)

    let phone = table.insertRow();
    cell = phone.insertCell();
    text = document.createTextNode('Phone #: ')
    cell.appendChild(text)
    cell = phone.insertCell();
    text = document.createTextNode(data['phone_number'])
    cell.appendChild(text)

    let address = table.insertRow();
    cell = address.insertCell();
    text = document.createTextNode('Address: ')
    cell.appendChild(text)
    cell = address.insertCell();
    text = document.createTextNode(data['address'])
    cell.appendChild(text)

    let dob_data = new Date(data['dob']).toLocaleString();
    let dob = table.insertRow();
    cell = dob.insertCell();
    text = document.createTextNode('Date of Birth: ')
    cell.appendChild(text)
    cell = dob.insertCell();
    text = document.createTextNode(dob_data)
    cell.appendChild(text)

    return data
}

