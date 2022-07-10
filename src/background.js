var browser = browser || chrome;

/*
const addScriptsToPage = (tabId)=>{
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files:["MathEquationComponent.js","script.js"]
    },()=>{
        
        console.log("-------------")
        browser.scripting.getRegisteredContentScripts({}).then((scripts)=>{
            console.log("scripts")
            console.log(scripts)
        })

    });
}
*/

/*
Purpose
This conection gets added to the page to check the current state of the page.  

When it finds the current state it will tell the background script the proper next steps 
*/
const addScriptsToPage = (tabId)=>{
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (tabId) => {

            if(window.addMathEquations != true){
                chrome.runtime.sendMessage({ "tabId": tabId, "request": "ADD_CONTEXT_SCRIPT"}, function (response) {
                    console.log(response);
                });
            }
            else if(document.getElementsByTagName("math-equation-component").length == 0)
            {
                document.body.append(document.createElement("math-equation-component"));
            }
            else{
                //probably tell the ui to close
            }
        },
        args:[tabId]
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log("------------ghot this")
      if (request.request === "ADD_CONTEXT_SCRIPT") {
        chrome.scripting.executeScript({
            target: { tabId: request.tabId },
            files:["MathEquationComponent.js","script.js"]
        });
        sendResponse({status: "yaaaa"});
      }
      else{
        sendResponse({status: "received - but not reponse"});
      }
    }
);

browser.action.onClicked.addListener((tab) => {
    addScriptsToPage(tab.id)
});

browser.commands.onCommand.addListener((command) => {
    console.log(command)
    browser.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        console.log(tabs[0].id);
        if (command == "open-close-extension") {
            addScriptsToPage(tabs[0].id)
        }
    });
});


console.log("started!!!")
