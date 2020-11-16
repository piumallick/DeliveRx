document.addEventListener('DOMContentLoaded', function () {

    fetch('./customer/orderhistory/getAll')
        .then(data=>console.log(data))
        .then(response => response.json())//服务器端返回的response,convert into json
        .then(data => insertRowIntoTable(data['data']))
        .then(data => loadHTMLTable(data['data']['rows']))
      
        // .then(data=>console.log(data))

    //load the html table to display data,we want this no data to actually come as response from our database
    // loadHTMLTable([]);
});

document.querySelector('table tbody').addEventListener('click', function (event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);//pass row id
        console.log(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    // const table = document.getElementById('tbodyOrder');
    console.log(table)
    // check if no data
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        // console.log(key)
        if (data.hasOwnProperty(key)) {
            if (key === 'dateadded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            if (key === 'picture') {
                data[key] = `<img src="${data[key]}"></img>`
                // tableHtml += `<td><img src="img-cart/${data[key]}"></td>`;
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.dateadded}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.dateadded}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}


function loadHTMLTable(data) {

    // const table = document.querySelector('table tbody');
    // let table = document.getElementById('tableOrder')

    // no data we will have to remove that table using table.innerHTML
    console.log(data.length);
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='7'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({order_name, order_classification, order_price, picture,dateadded}) {
        console.log(order_name, order_classification, order_price, picture,dateadded)
        tableHtml += "<tr>";
        tableHtml += `<td>${order_name}</td>`;
        tableHtml += `<td>${order_classification}</td>`;
        tableHtml += `<td>${order_price}</td>`;
        tableHtml += `<td><img src="${picture}"></td>`;
        tableHtml += `<td>${new Date(dateadded).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${data.dateadded}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${data.dateadded}>Edit</td>`;
        tableHtml += "</tr>";
    });


    table.innerHTML = tableHtml;
}

module.exports = [insertRowIntoTab, loadHTMLTable];