function show() {
    document.getElementById('cold_cough_images').style.maxHeight = "150px";
    var images = document.querySelectorAll("#cold_cough_images img");
    for (var i = 0; i < images.length; i++) {
        images[i].src = images[i].getAttribute('data-src');
        console.log("Image no.: ", i);
    }
}