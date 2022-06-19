var browser = browser || chrome;




browser.commands.onCommand.addListener((command) => {

    browser.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
        console.log(tabs[0].id);
        if (command == "open-close-extension") {
            
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id},
                files:["script.js"]
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


