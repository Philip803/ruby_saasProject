//Documnet ready
$(document).on('turbolinks:load',function(){
  var theForm = $('#pro_form');
  var submitBtn = $("#form-submit-btn");

  //Set Stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));

  //When user clicks form submit button,
  submitBtn.click(function(event){
    //prevent default submission behavior.
    event.preventDefault();
    submitBtn.val("Processing").prop("disabled", true);  //change word to process and disable

    //Collect the credit card fields.
    var ccNum = $("#card_number").val(),
        cvcNym = $("#card_code").val(),
        expMonth = $("#card_month").val(),
        expYear = $("#card_year").val();

    // # Use Stripe JS library to check for card errors.
    var error = false;

    //Validate card number.
    if(!Stripe.card.validateCardNumber(ccNum)){
      error = true;
      alert("The credit card number appears to be invalid.");
    }

    //Validate cvc number
    if(!Stripe.card.validateCVC(cvcNum)){
      error = true;
      alert("The cvc number appears to be invalid.");
    }

    //Validate cvc number
    if(!Stripe.card.validateExpiry(expMonth, expYear)){
      error = true;
      alert("The expiration date appears to be invalid.");
    }

    //Send the card info to Stripe.
    if(error){
      //If there are card errors, dont send to Stripe
      submitBtn.prop("disabled",false).val("Sign Up");
    } else {
      //Send the card info to Stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }

    return false;
  });

  //Strip will return a card token.
  function stripeResponseHandler(status, response){
    //Get the token from the response
    var token = response.id;

    //Inject the card token to the hidden field.
    theForm.append($('<input typpe="hidden" name="user[stripe_card_token]">').val(token));

    //Submit form to our Rails app.
    theForm.get(0).submit();

  }

});