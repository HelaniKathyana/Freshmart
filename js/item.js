$(document).ready(function(){

    $("#product_rating_stars .fa-star").on('click', function () {
        var starIndexId = $(this).attr('star-index');
        console.log("starIndex :", starIndexId);
        $(this).siblings().removeClass("checked")

        for (var i = 0; i <= starIndexId; i++) {
            $(this).siblings('.fa-star[star-index="'+i+'"]').addClass("checked");

            console.log(i);
        }

        $(this).addClass("checked");

    })

    $('#product_favourite').on('click',function() {
        $(this).find("i").toggleClass("far fas selected-heart border-heart");
    });

});
