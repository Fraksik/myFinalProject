'use strict';

class Cart {
    constructor($priceBox, $countBox, $cartBox) {
        this.$priceBox = $priceBox;
        this.$countBox = $countBox;
        this.$cartBox = $cartBox;
        this.amount = 0;
        this.cartProducts = [];
        this.ajaxGetProducts();

    }

    init() {
        this.setPriceAndCount(this.$priceBox, this.$countBox);
    }

    setPriceAndCount($priceBox, $countBox) {
        let $total = $('<span/>', {
            text: 'total'
        });

        let $price = $('<span/>', {
            text: `$${this.amount}.00`,
        });

        let $count = $('<span/>', {
            text: this.cartProducts.length
        });

        $count.appendTo($countBox);

        $total.appendTo($priceBox);
        $price.appendTo($priceBox);
    }

    ajaxGetProducts() {
        $.ajax({
            type: 'GET',
            url: 'json/products.json',
            dataType: 'json',
            context: this,
            success: function (data) {
                this.amount = data.amount;

                for (let k = 0; k < data.cart.length; k++) {
                    let item = data.cart[k];
                    let createNewProduct = new AddGoodToCart(item.title, item.price, item.id, item.img, item.link);
                    createNewProduct.run(this.$cartBox);
                    this.cartProducts.push(item);
                }

                this.$priceBox.children().last().text(`$${this.amount}.00`);
                this.$countBox.children().text(this.cartProducts.length);
            },
            error: function (error) {
                console.log('Ошибка при получении содержимого корзины', error);
            }
        });
    }

    addProduct(title, price, id, img, link) {
        let newProduct = {
            title,
            price,
            id,
            img,
            link
        };
        this.cartProducts.push(newProduct);
        this.amount += price;
        this.refresh();
    }

    removeProduct(productId) {

        for (let item of this.cartProducts) {
            if (item.id === productId) {
                let productIndex = this.cartProducts.indexOf(item);
                this.cartProducts.splice(productIndex, 1);
                this.amount -= item.price;
                break;
            }
        }
        this.refresh();
    }

    refresh() {
        this.$priceBox.children().last().text(`$${this.amount}.00`);
        this.$countBox.children().text(this.cartProducts.length);
        this.$cartBox.children().remove();

        let productInCart = [];

        for (let k = 0; k < this.cartProducts.length; k++) {

            let item = this.cartProducts[k];
            let itemId = item.id;
            let findProductInCart = $(`[data-id = ${item.id}]`);


            let createNewProduct = new AddGoodToCart(item.title, item.price, itemId, item.img, item.link);

            if (productInCart.length === 0) {
                createNewProduct.run(this.$cartBox);
                productInCart.push(itemId);
            } else {
                if (productInCart.indexOf(itemId) !== -1) {
                    let $elementPrice = findProductInCart[0].dataset.price;
                    let $elementCount = parseInt(findProductInCart[0].dataset.count);

                    findProductInCart[0].dataset.count = $elementCount + 1;
                    findProductInCart[0]
                        .children[0]
                        .children[1]
                        .children[2]
                        .innerHTML = `${$elementCount + 1} x $${$elementPrice}`;

                } else {
                    createNewProduct.run(this.$cartBox);
                    productInCart.push(itemId);
                }
            }
        }

        if (this.cartProducts.length > 9) {
            this.$countBox.children('span').css('left', '3px')
        } else {
            this.$countBox.children('span').css('left', '6px')
        }
    }
}