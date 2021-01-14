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
    displaySelectedItems(selectedItems);

});

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

}

