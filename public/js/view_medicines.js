// make fetch call to our backend
//read
document.addEventListener('DOMContentLoaded', function () {

    fetch('./staff/view_medicines/getAll')
        .then(response => response.json())//服务器端返回的response,convert into json
        .then(data => loadHTMLTable(data['data']['rows']));

    //load the html table to display data,we want this no data to actually come as response from our database
    // loadHTMLTable([]);
});
//function for delete and edit, we specify by event target
document.querySelector('table tbody').addEventListener('click', function (event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);//pass row id
        console.log(event.target.dataset.id);
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

    fetch('./staff/view_medicines/search/' + searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']['rows']));
}

function deleteRowById(id) {
    fetch('./staff/view_medicines/delete/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        //just return true or false
        .then(data => {
            console.log(data)
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
    const updatePriceInput = document.querySelector('#update-price-input');
    const updateClassificationInput = document.querySelector('#update-classification-input');


    fetch('http://localhost:3000/staff/view_medicines/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id: document.querySelector('#update-row-btn').dataset.id,
            name: updateNameInput.value,
            price: updatePriceInput.value,
            classification: updateClassificationInput.value
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
const medicineForm = document.getElementById("medicine_form");

addNameHidden.onclick = function () {
    const addSection = document.querySelector('#add-row');
    addSection.hidden = false;
}

medicineForm.onsubmit = function () {
    const idInput = document.querySelector('#id-input');
    const nameInput = document.querySelector('#name-input');
    const priceInput = document.querySelector('#price-input');
    const classificationInput = document.querySelector('#classification-input');
    const pictureInput = document.querySelector('#picture-input');

    const id = idInput.value;
    const name = nameInput.value;//don't forget to reset nameInput.value to be null again
    const price = priceInput.value;
    const classification = classificationInput.value;
    const picture = pictureInput.value;

    idInput.value = "";
    nameInput.value = "";
    priceInput.value = "";
    classificationInput.value = "";
    pictureInput.value = "";

    fetch('http://localhost:3000/staff/view_medicines/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({id: id, name: name, price: price, classification: classification, picture: picture})
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));


}

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    console.log(table)
    const isTableData = table.querySelector('.no-data');
    console.log(table)
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
    console.log(table)

// no data we will have to remove that table using table.innerHTML

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='8'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({medicine_id, medicine_name, round, category_name, picture, dateAdded}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${medicine_id}</td>`;
        tableHtml += `<td>${medicine_name}</td>`;
        tableHtml += `<td>${round}</td>`;
        tableHtml += `<td>${category_name}</td>`;
        tableHtml += `<td><img src="img-cart/${picture}"></td>`;
        // tableHtml += `<td>${new Date(dateAdded).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${medicine_id}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${medicine_id}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

function form_reset() {
    medicineForm.reset();
}