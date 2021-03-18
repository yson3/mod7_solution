(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buy = this;
  buy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

  buy.buyItem = function(itemToBuyIndex, quantity) {
    console.log(quantity);
    ShoppingListCheckOffService.buyItem(itemToBuyIndex, quantity);
  }

  buy.isEverythingBought = function() {
    return buy.itemsToBuy.length == 0 ? true : false;
  }
}
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.itemsBought = ShoppingListCheckOffService.getItemsBought();

  bought.isNothingBought = function() {
    return bought.itemsBought.length == 0 ? true : false;
  }
}

function ShoppingListCheckOffService() {
	var itemsToBuy = [
		{ name: "cookies", quantity: 10, pricePerItem: 3 },
    { name: "coke", quantity: 5, pricePerItem: 1 },
    { name: "beef", quantity: 3, pricePerItem: 5 },
    { name: "chips", quantity: 6, pricePerItem: 2 },
    { name: "chicken", quantity: 2, pricePerItem: 3 },
    { name: "wine", quantity: 3, pricePerItem: 10 },
    { name: "eggs", quantity: 2, pricePerItem: 4 }
	];

  var itemsBought = [];
	var service = this;

	service.getItemsToBuy = function() {
		return itemsToBuy;
	}

  service.getItemsBought = function() {
    return itemsBought;
  }

  service.buyItem = function(itemToBuyIndex, quantity) {
    var item = itemsToBuy[itemToBuyIndex];
    if (quantity != undefined) {
      item.quantity = quantity;
    }
    itemsBought.push(item);
    itemsToBuy.splice(itemToBuyIndex, 1);
  }
}

})();
