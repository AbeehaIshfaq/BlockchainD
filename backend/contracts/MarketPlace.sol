// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;
pragma experimental ABIEncoderV2;

contract MarketPlace {
    struct Product {
        uint256 id;
        string name;
        uint256 price;
        address seller;
    }

    mapping(uint256 => Product) public members;
    event ProductEvent(uint256 indexed _memberId);
    uint256 public ProductCount;

    struct Order {
        uint256 id;
        uint256 ProductId;
        address buyer;
    }
    mapping(uint256 => Order) public orders;
    event OrderEvent(uint256 indexed _ordersId);
    uint256 public OrderCount;

    struct Rating {
        uint256 ratingId;
        uint256 ProductId;
        address rater;
        uint256 rating;
    }

    // Rating[] rate;
    // Rating r1;
    mapping(uint256 => Rating) public rate;
    event RateEvent(uint256 indexed _ratingId);
    uint256 public RatingCount;

    constructor() public {
        ProductCount = 0;
        OrderCount = 0;
        RatingCount = 0;
        addProduct("Butter", 1000);
    }

    function addOrder(uint256 _productId) public {
        orders[OrderCount] = Order(OrderCount, _productId, tx.origin);
        OrderCount++;
    }

    function addRating(uint256 _productId, uint256 rating) public {
        uint256 check = 0;

        for (uint256 i = 0; i < OrderCount; i++) {
            if (
                orders[i].buyer == tx.origin &&
                orders[i].ProductId == _productId
            ) {
                check = 1;
                break;
            }
        }
        if (check == 0) {
            revert("Choose a product which you have ordered");
        }

        rate[RatingCount] = Rating(RatingCount, _productId, tx.origin, rating);
        RatingCount++;
    }

    function GetRating(uint256 _productId)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory temp = new uint256[](RatingCount);
        uint256 count = 0;
        for (uint256 i = 0; i < RatingCount; i++) {
            if (rate[i].ProductId == _productId) {
                temp[count] = rate[i].rating;
                count = count + 1;
            }
        }
        return temp;
    }

    function Getorder() public view returns (Product[] memory) {
        Product[] memory id = new Product[](ProductCount);
        uint256 counter = 0;
        uint256 check = 0;
        for (uint256 i = 0; i < OrderCount; i++) {
            if (orders[i].buyer == tx.origin) {
                id[counter] = (members[orders[i].ProductId]);
                counter++;
                check = 1;
            }
        }
        if (check == 0) {
            revert("you have not placed any order");
        }
        return id;
    }

    function addProduct(string memory _name, uint256 _price) public {
        members[ProductCount] = Product(ProductCount, _name, _price, tx.origin);
        ProductCount++;
    }

    function getA_single_product(uint256 _productId)
        public
        view
        returns (Product memory)
    {
        return members[_productId];
    }

    function getProduct()
        public
        view
        returns (
            uint256[] memory,
            string[] memory,
            uint256[] memory
        )
    {
        uint256[] memory id = new uint256[](ProductCount);
        string[] memory name = new string[](ProductCount);
        uint256[] memory price = new uint256[](ProductCount);
        for (uint256 i = 0; i < ProductCount; i++) {
            Product storage member = members[i];
            id[i] = member.id;
            name[i] = member.name;
            price[i] = member.price;
        }
        return (id, name, price);
    }

    function getProduct2() public view returns (Product[] memory) {
        Product[] memory id = new Product[](ProductCount);
        for (uint256 i = 0; i < ProductCount; i++) {
            Product storage member = members[i];
            id[i] = member;
        }
        return id;
    }
}
