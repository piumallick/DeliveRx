
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
              // item{img: "img-cart/firstaid.jpg", classification: "First Aid item", name: "Bravery Badges", price: "5"}
              const item={};
              item.img=`img-cart${partPath}`;
              
              let classification = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;//card-body there are img-container and card-body in card node
              item.classification = classification

              let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;//card-body there are img-container and card-body in card node
              item.name = name

              let price=event.target.parentElement.parentElement.nextElementSibling.children[0].children[2].textContent;
              let finalPrice = price.slice(1).trim() //price = $ 5 we need to get rid of $
              item.price=finalPrice

              

              const cartIterm = document.createElement("div");
              cartIterm.classList.add(
                "cart-item",
                "d-flex",
                "justify-content-between",
                "text-capitalize",
                "my-3"
              );

              cartIterm.innerHTML =
              `<img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                <div class="cart-item-text">
                  <p id="cart-item-title" class="font-weight-bold mb-0">${item.classification}</p>
                  <span id="cart-item-name" class="cart-item-name" class="mb-0">${item.name}</span>
                  <span>$</span>
                  <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                </div>
                <a href="#" id='cart-item-remove' class="cart-item-remove">
                  <i class="fas fa-trash"></i>
                </a>`;
              // console.log(item);
            //the cart part right corner
              const cart = document.getElementById("cart");
              const total = document.querySelector(".cart-total-container");
              total.appendChild(cartIterm);
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

    const totalMoney = total.reduce(function(total,item){
      total+=item;
      return total;
    },0);
  
    document.getElementById('cart-total').innerHTML=totalMoney;
    document.querySelector('.item-total').innerHTML=totalMoney;
    document.getElementById('item-count').innerHTML=total.length;
  }


  const cart = document.getElementById("cart");
  const checkOut=document.getElementById('check-out');

  checkOut.addEventListener("click",event=>{
      const cart = document.getElementById("cart");
      // console.log(cart)
      var len = cart.children.length-2
      // console.log(len)
      for(i=0;i<len;i++){
          const picture = cart.children[i].children[0].getAttribute("src");
          const classification = cart.children[i].children[1].children[0].textContent;
          const name = cart.children[i].children[1].children[1].textContent;
          const price = cart.children[i].children[1].children[3].textContent;
          
          fetch('http://localhost:3000/customer/orderhistory/insert', {
          headers: {
              'Content-type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({name: name, classification: classification, price: price,  picture: picture})
      })
          .then(response => response.json())
          // .then(data => insertOrder.insertRowIntoTable(data['data']));
      }
      alert('successfully, you can check your order in order history')

  })


  //clear all items in shopping cart(reload page)
  clearCart=document.getElementById('clear-cart');
  clearCart.addEventListener("click",event=>{
    location.reload()
  })

  // clear item according to icon
  // clearItemRemove=document.querySelectorAll('.cart-item-remove');
  // clearItemRemove_new= document.getElementById('cart-item-remove');
  // clearItemRemove_new.addEventListener("click",event=>{
  //   alert("hello")
  //   console.log(event.target)
  // })
  // clearItemRemove.forEach(btn=>{
  //   btn.addEventListener("click",event=>{
  //     alert("hello")
  //     console.log(event.target)

  //   })
  // })

})();
