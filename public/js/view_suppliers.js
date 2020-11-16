// make fetch call to our backend
//read
document.addEventListener('DOMContentLoaded', function () {

    fetch('./staff/view_suppliers/getAll')
        .then(response => response.json())//服务器端返回的response,convert into json
        .then(data => loadHTMLTable(data['data']['rows']));

    //load the html table to display data,we want this no data to actually come as response from our database
    // loadHTMLTable([]);
});
//function for delete and edit, we specify by event target
document.querySelector('table tbody').addEventListener('click', function (event) {
    if (event.target.className === "delete-row-btn") {
        console.log(event.target.dataset.id)
        deleteRowById(event.target.dataset.id);//pass row id
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');
const cancelBtnAdd = document.querySelector('#cancelBtnAdd');
const cancelBtnUpdate = document.querySelector('#cancelBtnUpdate');
//go back

cancelBtnAdd.onclick = function () {
    location.reload();

}
cancelBtnUpdate.onclick = function () {
    location.reload();

}


//search
searchBtn.onclick = function () {
    const searchValue = document.querySelector('#search-input').value;

    fetch('./staff/view_suppliers/search/' + searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']['rows']));
}

function deleteRowById(id) {
    fetch('./staff/view_suppliers/delete/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        //just return true or false
        .then(data => {
            if (data.success) {
                location.reload();
            }
        });
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-row-btn').dataset.id = id;
    // console.log(id)
}



//update
updateBtn.onclick = function () {
    const updateNameInput = document.querySelector('#update-name-input');
    const updateaddressInput = document.querySelector('#update-address-input');
    const updatephonenumberInput = document.querySelector('#update-phonenumber-input');
    const updateemailInput = document.querySelector('#update-email-input');


    fetch('http://localhost:3000/staff/view_suppliers/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: document.querySelector('#update-row-btn').dataset.id,
            name: updateNameInput.value,
            address: updateaddressInput.value,
            phonenumber: updatephonenumberInput.value,
            email: updateemailInput.value,
        })
    })
        // console.log(response)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        })
}

//create
const addNameHidden = document.querySelector('#add-name-hidden');
const addBtn = document.querySelector('#add-name-btn');

addNameHidden.onclick = function () {
    const addSection = document.querySelector('#add-row');
    addSection.hidden = false;
}

addBtn.onclick = function () {
    const idInput = document.querySelector('#id-input');
    const nameInput = document.querySelector('#name-input');
    const addressInput = document.querySelector('#address-input');
    const phonenumberInput = document.querySelector('#phonenumber-input');
    const emailInput = document.querySelector('#email-input');
    console.log(emailInput)

    const id = idInput.value;
    const name = nameInput.value;//don't forget to reset nameInput.value to be null again
    const address = addressInput.value;
    const phonenumber = phonenumberInput.value;
    const email = emailInput.value;

    idInput.value = "";
    nameInput.value = "";
    addressInput.value = "";
    phonenumberInput.value = "";
    emailInput.value = "";

    fetch('http://localhost:3000/staff/view_suppliers/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({id: id, name: name, address: address, phonenumber: phonenumber, email: email})
    })
        .then(response => response.json())
        .then(data=>console.log(data))
        .then(data => insertRowIntoTable(data['data']));


}

function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    // check if no data
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        // console.log(key)
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            if (key === 'picture') {
                data[key] = `<img src="img-cart/${data[key]}"></img>`
                // tableHtml += `<td><img src="img-cart/${data[key]}"></td>`;
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');

// no data we will have to remove that table using table.innerHTML

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({supplier_id, supplier_name, address, phone_number, email_address, dateAdded}) {
        // console.log(email)
        tableHtml += "<tr>";
        tableHtml += `<td>${supplier_id}</td>`;
        tableHtml += `<td>${supplier_name}</td>`;
        tableHtml += `<td>${address}</td>`;
        tableHtml += `<td>${phone_number}</td>`;
        tableHtml += `<td>${email_address}</td>`;
        // tableHtml += `<td><img src="img-cart/${picture}"></td>`;
        // tableHtml += `<td>${new Date(dateAdded).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${supplier_id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${supplier_id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
