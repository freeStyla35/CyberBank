// you can also put in one POM page rather than creating many pages, if it is very large application


require("../Utilities/CustomLocators.js");


var Customers = function(){

    this.table=element(by.xpath("//table[contains(@class,'table-bordered')]/tbody"));

    this.getLastRowValue=(function(columnNumber){
        return this.table.element(by.xpath("//tbody/tr[last()]/td["+columnNumber+"]"));
    })

}

module.exports = new Customers();