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
            //target element
        //    console.log(event.target.parentElement.classList.contains("store-item-icon"));
            // img-container/store-item-icon/fas fa-shopping-cart
            if(event.target.parentElement.classList.contains("store-item-icon")){
                //got path of img
                let fullPath=event.target.parentElement.previousElementSibling.src;
                let pos = fullPath.indexOf("img")+3;
                let partPath=fullPath.slice(pos);
                // console.log(partPath)//  /cupcake-1.jpeg

                const item={};
                item.img=`img-cart${partPath}`;
                // name = sweet item(name of card)
                let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;//card-body there are img-container and card-body in card node
                // console.log(name);
                item.name = name

                let price=event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;
                // console.log(price);
                //price = $ 5 we need to get rid of $

                let finalPrice = price.slice(1).trim()
                // console.log(finalPrice)

                item.price=finalPrice

                const cartIterm = document.createElement("div");
                cartIterm.classList.add(
                    "cart-item",
                    "d-flex",
                    "justify-content-between",
                    "text-capitalize",
                    "my-3"


                );

                cartIterm.innerHTML = ` <img src="${
                    item.img
                }" class="img-fluid rounded-circle" id="item-img" alt="">
                <div class="cart-item-text">
    
                  <p id="cart-item-title" class="font-weight-bold mb-0">${
                      item.name
                    }</p>
                  <span>$</span>
                  <span id="cart-item-price" class="cart-item-price" class="mb-0">${
                      item.price
                    }</span>
                </div>
                <a href="#" id='cart-item-remove' class="cart-item-remove">
                  <i class="fas fa-trash"></i>
                </a>
              </div>`;
              console.log(item);

              const cart = document.getElementById("cart");
              const total = document.querySelector(".cart-total-container");
              total.appendChild(cartIterm);
              console.log(total.children.cartIterm);
            //   insert before total element
              cart.insertBefore(cartIterm,total);
              alert("item added to the cart")
              showTotals();

            }
        });
        
    });

    function showTotals(){
      const total=[];
      const items = document.querySelectorAll(".cart-item-price");

      items.forEach(function(item){
        total.push(parseFloat(item.textContent));

      });
      // console.log(total);
    const totalMoney = total.reduce(function(total,item){
      total+=item;
      return total;
    },0);
    // console.log(totalMoney)
    document.getElementById('cart-total').innerHTML=totalMoney;
    document.querySelector('.item-total').innerHTML=totalMoney;
    document.getElementById('item-count').innerHTML=total.length;
    
    //clear shopping cart
    clearCart=document.getElementById('clear-cart');
    cart = document.getElementById('cart-total');
    cartItem=document.querySelectorAll('.cart-item')
    clearCart.addEventListener("click",event=>{
      console.log("hahh")
      cartInfo=document.getElementById('cart-info');
      cartInfo.innerHTML =  ` 
      <span class="cart-info__icon mr-lg-3"><i class="fas fa-shopping-cart"></i></span>
      <p class="mb-0 text-capitalize"><span id="item-count">0</span> items - $<span class="item-total">0</span></p>`;
      cart.innerHTML="0";
      cartItem.forEach(item=>{
        item.innerHTML="clear";

      })
      
      
    

    })
    }
})();