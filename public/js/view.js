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
module.exports = {insertRowIntoTab};