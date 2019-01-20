
require('../Utilities/CustomLocators.js');

var HomePage = require('../Pages/Home.page.js');

var BankManagerPage = require('../Pages/BankManager.page.js');

var AddCustomerPage = require('../Pages/AddCustomerPage.page.js');

var Base = require('../Utilities/Base.js');

var Customers = require('../Pages/Customers.page.js');

var BankData = require('../TestData/BankData.json');




describe('Bank Manager', () => {
    

//this is a test suite and it is about login fuctionality
describe('Manager Login', () => {
    
    beforeEach(function(){
        Base.navigateToHome();
    });

    fit('should have a correct page title', () => {
        expect(browser.getTitle()).toEqual('Protractor practice website - Banking App');
    });

    fit('should display homepage header', ()=>{
        expect(HomePage.homeButton.isDisplayed()).toBe(true);
        expect(HomePage.homeButton.getText()).toEqual('Home');
    });

    it('should display page header', ()=>{
        expect(HomePage.pageHeader.isDisplayed()).toBe(true);
        expect(HomePage.pageHeader.getText()).toEqual(BankData.appData.bankName);
    });

    it('should display login option for Bank Manager', ()=>{
        expect(HomePage.managerLoginButton.isDisplayed()).toBe(true);
        expect(HomePage.managerLoginButton.getText()).toEqual('Bank Manager Login');
    });

    it('should stay at the homepage when Home BUtton is clicked', ()=>{
       $('button.home').click();
       expect(browser.getTitle()).toEqual('Protractor practice website - Banking App');
       expect(HomePage.managerLoginButton.getText()).toEqual('Bank Manager Login');
    });

    it('should login as a Bank Manager', ()=>{
        HomePage.managerLoginButton.click();
        expect(BankManagerPage.addCustomerButton.isDisplayed()).toBe(true);
     });

    it('should check if Open Account button is displayed', () => {
        HomePage.managerLoginButton.click();
        expect(BankManagerPage.openAccountbutton.isDisplayed()).toBe(true);
        expect(BankManagerPage.openAccountbutton.getText()).toEqual('Open Account');
        expect(BankManagerPage.customersButton.isDisplayed()).toBe(true);
        expect(BankManagerPage.customersButton.getText()).toEqual('Customers');
     });

     it('should return to the home page when Home button is clicked', () => {
         HomePage.managerLoginButton.click();
         HomePage.homeButton.click();
         expect(HomePage.pageHeader.getText()).toEqual('XYZ Bank');
     });

});


});