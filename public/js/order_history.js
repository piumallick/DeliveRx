document.addEventListener('DOMContentLoaded', function () {

    fetch('http://localhost:3000/customer/orderhistory/getAll')
        
        .then(response => response.json())//服务器端返回的response,convert into json
        // .then(data=>console.log(data['data']['rows']))
        .then(data => insertData(data['data']['rows']))
        // .then(data => loadHTMLTable(data))
    //load the html table to display data,we want this no data to actually come as response from our database
    // loadHTMLTable([]);
});

document.querySelector('table tbody').addEventListener('click', function (event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowByDateadded(event.target.dataset.id);//pass row id
        console.log(event.target.dataset);
    }
    
});

const searchBtn = document.getElementById("search-btn")
searchBtn.onclick = function () {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:3000/customer/orderhistory/search/' + searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']['rows']));
}



function insertData(data){
    for (var row in data){
        insertRowIntoTable(data[row])
    }
    return data
}

function deleteRowByDateadded(dateadded) {
    fetch('http://localhost:3000/customer/orderhistory/delete/' + dateadded, {
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

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    // const table = document.getElementById('tbodyOrder');
    // console.log(table)
    // console.log(data)
    // check if no data
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";
    
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateadded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            if (key === 'picture') {
                
                data[key] = `<img src="http://localhost:3000/${data[key]}"></img>`
                console.log(data[key])
                // tableHtml += `<td><img src="img-cart/${data[key]}"></td>`;
            }
            tableHtml += `<td>${data[key]}</td>`;
            //<img src="./img-cart/firstaid.jpg"></img>
        }
    }

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.dateadded}>Delete</td>`;

   

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
        tableHtml += `<td><img src="http://localhost:3000/${picture}"></img></td>`;
        tableHtml += `<td>${order_price}</td>`;
        tableHtml += `<td>${new Date(dateadded).toLocaleString()}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${data.dateadded}>Delete</td>`;
        tableHtml += "</tr>";
    });


    table.innerHTML = tableHtml;
}
