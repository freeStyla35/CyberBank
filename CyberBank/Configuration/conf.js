let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
   
    directConnect : true,
  
//    capabilities: {
//     browserName: 'chrome'
//   },

  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 2
  },
  
  specs: ['../Tests/AddCustomer.spec.js'], 


  //this is how we gonna test these;
  //    protractor conf.js --suite=smoke
//   suites:{ 
//       smoke: ['../Tests/BankManagerSimple.spec.js','../Tests/demo.spec.js'],
//       regression: ['../Tests/*.spec.js']
//   },

onPrepare: function () {
    browser.driver.manage().window().setSize(1040,600);
    jasmine.getEnv().addReporter(new SpecReporter({
        displayFailuresSummary: true,
        displayFailuredSpec: true,
        displaySuiteNumber: true,
        displaySpecDuration: true,
        showstack: false
      }));
      // Add a screenshot reporter and store screenshots to `/tmp/screenshots`:
      jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: '../report/screenshots',
        //lets make it seperate folder not under configuration file
        preserveDirectory: false,
        screenshotsSubfolder: 'images',
         jsonsSubfolder: 'jsons',
         docName: 'CyberBank-Report.html'
     }).getJasmine2Reporter());
  
},
    
    jasmineNodeOpts: {
        showColors: true, 
        defaultTimeoutInterval: 30000,    
        print: function() {}
        
}
};