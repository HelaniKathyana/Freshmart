let buyerAddress;

$(document).ready(function () {
    //###############need to remove after complete previous view
    let itemArray = ["product2", "product4", "product5"];
    itemArray = JSON.stringify(itemArray);
    localStorage.setItem("selectedItems", itemArray);
    //####################################################3

    //Code Segment started from here
    let products = JSON.parse(data);

    //get selected items for checkout
    let selectedItems = localStorage.getItem("selectedItems");
    selectedItems = JSON.parse(selectedItems);
    selectedItems = getSelectedItemObjectArray(selectedItems, products);
    console.log(selectedItems)
    if (JSON.parse(localStorage.getItem("buyer"))){
        displayAddress();
    } else {
        document.getElementById("displayAddress").style.display = "none"
        document.getElementById("editAddress").style.display = "block"
    }
    displaySelectedItems(selectedItems);

});

function toggleEditAddress() {
    let buyer = JSON.parse(localStorage.getItem("buyer"))

    document.forms["address_form"]["name"].value = buyer.name;
    document.forms["address_form"]["address"].value = buyer.address;
    document.forms["address_form"]["street"].value = buyer.street;
    document.forms["address_form"]["city"].value = buyer.city;
    document.forms["address_form"]["postalCode"].value = buyer.postalCode;

    document.getElementById("editAddress").style.display = "block"
    document.getElementById("displayAddress").style.display = "none"
}

function editAddress() {
    let name = document.forms["address_form"]["name"].value;
    let address = document.forms["address_form"]["address"].value;
    let street = document.forms["address_form"]["street"].value;
    let city = document.forms["address_form"]["city"].value;
    let postalCode = document.forms["address_form"]["postalCode"].value;
    let buyerDetails = {
        name: name,
        address: address,
        street: street,
        city: city,
        postalCode: postalCode
    }
    localStorage.setItem("buyer",JSON.stringify(buyerDetails));
    buyerAddress = buyerDetails;
    displayAddress();
}

function displayAddress(){
    document.getElementById("editAddress").style.display = "none"
    let buyer = JSON.parse(localStorage.getItem("buyer"))
    buyerAddress = buyer;
    let address = `<span class="d-inline-block"><br><b>${buyer.name}</b>
                            <br>
                            ${buyer.address} <br> ${buyer.street} <br> ${buyer.city} <br>Postal Code: ${buyer.postalCode}</span>
                            <span class="d-inline-block" style="color: black; float: right;" id="newAddress">
                                <i onclick="toggleEditAddress()" class="fas fa-pen" style="font-size: 18px;"></i>
                            </span>`;
    document.getElementById("displayAddress").innerHTML = address;
    document.getElementById("displayAddress").style.display = "block"
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
                                    <td><i class="fas fa-minus-square" style="font-size: 20px; color: #FFD314; padding-right: 10px;"></i>
                                        <span style="font-size: 20px;">1</span>
                                        <i class="fas fa-plus-square" style="font-size: 20px; color: #FFD314;padding-left: 10px;"></i></td>
                                </tr>`
    })
    selectedItemsHTML += '</table>'
    total = ((subTotal * (100 - discount) / 100) + delivery).toFixed(2);
    document.getElementById("selectedItemView").innerHTML = selectedItemsHTML;
    document.getElementById("subtotal").innerText = `${subTotal.toFixed(2)}`;
    document.getElementById("total").innerText = total;
    document.getElementById("total2").innerHTML = `<b> Rs ${total}</b>`
    let orderSummary = {
        subTotal: subTotal,
        discount: discount,
        delivery: delivery,
        total: total,
        buyer: buyerAddress,
        orderDate: new Date()
    }
    orderSummary = JSON.stringify(orderSummary);
    localStorage.setItem("orderSummary", orderSummary);
}

