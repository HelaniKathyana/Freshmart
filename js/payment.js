$(document).ready(function () {
    let orderSummary = localStorage.getItem("orderSummary");
    orderSummary = JSON.parse(orderSummary);
    console.log(orderSummary)

    document.getElementById("subtotal").innerText = orderSummary.subTotal.toFixed(2);
    document.getElementById("discount").innerText = orderSummary.discount+'%';
    document.getElementById("delivery").innerText = orderSummary.delivery.toFixed(2);
    document.getElementById("total").innerText = orderSummary.total;
});