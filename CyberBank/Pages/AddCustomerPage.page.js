

require("../Utilities/CustomLocators.js");
//ngCllick comes from CustomLocators so thats why we need this require in here
var BankManagerPage = require('./BankManager.page.js');


var AddCustomerPage = function(){

    this.formLabels = $$('.form-group>label');
    this.firstNameInputBox = element(by.model('fName'));
    this.lastNameInputBox = element(by.model('lName'));
    this.postalCodeInputBox=element(by.model('postCd'));
    this.formRequiredFields=element.all(by.css('input:required'));
    this.formAddCustomerButton=$('.btn-default');
    this.customerForm = element(by.name('myForm'));


 //we didn't put this to the Utilities because we will use this only at customer page not else where
    this.goToAddCustomer = function(){
        BankManagerPage.addCustomerButton.click();
    };


}

module.exports = new AddCustomerPage();



