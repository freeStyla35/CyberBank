

require('../Utilities/CustomLocators');
//ngCllick comes from CustomLocators so thats why we need this require in here

var BankManagerPage= function(){

    this.addCustomerButton=element(by.ngClick('addCust()'));
    this.openAccountbutton=element(by.ngClick('openAccount()'));
    this.customersButton=element(by.ngClick('showCust()'));

};

module.exports=new BankManagerPage();