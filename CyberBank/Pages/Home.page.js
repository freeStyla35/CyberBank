
require('../Utilities/CustomLocators');
//ngCllick comes from CustomLocators so thats why we need this require in here

var HomePage= function(){

    this.homeButton=$('button.home');
    this.pageHeader=$('.mainHeading');
    this.managerLoginButton=element(by.ngClick('manager()'));
    this.addCustomerButton=element(by.ngClick('addCust()'));

};

module.exports=new HomePage();


