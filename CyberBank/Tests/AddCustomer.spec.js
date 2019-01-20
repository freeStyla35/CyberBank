

require('../Utilities/CustomLocators.js');

var HomePage = require('../Pages/Home.page.js');

var BankManagerPage = require('../Pages/BankManager.page.js');

var AddCustomerPage = require('../Pages/AddCustomerPage.page.js');

var Base = require('../Utilities/Base.js');

var Customers = require('../Pages/Customers.page.js');

var BankData = require('../TestData/BankData.json');

// just in case if we have more describes, lets have a root describe first


var Excel = require('exceljs');
var wb = new Excel.Workbook();
var sh;
var filePath='../TestData/CustomerList.xlsx';
var sheetName='Sheet1';
var accountNumbers=[];

var SelectHelper = require('../Utilities/SelectHelper.js');
var customerSelectBox= new SelectHelper(by.id('userSelect'));
var currencySlectBox= new SelectHelper(by.id('currency'));



describe('Add Customer', () => {


    describe('Adding a Customer', () => {
        beforeAll(function(){
            Base.navigateToHome();
            HomePage.managerLoginButton.click();
            AddCustomerPage.goToAddCustomer();

            wb.xlsx.readFile(filePath).then(function(){
                sh=wb.getWorksheet(sheetName);
            });
        });


        it('should display form for Adding Customer', () => {
            expect(AddCustomerPage.customerForm.isDisplayed()).toBe(true);
            expect(AddCustomerPage.formLabels.count()).toEqual(3);
        });


        //it makes logic you can put some test cases in same spec!
        it('should list all the labels', () => {
            expect(AddCustomerPage.formLabels.get(0).getText()).toEqual('First Name :');
            expect(AddCustomerPage.formLabels.get(1).getText()).toEqual('Last Name :');
            expect(AddCustomerPage.formLabels.get(2).getText()).toEqual('Post Code :');
        });

        it('should require firstname', () => {
            expect(AddCustomerPage.formRequiredFields.get(0).getAttribute('required')).toEqual('true');
        });

        it('should require lastname', () => {
            expect(AddCustomerPage.formRequiredFields.get(1).getAttribute('required')).toEqual('true');
        });

        it('should require postcode', () => {
            expect(AddCustomerPage.formRequiredFields.get(2).getAttribute('required')).toEqual('true');
        });

        xit('should add a new Custpmer from Excel', () => {
            AddCustomerPage.firstNameInputBox.sendKeys(sh.getRow(2).getCell(1).value);
            AddCustomerPage.lastNameInputBox.sendKeys(sh.getRow(2).getCell(2).value);
            AddCustomerPage.postalCodeInputBox.sendKeys(sh.getRow(2).getCell(3).value);
            AddCustomerPage.formAddCustomerButton.click();
            expect(browser.switchTo().alert().getText()).toContain('Customer added successfully with customer id :');
            browser.switchTo().alert().accept();
        });

        xit('should display newly created account', () => {
            BankManagerPage.openAccountbutton.click();
            name = sh.getRow(2).getCell(1).value+' '+sh.getRow(2).getCell(2).value;
            expect(customerSelectBox.getOptions().getText()).toContain(name);
        });

        xit('should open Account for the new customer', () => {
            firstName = sh.getRow(2).getCell(1).value;
                customerSelectBox.selectByPartialText(firstName);
                currencySlectBox.selectByValue('Dollar');
                AddCustomerPage.processButton.click();
                browser.switchTo().alert().getText().then(function(alertText){
                    expect(alertText).toContain('Account created successfully with account Number :');
                    myArr = alertText.split(" ");
                    myArr = myArr[myArr.length-1].substr(1);
                    myArr=parseInt(myArr);
                    accountNumbers.push(myArr);
                    browser.switchTo().alert().accept();
                    browser.sleep(4000);
                });
        });

        it('should write Account number to Excel', () => {
            sh.getRow(2).getCell(4).value = accountNumbers[0];
            wb.xlsx.writeFile(filePath);
        });



        it('should add a Customer', () => {
            for(i=0; i<BankData.customers.length; i++){
            AddCustomerPage.firstNameInputBox.sendKeys(BankData.customers[i].fName);
            AddCustomerPage.lastNameInputBox.sendKeys(BankData.customers[i].lName);
            AddCustomerPage.postalCodeInputBox.sendKeys(BankData.customers[i].pCode);
            AddCustomerPage.formAddCustomerButton.click();
            expect(browser.switchTo().alert().getText()).toContain('Customer added successfully with customer id');  
            browser.switchTo().alert().accept();

                element(by.xpath("//*[text()='x']"));

        }
        });

        it('should display new customer first name that was created', () => {
            BankManagerPage.customersButton.click();
            expect(Customers.getLastRowValue(1).getText()).toEqual(BankData.customers[2].fName);
        });

        it('should display new customer last name that was created', () => {
            expect(Customers.getLastRowValue(2).getText()).toEqual(BankData.customers[2].lName);
        });

        it('should display new customer post code that was created', () => {
            expect(Customers.getLastRowValue(3).getText()).toEqual(BankData.customers[2].pCode);
        });

        it('should have no account number for the user that was created', () => {
            expect(Customers.getLastRowValue(4).getText()).toEqual('');
        });

    });
    
});