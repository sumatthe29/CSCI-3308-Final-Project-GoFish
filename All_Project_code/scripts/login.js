
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