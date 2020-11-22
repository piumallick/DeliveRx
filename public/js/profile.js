document.addEventListener('DOMContentLoaded', function () {

    fetch('http://localhost:3000/customer/profile/results')
        
        .then(response => response.json())//服务器端返回的response,convert into json
        console.log('testing route')
        console.log(respone)
        .then(data=>console.log(data['data']['rows']))
        //.then(data => insertData(data['data']['rows']))
        // .then(data => loadHTMLTable(data))
    //load the html table to display data,we want this no data to actually come as response from our database
    // loadHTMLTable([]);
});
