let email = document.getElementById("email");
let password = document.getElementById("psw");
let passwordConfirm = document.getElementById("psw-confirm");
let registerBtn = document.getElementById("registerBtn");
let incorrectEmail = document.getElementById("email-error-div");
let incorrectPassword = document.getElementById("psw-error-div");
let incorrectPswConfirm = document.getElementById("psw-confirm-error-div");

const mailRegEx = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-.]+(?:\.com+)$/;
const pswRegEx = /\d/;

let emailIsCorrect;
let pswIsCorrect;
let pswConfirmIsCorrect;

let confirmPassword = function(){
    if(password.value !== passwordConfirm.value && passwordConfirm.value.length!==0){
        document.getElementById("psw-confirm-error-div").innerHTML = 'Your password and confirmation password do not match.';
        return false;
    }
    return true;
}

let checkEmail = function () {
    if(!email.value.match(mailRegEx) && email.value.length!==0){
        document.getElementById("email-error-div").innerHTML = 'Your email must contain "@" and ".com".';
        return false;
    }
    return true;
}

let checkPassword = function () {
    if(password.value.length===0) return;
    let psw = password.value;
    if(password.value.length<8) {
        document.getElementById("psw-error-div").innerHTML = 'Your password must be at least 8 symbols long.';
        return false;
    }else if(psw===psw.toLowerCase()){
        document.getElementById("psw-error-div").innerHTML = 'Your password must contain at least 1 capital letter.';
        return false;
    }else if(!pswRegEx.test(psw)){
        document.getElementById("psw-error-div").innerHTML = 'Your password must contain at least 1 number.';
        return false;
    }
    return true;
}

let emailOnChange = function (){
    emailIsCorrect = checkEmail();
    if(emailIsCorrect)
        incorrectEmail.style.visibility = "hidden";
    else
        incorrectEmail.style.visibility = "visible";
}

let passwordOnChange = function (){
    pswIsCorrect = checkPassword();
    if(pswIsCorrect)
        incorrectPassword.style.visibility = "hidden";
    else
        incorrectPassword.style.visibility = "visible";
    confirmPassword();
}

let pswConfirmOnChange = function (){
    pswConfirmIsCorrect = confirmPassword();
    if(pswConfirmIsCorrect)
        incorrectPswConfirm.style.visibility = "hidden";
    else
        incorrectPswConfirm.style.visibility = "visible";
    checkPassword();
}

email.onchange = function (){
    emailOnChange();
}

password.onchange = function (){
    passwordOnChange();
    pswConfirmOnChange();
}

passwordConfirm.onchange = function (){
    pswConfirmOnChange();
    passwordOnChange();
}

registerBtn.onclick = function(){
    if(email.value.length===0 || password.value.length===0 || passwordConfirm.value.length===0){
        alert("You have to fill all the field!");
        return;
    }

    if(emailIsCorrect && pswIsCorrect && pswConfirmIsCorrect){
        alert("YOU HAVE SIGNED UP");
        email.value = null;
        password.value = null;
        passwordConfirm.value = null;
    }
    else
        alert("Make sure your input is valid.");

}