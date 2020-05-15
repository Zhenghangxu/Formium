const pwdBox = document.querySelector("input#password");
const mainForm = document.querySelector("#main_form");
const fields = document.querySelectorAll("#main_form .input-field>input");

class formValidate{

  static isMatch(type,string){
    switch (type) {
      case "email":
        const emailRegex = /\w+@\w+\.\w+/;
        return emailRegex.test(string)   
        break;
      case "postal":
        const postalRegex = /[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d/;
        return postalRegex.test(string)
        break;
      case "password":
        // 

        const pwdRegexs = {
          pwdChar:/(?=.{8})/, //At least 8 characters
          pwdUpp:/(?=[A-Z])/, //At least 1 uppercase
          pwdNum:/(?=\d)/, //At least one number
          pwdSpc:/(?=[\W_])/, //At least one special character
        };
        for (const reType in pwdRegexs) {
          let result = pwdRegexs[reType].test(string);
          pwdRegexs[reType] = result
        }
        return pwdRegexs;
        break;
      
      default:
        break;
    }

  }

  static alertInvalid(ele,type){
    let msg;

    switch (type) {
// Customize alert msg
      case "email":
        msg =  "Email Address not valid"
        break;
      case "postal":
        msg =  "Postal Code not valid"
        break;
      case "password2":
        msg =  "Password not match"
        break
      default:
        break;
    };

    const alertEle = document.createElement("span");
    alertEle.className = "helper-text red-text lighten-1";
    alertEle.innerHTML = `
      <p>${msg}</p>
    `
    const insertedAlert = ele.parentElement.appendChild(alertEle);
    ele.className = "invalid";
    setTimeout(() => {
      insertedAlert.remove();
      ele.className="";
    }, 3000);
    
    
  }
  static checkPwd(e){
    const PwdElement = e.target;
    let PwdMatchResult = formValidate.isMatch(PwdElement.id,PwdElement.value);
    for (let property in PwdMatchResult) {
      if (PwdMatchResult[property]) {
        document.querySelector(`#${property}>i`).innerHTML = "check_circle";
        document.querySelector(`#${property}`).className = "collection-item success";

      } else {
        document.querySelector(`#${property}>i`).innerHTML = "error"; 
        document.querySelector(`#${property}`).className = "collection-item alert"; 
      }
    }


  }
}

const validateInput=(event)=>{
  const element = event.target

  switch (element.id) {
    
    case "postal":
    case "email":
      // check if regular expression can match the field value
      let matchResult = formValidate.isMatch(element.id,element.value)
      if(!matchResult){
        formValidate.alertInvalid(element,element.id);
      };
      break;
    case "password2":
      if (element.value !== pwdBox.value) {
        formValidate.alertInvalid(element,element.id);
      }
    default:
      break;
  }

}


// Listen of blur event, get the value, and match it against Regex


fields.forEach((field)=>{
  field.addEventListener("blur",validateInput)
})

// Listen for submit


mainForm.addEventListener("submit",(e)=>{
  e.preventDefault();
})

// listen for on key down in the password box
pwdBox.addEventListener("keyup",formValidate.checkPwd)
