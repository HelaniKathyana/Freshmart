$(document).ready(function () {
    //Code Segment started from here
    let products = JSON.parse(data);


    //get selected items for checkout
    let selectedItems = localStorage.getItem("selectedItems");
    if (!selectedItems) {
        location.href = "../html/home.html"
    }
    selectedItems = JSON.parse(selectedItems);
    selectedItems = getSelectedItemObjectArray(selectedItems, products);
    console.log(selectedItems)
    displaySelectedItems(selectedItems);
    displayOrderSummary();
});

 function displayOrderSummary(){
     let buyer = JSON.parse(localStorage.getItem("buyer"))
     let orderSummary = JSON.parse(localStorage.getItem("orderSummary"))
    let summary = `<div class="summary">
                            <div><b>Summary :</b></div>
                            <div id="orderNumber">Order # : 4444</div>
                            <div id="orderDate">Order Date : October 25,2020</div>
                            <div id="orderTotal">Order Total : <b>Rs. ${orderSummary.total}</b></div>
                        </div>
                        <div class="address ">
                            <div><b>Delivery Address :</b></div>
                            <div><b>${buyer.name}</b></div>
                            <div>${buyer.address} , ${buyer.street}</div>
                            <div>${buyer.city}</div>
                            <div>${buyer.postalCode}</div>
                        </div>`
     document.getElementById("inline-summary").innerHTML = summary;
}

function getSelectedItemObjectArray(selectedItem, products) {
    let itemArray = [];
    selectedItem.forEach(item => {
        products.forEach(product => {
            if (item === product.id) {
                itemArray.push(product);
            }
        });
    });
    console.log(itemArray)
    return itemArray;
}

function displaySelectedItems(selectedItems) {
    let subTotal = 0;
    let discount = 5;
    let delivery = 300;
    let total = 0;

    let selectedItemsHTML = `<table>
                          <colgroup span="4"></colgroup>`;
    selectedItems.forEach(item => {
        subTotal += parseFloat(item.price.split(" ")[1]);
        selectedItemsHTML += `<tr class="item-header-container">
                                    <td><img src="${item.image}" style="width: 50px"></td>
                                    <td>${item.name}<br>${item.price}</td>
                                    <td><span style="font-size: 20px;">1</span></td>
                                </tr>`
    })
    selectedItemsHTML += '</table>'
    total = ((subTotal * (100 - discount) / 100) + delivery).toFixed(2);
    document.getElementById("orderedItemView").innerHTML = selectedItemsHTML;
    document.getElementById("subtotal").innerText = `${subTotal.toFixed(2)}`;
    document.getElementById("total").innerText = total;
    let orderSummary = {
        subTotal: subTotal,
        discount: discount,
        delivery: delivery,
        total: total
    }
    orderSummary = JSON.stringify(orderSummary);
    localStorage.setItem("orderSummary", orderSummary);
}

function clearData() {
    localStorage.removeItem("selectedItems");
    localStorage.removeItem("orderSummary");
    location.href = "../html/home.html"
}

