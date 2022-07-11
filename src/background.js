var browser = browser || chrome;


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
            else if(document.getElementsByTagName("math-equation-extension").length == 0)
            {
                document.body.append(document.createElement("math-equation-extension"));
            }
            else{
                //probably tell the ui to close
            }
        },
        args:[tabId]
    });
}

//communication from webpage back to the background script
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

//actions when click the browser extension ui
browser.action.onClicked.addListener((tab) => {
    addScriptsToPage(tab.id)
});

//actions when you run keyboard shortcut
browser.commands.onCommand.addListener((command) => {
    console.log(command)
    browser.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        console.log(tabs[0].id);
        if (command == "open-close-extension") {
            addScriptsToPage(tabs[0].id)
        }
    });
});

const defaultSettings = {
    "orientation": "bottom"
}

console.log(Object.keys(defaultSettings))

//set the default values for the storage
const listKeys = Object.keys(defaultSettings);
chrome.storage.sync.get(listKeys, function(result) {
    listKeys.forEach((key)=>{
        if(result[key] === undefined)
        {
            chrome.storage.sync.set({[key]: defaultSettings[key]}, function() { console.log("asdded") });
        }
        else{
            console.log(key + " - exists")
        }
    });

});
