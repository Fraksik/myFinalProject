'use strict';
$(document).ready(function () {
    $("#productsSlider").slider({
        min: 0,
        max: 700,
        values: [ 88, 400 ],
        range: true,
        stop: function (event, ui) {
            $("input#minCostProductsSlider").val("$" + ui.values[0]);
            $("input#maxCostProductsSlider").val("$" + ui.values[1]);
        },

        slide: function (event, ui) {
            $("input#minCostProductsSlider").val("$" + $("#productsSlider").slider("values", 0));
            $("input#maxCostProductsSlider").val("$" + $("#productsSlider").slider("values", 1));
        }
    });
});

