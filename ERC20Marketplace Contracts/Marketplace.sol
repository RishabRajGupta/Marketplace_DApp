// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address from, address to, uint amount) external returns (bool);
}

contract Marketplace {

    IERC20 public paymentToken;

    uint public productCount;

    struct Product {
        uint id;
        string name;
        uint price;
        string image;
        address seller;
        bool sold;
    }

    mapping(uint => Product) public products;

    // ⭐ Rating storage
    mapping(address => uint) public ratings;
    mapping(address => uint) public ratingCount;

    event ProductListed(uint id, string name, uint price, address seller);
    event ProductPurchased(uint id, address buyer);
    event SellerRated(address seller, uint rating);

    constructor(address tokenAddress) {
        paymentToken = IERC20(tokenAddress);
    }

    function listProduct(
        string memory name,
        uint price,
        string memory image
    ) public {

        require(price > 0, "Price must be greater than zero");

        productCount++;

        products[productCount] = Product(
            productCount,
            name,
            price,
            image,
            msg.sender,
            false
        );

        emit ProductListed(productCount, name, price, msg.sender);
    }

    function buyProduct(uint productId) public {

        Product storage product = products[productId];

        require(product.id > 0, "Product does not exist");
        require(!product.sold, "Product already sold");

        paymentToken.transferFrom(
            msg.sender,
            product.seller,
            product.price
        );

        product.sold = true;

        emit ProductPurchased(productId, msg.sender);
    }

    // ⭐ Rate Seller
    function rateSeller(address seller, uint rating) public {

        require(rating >= 1 && rating <= 5, "Rating must be 1-5");
        require(msg.sender != seller, "Cannot rate yourself");

        ratings[seller] += rating;
        ratingCount[seller]++;

        emit SellerRated(seller, rating);
    }

    // ⭐ Get Average Rating
    function getAverageRating(address seller) public view returns(uint) {

        if(ratingCount[seller] == 0){
            return 0;
        }

        return ratings[seller] / ratingCount[seller];
    }
}