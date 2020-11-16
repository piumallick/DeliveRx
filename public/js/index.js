//show cart
(function(){
  const cartInfo = document.getElementById("cart-info");
  const cart = document.getElementById("cart");

  cartInfo.addEventListener("click",function(){
      cart.classList.toggle("show-cart");
  });
})();
//add items to the cart
(function(){
  //make sure we click the shopping-cart,if you click yellow span it won't work
  const carBtn = document.querySelectorAll(".store-item-icon");
  carBtn.forEach(btn=> {
      btn.addEventListener("click",event=>{
          alert("Please log in")
   
        
      });
      
  });
})();