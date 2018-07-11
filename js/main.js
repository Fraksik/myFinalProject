'use strict';

$(document).ready(function () {

    let $cartBox = $('.cart-products-add');
    let $price = $('.cart-price');
    let $countOfProducts = $('.cart-products');
    let $myCart = new Cart($price, $countOfProducts, $cartBox);

    $myCart.init();

    $('.push').on('click', function () {
        let $good = $(this).parent().parent('div.model');
        let $title = $good.children().find('h5').text();
        let $price = parseInt($good.attr('data-price'));
        let $id = parseInt($good.attr('data-id'));
        let $image = $good.children().first().children().attr('src');

        $myCart.addProduct($title, $price, $id, $image, '#');

    });

    $('.cart-products-list').on('click', 'div.cart-model > div.cart-del', function () {
        $myCart.removeProduct(parseInt($(this).parent().attr('data-id')));
    });

});