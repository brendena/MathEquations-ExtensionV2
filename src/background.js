var browser = browser || chrome;




browser.commands.onCommand.addListener((command) => {
    console.log(commanduu)
    browser.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        console.log(tabs[0].id);
        if (command == "open-close-extension") {
            
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id},
                files:["MathEquationComponent.js","script.js"]
            },()=>{
                
                console.log("-------------")
                browser.scripting.getRegisteredContentScripts({}).then((scripts)=>{
                    console.log("scripts")
                    console.log(scripts)
                })

            });
            
        }
    });
});


console.log("started!!!")
