'use strict';

class AddGoodToCart {

    constructor(title, price, id, img, linkPath) {
        this.title = title;
        this.price = price;
        this.id = id;
        this.img = img;
        this.linkPath = linkPath;
    }

    run($box) {
        let $goodContainer = $('<div/>', {
            class: 'cart-model',
            'data-id': this.id,
            'data-price': this.price,
            'data-count': 1
        });

        let $goodImgBox = $('<a/>', {
            class: 'cart-img',
            'href': this.linkPath
        });

        let $goodImg = $('<img/>', {
            class: 'cart-image-min',
            'src': this.img,
            'alt': this.title
        });

        let $goodTextBox = $('<div/>', {
            class: 'cart-text'
        });

        let $goodTitle = $('<a/>', {
            'href': this.linkPath,
            text: this.title
        });

        let $starBox = $('<p/>', {});

        let $firstStar = $('<i/>', {
            class: 'fas fa-star'
        });

        let $secondStar = $('<i/>', {
            class: 'fas fa-star'
        });

        let $thirdStar = $('<i/>', {
            class: 'fas fa-star'
        });

        let $fourthStar = $('<i/>', {
            class: 'fas fa-star'
        });

        let $halfStarBox = $('<i/>', {
            class: 'far fa-star x-star'
        });

        let $halfStarInside = $('<i/>', {
            class: 'fas fa-star-half y-star'
        });

        let $goodPrice = $('<span/>', {
            text: `1 x $${this.price}`
        });

        let $goodRemoveBtn = $('<div/>', {
            class: 'cart-del'
        });

        let $goodRemoveLink = $('<a/>', {
            'href': '#'
        });

        let $goodRemoveImg = $('<i/>', {
            class: 'fas fa-times-circle'
        });

        let $goodBox = $('<div/>', {
           class: 'product-box'
        });

        $goodImg.appendTo($goodImgBox);

        $goodTitle.appendTo($goodTextBox);
        $starBox.appendTo($goodTextBox);
        $goodPrice.appendTo($goodTextBox);

        $firstStar.appendTo($starBox);
        $secondStar.appendTo($starBox);
        $thirdStar.appendTo($starBox);
        $fourthStar.appendTo($starBox);
        $halfStarBox.appendTo($starBox);
        $halfStarInside.appendTo($halfStarBox);

        $goodRemoveImg.appendTo($goodRemoveLink);
        $goodRemoveLink.appendTo($goodRemoveBtn);

        $goodImgBox.appendTo($goodBox);
        $goodTextBox.appendTo($goodBox);

        $goodBox.appendTo($goodContainer);
        $goodRemoveBtn.appendTo($goodContainer);

        $goodContainer.appendTo($box);

    }

}