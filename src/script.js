var browser = browser || chrome;







//used to tell if this scrip has been loaded
window.addMathEquations = true;






class MathEquationExtension extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
      const shadow = this.attachShadow({mode: 'open'});

      const mathComponent = document.createElement('math-equation-component');
      shadow.appendChild(mathComponent)

      mathComponent.addEventListener('math-equation-gen-save',function(e){
        console.log(e.detail)
        Object.keys(e.detail).forEach((key)=>{
          chrome.storage.sync.set({[key]: e.detail[key]}, function() {});
        });
      })
      
      mathComponent.addEventListener('math-equation-exit',()=>{
        this.remove();
      })



      const savedSettings = ["orientation"]

      browser.storage.sync.get(savedSettings, (data) => {
        Object.keys(data).forEach((key)=>{
          console.log(key)
          mathComponent.setAttribute(key,data[key])
        });
      });

      //listen for extension storage change
      browser.storage.onChanged.addListener(function (changes, namespace) {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
          mathComponent.setAttribute(key,newValue);
        }
      });

    }
  }

customElements.define('math-equation-extension', MathEquationExtension);

const mathExtension = document.createElement('math-equation-extension');
document.body.append(mathExtension)







