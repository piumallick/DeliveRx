document.addEventListener('DOMContentLoaded', function () {
    console.log('event triggered')
    fetch('http://localhost:3000/customer/search_medicines/results')
        
        .then(response => response.json())//服务器端返回的response,convert into json
        // .then(data=>console.log(data['data']['rows']))
        .then(data => insertData(data['data']['rows']))
        // .then(data => loadHTMLTable(data))
    //load the html table to display data,we want this no data to actually come as response from our database
    // loadHTMLTable([]);
});

function insertData(data){
    console.log("insertData")
    for (var row in data){
        insertRowIntoTable(data[row])
    }
    return data
 
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
        tableHtml += `<td>${data[key]}</td>`;
        }
    }