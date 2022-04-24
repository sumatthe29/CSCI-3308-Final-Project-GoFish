
/** 
 * Validate that the entered passwords are the same. If not, ask user to resubmit with matching passwords
Validate that the enetered email address is a valid one (has an @xxxxxx.com at the end)
Maybe also check that email site exists? (Not sure how feasible)

*/

// Utilized on Registration -> Password and Confirm Password
// function checkPassword(form){
//     password1 = form.password1.value;
//     password2 = form.password2.value;

//     // If password not entered
//     if (password1 == '')
//         alert ("Please enter Password");
          
//     // If confirm password not entered
//     else if (password2 == '')
//         alert ("Please enter confirm password");
          
//     // If Not same return False.    
//     else if (password1 != password2) {
//         alert ("\nPassword did not match: Please try again...")
//         return false;
//     }

//     // Confirmation function (will be phased out once we can confirm full reg page functionality)
//     else{
//         alert("GoFish!")
//         return true;
//     }
//   }

  function checkPassword(form){

    //grabs the passwords by id to compare them
    password1 = form.password1.value;
    password2 = form.password2.value;

    // If password not entered
    if (password1 == '')
        alert ("Please enter a Password");
          
    // If confirm password not entered
    else if (password2 == '')
        alert ("Please confirm password");
          
    // If Not same return False.    
    else if (password1 != password2) {
        alert ("\nPassword did not match: Please try again...")

        //This clears only the confrim password input so users can try again
        document.getElementById("confirm_password").value = "";
        return false;
    }

    // Confirmation function (will be phased out once we can confirm full reg page functionality)
    else{
        alert("GoFish!")
        return true;
    }
  }

// Utilized on Registration UserHandle

// NOTE: May want to implement this as a universal function after confirming its usefulness as a simple
// profanity filter

function invalidusernames(id) {  
    
    // We may need to expand on this later, most likely implement the array for which all our other usernames
    // are stored so that duplicate usernames cannot exist
    var restrictedWords = new Array("kill", "fight", "slap", "hick", "fuck", "shit", "bitch", "ass", "tits", "pussy", "dick", "damn", "goddamn", "god",); 
    
    
    var txtInput = document.getElementById(id).value;  
    var error = 0; 
    
    //for loop iterates through individual chars to determine if input includes a risk word
    for (var i = 0; i < restrictedWords.length; i++) {  
        var val = restrictedWords[i];  
        if ((txtInput.toLowerCase()).indexOf(val.toString()) > -1) {  
            error = error + 1;  
        }  
    }  

    if (error > 0) {  
        alert("\nInput contains invalid language")
        document.getElementById(id).value = "";
        return false
        
    }  
    else {  
        return true  
    }  
}  

//Below is copied/adapated from my work on lab 5 -- Spencer
function checkInput() {
    /* Note that you do NOT have to do a document.getElementById anywhere in this exercise. Use the elements below */
    var myInput = document.getElementById("pword");
    var confirmMyInput = document.getElementById("confirmpword");
    var emailInput = document.getElementById("email");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var symbol = document.getElementById("symbol"); 
    var length = document.getElementById("length");
    var match = document.getElementById("match");
    var isEmail = document.getElementById("isEmail");
  
    // When the user starts to type something inside the password field
    myInput.onkeyup = function () {
  
      /* TODO: Question 1.1: Starts here */
      var lowerCaseLetters = /[a-z]/g; // : Fill in the regular expression for lowerCaseLetters
      var upperCaseLetters = /[A-Z]/g; // : Fill in the regular expression for upperCaseLetters
      var numbers = /[0-9]/g; // Fill in the regular expression for digits
      var symbols = /[!@#$%^&*()]/g; // Fill in the regular expression for symbols
      var minLength = 12; // : Change the minimum length to what what it needs to be in the question
      /* TODO: Question 1.1: Ends here */
  
      /* TODO: Question 1.2:  Starts here */
      /*
           - So first read up on classList.  
           - Perform a console.log(letter.classList) and check the array that you see. By default the first time, there should be just 1 element and it should be
           "invalid". "invalid" is a class that is present in login.css. 
           - Below, there are a bunch of if blocks and else blocks.
           - Each if block means that some successful condition is satisfied for our password condition. So the red cross need to be converted to a check mark.
           - Each else block stands for a failed condition, so the green check mark needs to be a red cross again.
           - All that you need to do is, in each of the blocks, fill in the correct classNames for the remove and the add methods.
           */
  
      // Validate lowercase letters
      if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
      } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
      }
  
      // Validate capital letters
      if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
      } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
      }
  
      // Validate numbers
      if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
      } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
      }
  
      // Validate symbols
      if (myInput.value.match(symbols)) {
        symbol.classList.remove("invalid");
        symbol.classList.add("valid");
      } else {
        symbol.classList.remove("valid");
        symbol.classList.add("invalid");
      }
  
      // Validate length
      if (myInput.value.length >= minLength) {
        length.classList.remove("invalid");
        length.classList.add("valid");
      } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
      }
      /* TODO: Question 1.2:  Ends here */
    };;
    /* TODO Question 1.3: Starts here */
    confirmMyInput.onkeyup = function () {
      // Validate password and confirmPassword
      var passEqualsConfPass = (myInput.value === confirmMyInput.value); // TODO: Change this to the condition that needs to be checked so that the text entered in password equals the text in confirm password
      if (passEqualsConfPass) {
        match.classList.remove("invalid");
        match.classList.add("valid");
      } else {
        match.classList.remove("valid");
        match.classList.add("invalid");
      }
      /* TODO Question 1.3: Starts here */
      emailInput.onkeyup = function () {
        var emailFormat = /[a-zA-Z0-9]@[a-zA-Z].com$/;
        if (emailInput.value.match(emailFormat)) {
            isEmail.classList.remove("invalid");
            isEmail.classList.add("valid");
        } else {
            isEmail.classList.remove("valid");
            isEmail.classList.add("invalid");
        }
      }
      // Disable or Enable the button based on the elements in classList
      enableButton(letter, capital, number, symbol, length, match, isEmail);
    };
  }
  
  function enableButton(letter, capital, number, symbol, length, match, isEmail) {
    // TODO: Clear this function for students to implement
    var button = document.getElementById("register_button");
    var condition = (letter.classList.contains("valid") && capital.classList.contains("valid") && number.classList.contains("valid") && symbol.classList.contains("valid") && length.classList.contains("valid") && match.classList.contains("valid") && isEmail.classList.contains("valid")); // TODO: Replace false with the correct condition
    if (condition) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  }
  