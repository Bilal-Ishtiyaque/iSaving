// variable for Similar offers dropdown
let similarOffers = document.querySelectorAll(".s_offer");
// variables for menubar and overlay
const menubar = document.querySelector(".mobile_menu");
const menuToggler = document.querySelectorAll("[data-menu-toggler]");
const menubarLinks = document.querySelectorAll(".menu-link");
const overlay = document.querySelector("[data-overlay]");
//variable for FAQs dropdown 
let question = document.querySelectorAll(".question");
// variables for redirecting animation
let redirectPopup = document.getElementById("redirect-popup");
let redirectLinks = document.querySelectorAll(".redirect-link");
let countdownElement = document.getElementById("countdown");
const couponModal = document.querySelector(".coupon_card");
// Select the content elements in the coupon card
const couponTitle = document.querySelector(".coupon_title");
const couponDescription = document.querySelector(".coupon_description");
const couponValidation = document.querySelector(".coupon_validation");
const couponOverlay = document.getElementById("coupon-overlay");
var cpnBtn = document.getElementById("cpnBtn");
var cpnCode = document.getElementById("cpnCode");





// -----------------------------------------------------------
// DECLARING FUNCTIONS FIRST:
// -----------------------------------------------------------



// FUNCTION FOR ADDING EVENT LISTENER ON ELEMENTS
const addEventOnElement = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

// xxxxxxxx

//FUNCTIONS FOR MENU BAR OPEN AND CLOSE
const toggleMenu = function () {
  menubar.classList.toggle("active");
  overlay.classList.toggle("active");
}
const closeMenu = function () {
  menubar.classList.remove("active");
  overlay.classList.remove("active");
}

// xxxxxxxx

//FUNCTION TO COPY THE CODE ON CLICKING THE COPY ICON IN "SIMILAR OFFERS"
function CopySimilarOfferCode(offer){

let button = offer.querySelector("button");

  button.addEventListener("click", function () {

    let code = offer.querySelector("span").textContent;

    let tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = code;
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    offer.classList.add("active");

    setTimeout(function () {
      offer.classList.remove("active");
    }, 500);

  });
}

// xxxxxxxx

// FUNCTION TO HANDLE SIMILAR OFFER DROPDOWN 
function toggleOffers() {
  const offersWrapper = document.getElementById('similarOffersContainer');
  const arrow = document.querySelector('.arrow');

  if (offersWrapper.classList.contains('expanded')) {
    offersWrapper.classList.remove('expanded');
    arrow.innerHTML = '&#9662;'; // Down arrow
  } else {
    offersWrapper.classList.add('expanded');
    arrow.innerHTML = '&#9652;'; // Up arrow
  }
}

// xxxxxxxx

// FUNCTION TO HANDLE FAQ ACCORDIAN
function FAQsAccordian(event) {
  const question = event.currentTarget; // Set the clicked question as the active one
  const active = document.querySelector(".question.active");

  // Close any previously opened question
  if (active && active !== question) {
    active.classList.toggle("active");
    active.nextElementSibling.style.maxHeight = 0;
  }

  // Toggle the clicked question's active state
  question.classList.toggle("active");
  const answer = question.nextElementSibling;

  // Set maxHeight to open/close the answer
  if (question.classList.contains("active")) {
    answer.style.maxHeight = answer.scrollHeight + "px";
  } else {
    answer.style.maxHeight = 0;
  }
}

// xxxxxxxx

//FUNCTION TO DISPLAY THE REDIRECT ANIMATION BOX AND START THE COUNTDOWN
function startRedirectCountdown(url) {
  let countdown = 3; // Start countdown from 3 seconds
  countdownElement.textContent = countdown;
  redirectPopup.style.visibility = "visible";
  redirectPopup.style.opacity = 1;

  const countdownInterval = setInterval(() => {
    countdown -= 1;
    countdownElement.textContent = countdown;

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      window.open(url, "_blank"); // Open the URL in a new tab
      redirectPopup.style.visibility = "hidden"; // Hide the redirect popup after redirection
      redirectPopup.style.opacity = 0;
    }

  }, 1000); // Countdown interval: 1 second
}

// FUNCTION TO CLOSE COUPON MODAL
const closeCouponModal = function () {
  //closing coupon modal
  couponModal.style.visibility = "hidden";
  couponModal.style.opacity = 0;
  
  //closing overlay 
  couponOverlay.classList.remove("active");
};

// FUNCTION TO SHOW COUPON MODAL
const showCouponModal = function (dealTitle, dealDescription, dealDate, code) {
  // Set coupon card/modal content
  couponTitle.textContent = dealTitle;
  couponDescription.textContent = dealDescription;
  couponValidation.textContent = `Valid Till: ${dealDate}`;
  cpnCode.textContent = code;
  // SHOW COUPON MODAL AND ITS OVERLAY
  couponModal.style.visibility = "visible";
  couponModal.style.opacity = 1;
  couponOverlay.classList.add("active");
  
};


//FUNCTION TO HANDLE ANIMATION ON "GET DEAL" BUTTON, TO SHOW REDIRECT BOX AND TO SHOW COUPON MODAL
function AnimateIt (event) {
  event.preventDefault();
  const redirectUrl = this.getAttribute("href");
  const code = this.getAttribute("data-cpnCode");
  // Show button animation by adding the 'active' class
  this.classList.add("active");
  // Show the redirect popup animation
  startRedirectCountdown(redirectUrl);
  // Get the deal data
  const deal = this.closest(".deal");
  const dealTitle = deal.querySelector(".deal_title").textContent;
  const dealDescription = deal.querySelector(".deal_description").textContent;
  const dealDate = deal.querySelector(".deal_date").textContent;
  
  // Wait for the button animation to finish before displaying the coupon modal
  setTimeout(() => {
    // Update the coupon modal content
    showCouponModal(dealTitle, dealDescription, dealDate, code);
    this.classList.remove("active"); // Remove 'active' class from button after animation
  }, 3000);
}


// xxxxxxxx






// ---------------------------------------------
//ADDING EVENT LISTENERS:
// ---------------------------------------------

//ADDING EVENT LISTENERS ON MENU HAMBURGER BUTTON AND ON THE CLOSE "X" MENU BUTTON
menubarLinks.forEach((menuLink)=>{
  menuLink.addEventListener("click", closeMenu);
})
menuToggler.forEach((toggleBtn)=>{
  toggleBtn.addEventListener("click", toggleMenu);
});


//ADDING EVENT LISTENER ON EACH SIMILAR OFFER "COPY ICON" PRESENT IN SIMILAR OFFER DROPDOWN
similarOffers.forEach((offer) => {
  CopySimilarOfferCode(offer); // Pass each offer to the function
});

// ADDING EVENT LISTENER FOR FAQ
const questions = document.querySelectorAll(".question");
questions.forEach(question => {
  question.addEventListener("click", FAQsAccordian);
});

//ADDING EVENT LISTENER ON "GET DEAL" BUTTON
redirectLinks.forEach((anchorLinks)=>{
  anchorLinks.addEventListener("click", AnimateIt);
});


// Function to copy coupon code
cpnBtn.onclick = function(){
  navigator.clipboard.writeText(cpnCode.innerHTML);
  cpnBtn.innerHTML ="COPIED!";
  setTimeout(function(){
      cpnBtn.innerHTML="COPY";
  }, 3000);
}

//ADDING EVENT LISTENER ON OVERLAY WHICH SHOWS WHEN THE COUPON POP-UP MODAL OPENS
//IF USER CLICKS OUTSIDE OF THE COUPON MODAL, so THERE IS OVERLAY OUTSIDE IT, AND THE CLICK WILL BE ON CLICKED ON OVERLAY, AND WHEN OVERLAY LISTENS ANY CLICK ON IT, SO IT WILL CLOSE ITSELF ALONG WITH THE MODAL.
couponOverlay.addEventListener("click", closeCouponModal);



















