// var student = {
//     name: ["saqib", "rifaq"],
//     age: 21,
// };
// 0;
// console.table(student);

const btnCart = document.querySelector("#cart-icon");
const btnwhislist = document.querySelector(".bi-heart-fill");

const cart = document.querySelector(".cart");
const whislist = document.querySelector(".whislist");
const btnClose = document.querySelector("#cart-close");
const btnClose1 = document.querySelector("#cart-close1");

const cartDetails = document.querySelector(".shop-content");
const whislistDetails = document.querySelector(".shop-content");

let filter1 = "";

btnCart.addEventListener("click", () => {
    cart.classList.add("cart-active");
});

btnwhislist.addEventListener("click", () => {
    whislist.classList.add("whislist-active");
});

btnClose1.addEventListener("click", () => {
    whislist.classList.remove("whislist-active");
});

// function addToCart() {
//     // cart.classList.add("cart-active");
// }

btnClose.addEventListener("click", () => {
    cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", loadmmproduct);

function loadmmproduct() {
    loadContent();
}

function loadContent() {
    //Remove mmproduct Items  From Cart
    let btnRemove1 = document.querySelectorAll(".cart-remove");
    btnRemove1.forEach((btn) => {
        btn.addEventListener("click", removeItem);
    });

    //Product Item Change Event
    let qtyElements1 = document.querySelectorAll(".cart-quantity");
    qtyElements1.forEach((input) => {
        input.addEventListener("change", changeQty);
    });

    //Product Cart

    let cartBtns = document.querySelectorAll(".add-cart");
    cartBtns.forEach((btn) => {
        btn.addEventListener("click", addCart);
    });

    updateTotal();

}

function new5() {
    document.getElementById("intro2").innerHTML = "successfully added";
    document.querySelector(".intro2").style.display = "block"
    document.querySelector(".animate__zoomIn").style.display = "inline-block"

    setTimeout(() => {
        document.querySelector(".intro2").style.display = "none"
        document.querySelector(".animate__zoomIn").style.display = "none"
    }, 2000);
}

//Remove Item
function removeItem() {
    if (confirm("Are Your Sure to Remove")) {
        let title = this.parentElement.querySelector(
            ".cart-mmproduct-title"
        ).innerHTML;
        itemList = itemList.filter((el) => el.title != title);
        this.parentElement.remove();
        loadContent();
    }
}

//Change Quantity
function changeQty() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadContent();
}

let itemList = [];

//Add Cart
function addCart() {
    let mmproduct = this.parentElement;
    let title = mmproduct.querySelector(".mmproduct-title").innerHTML;
    let price = mmproduct.querySelector(".mmproduct-price").innerHTML;
    let imgSrc = mmproduct.querySelector(".mmproduct-img").src;
    console.log(title, price, imgSrc);

    let newProduct = { title, price, imgSrc };

    //Check Product already Exist in Cart
    if (itemList.find((el) => el.title == newProduct.title)) {
        alert("Product Already added in Cart");

        return;
    } else {
        itemList.push(newProduct);
        new5();
    }

    let newProductElement = createCartProduct(title, price, imgSrc);
    let element = document.createElement("div");
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector(".cart-content");
    cartBasket.append(element);
    loadContent();
    cartAdded(this);
    
 
    console.log(this);
}

function createCartProduct(title, price, imgSrc) {
    //     document.querySelector("cart-amt").style.fontSize = "15px";
    // document.getElementsByClassName("cart-amt").style.fontSize = "x-small";
    return `
<div class="cart-box">
<img src="${imgSrc}" class="cart-img">
<div class="detail-box">
<div class="cart-mmproduct-title">${title}</div>
<div class="price-box">
<div class="cart-price">${price}</div>
 <div class="cart-amt">${price}</div>
</div>
<input type="number" value="1" class="cart-quantity">
</div>
<ion-icon name="trash" class="cart-remove"></ion-icon>
</div>
`;
}

function updateTotal() {
    const cartItems = document.querySelectorAll(".cart-box");
    const totalValue = document.querySelector(".total-price");

    let total = 0;

    cartItems.forEach((product) => {
        let priceElement = product.querySelector(".cart-price");
        let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
        let qty = product.querySelector(".cart-quantity").value;
        total += price * qty;
        product.querySelector(".cart-amt").innerText = "Rs." + price * qty;
    });

    totalValue.innerHTML = "Rs." + total;

    // Add Product Count in Cart Icon

    const cartCount = document.querySelector(".cart-count");
    let count = itemList.length;
    cartCount.innerHTML = count;
    getData
    if (count == 0) {
        cartCount.style.display = "none";
    } else {
        cartCount.style.display = "block";
    }
}

// let productData = []
async function getData() {

    const productData = await fetch("./data.json")
        .then((res) => res.json())
        .then((data) => data.cartData);
        categoryclear()
    if (filter1 === "") {
        productData.map((item, i) => {
            let node = document.createElement("div");
            node.innerHTML = `
        <div class="pic">
        <ion-icon name="heart-outline" class="w-button heart-whislist"></ion-icon>
               <img src=${item.imagUrl} class="mmproduct-img" />
            </div>
           <h2 class="mmproduct-title">${item.productName}</h2>
           <h3 class="category1"> ${item.category} </h3>
            <span class="mmproduct-price">${item.price}</span>
            <ion-icon name="cart" class="add-cart add-cart" ></ion-icon> `;
            cartDetails.appendChild(node);
        });
    }
    else {
        let a = productData.filter((item, i) => {
            return item.category === filter1
        })
        a.map((item, i) => {
            let node = document.createElement("div");
            node.innerHTML = `
        <div class="pic">
        <ion-icon name="heart-outline" class="w-button heart-whislist"></ion-icon>
               <img src=${item.imagUrl} class="mmproduct-img" />
            </div>
           <h2 class="mmproduct-title">${item.productName}</h2>
           <h3 class="category1"> ${item.category} </h3>
            <span class="mmproduct-price">${item.price}</span>
            <ion-icon name="cart" class="add-cart add-cart" ></ion-icon> `;
            cartDetails.appendChild(node);
        })

    }

}

getData();

function cartAdded(new1) {
    new1.style.background = "green";
    new1.style.color = "white";
    
}

function whislistAdded(new2) {
    new2.style.background = "green";
    new2.style.color = "black";
}

//Change Quantity
function changeQty1() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    loadContent1();
}

let itemList1 = [];

//whislist Cart
function addWhislist() {
    let mmproduct1 = this.parentElement.parentElement;
    console.log(mmproduct1);
    let title1 = mmproduct1.querySelector(".mmproduct-title").innerHTML;
    let price1 = mmproduct1.querySelector(".mmproduct-price").innerHTML;
    let imgSrc1 = mmproduct1.querySelector(".mmproduct-img").src;
    console.log(title1, price1, imgSrc1);

    let newProduct1 = { title1, price1, imgSrc1 };

    //Check Product already Exist in Cart
    if (itemList1.find((el) => el.title1 == newProduct1.title1)) {
        alert("Product Already addes in whislist");

        return;
    } else {
        itemList1.push(newProduct1);
    }

    let newProductElement1 = createWhislistProduct(title1, price1, imgSrc1);
    let element1 = document.createElement("div");
    element1.innerHTML = newProductElement1;
    let cartBasket1 = document.querySelector(".whislist-content");
    cartBasket1.appendChild(element1);
    loadContent1();
    // cartAdded();
    whislistAdded(this);
    // console.log("hello");
}

function loadContent1() {
    //Remove mmproduct Items  From Cart
    let btnRemove1 = document.querySelectorAll(".whislist-remove");
    btnRemove1.forEach((btn) => {
        btn.addEventListener("click", removeItem1);
    });

    //Product Item Change Event
    let qtyElements1 = document.querySelectorAll(".cart-quanupdateTotaltity");
    qtyElements1.forEach((input) => {
        input.addEventListener("change", changeQty1);
    });

    //Product Cart

    let cartBtns1 = document.querySelectorAll(".heart-whislist");
    cartBtns1.forEach((btn) => {
        btn.addEventListener("click", addWhislist);
    });

    updateTotal1();
}

function updateTotal1() {
    const cartItems1 = document.querySelectorAll(".whislist-box");
    const totalValue1 = document.querySelector(".total1-price");

    let total1 = 0;

    cartItems1.forEach((product) => {
        let priceElement1 = product.querySelector(".whislist-price");
        let price1 = parseFloat(priceElement1.innerHTML.replace("Rs.", ""));
        let qty1 = product.querySelector(".whislist-quantity").value;
        total1 += price1 * qty1;
        product.querySelector(".whislist-amt").innerText = "Rs." + price1 * qty1;
    });

    totalValue1.innerHTML = "Rs." + total1;

    // Add Product Count in Cart Icon

    const cartCount1 = document.querySelector(".whislist-count");
    let count1 = itemList1.length;
    cartCount1.innerHTML = count1;

    if (count1 == 0) {
        cartCount1.style.display = "none";
    } else {
        cartCount1.style.display = "block";
    }
}

function createWhislistProduct(title1, price1, imgSrc1) {
    //     document.querySelector("cart-amt").style.fontSize = "15px";
    // document.getElementsByClassName("cart-amt").style.fontSize = "x-small";
    return `

<div class="whislist-box">
<img src="${imgSrc1}" class="whislist-img">
<div>
<div class="whislist-mmproduct-title">${title1}</div>
<div class="price-box1">
<div class="whislist-price">${price1}</div>
 <div class="whislist-amt">${price1}</div>
</div>
<input type="number" value="1" class="whislist-quantity">
</div>
<ion-icon name="trash" class="whislist-remove"></ion-icon>
</div>
`;
}

function removeItem1() {
    if (confirm("Are Your Sure to Remove")) {
        let title1 = this.parentElement.querySelector(
            ".whislist-mmproduct-title"
        ).innerHTML;
        itemList1 = itemList1.filter((el) => el.title1 != title1);
        this.parentElement.remove();
        loadContent1();
    }
}

document.addEventListener("DOMContentLoaded", loadmmproduct1);

function loadmmproduct1() {
    loadContent1();
}

let mens = document.querySelector("#mens1");
let all = document.querySelector("#all1");
let womens = document.querySelector("#womens1");
let fragrance = document.querySelector("#fragrance1");
let smartPhone = document.querySelector("#smart-phone1");


all.addEventListener("click", function all1() {
    filter1 = ""
    getData()
})

mens.addEventListener("click", function mens1() {
    filter1 = "mens collection"
    getData()
})

womens.addEventListener("click", function womens1() {
    filter1 = "womens collection";
    getData()
})

fragrance.addEventListener("click", function womens1() {
    filter1 = "fragrance collections"
    getData()
})



smartPhone.addEventListener("click", function new2() {
    filter1 = "smart phone";
    getData();
})


function categoryclear() {
    cartDetails.innerHTML = ""

}