console.log("this loaded !!!!!!!!!!!!!!!!!!!!!!!")
console.log("this loaded !!!!!!!!!!!!!!!!!!!!!!!")
console.log("this loaded !!!!!!!!!!!!!!!!!!!!!!!")
console.log("this loaded !!!!!!!!!!!!!!!!!!!!!!!")

console.log(document)



window.addMathEquations = true;

class MathEquationExtension extends HTMLElement {
    constructor() {
      // Always call super first in constructor
      super();
      const shadow = this.attachShadow({mode: 'open'});

      const mathComponent = document.createElement('math-equation-component');
      shadow.appendChild(mathComponent)

      mathComponent.addEventListener('math-equation-gen-save',function(e){
        console.log(e)
      })
      
      mathComponent.addEventListener('math-equation-exit',()=>{
        this.remove();
      })

    }
  }

customElements.define('math-equation-extension', MathEquationExtension);

const mathExtension = document.createElement('math-equation-extension');
document.body.append(mathExtension)