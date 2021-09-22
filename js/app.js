const modal = document.querySelector(".email-modal");
const closeBtn = document.querySelector(".email-modal__close-btn");
const emailInput = document.querySelector(".email-modal__input");
const sendEmailBtn = document.querySelector(".email-modal__btn");
const validateEmailMessage = document.querySelector(".email-modal__message");
const thanksMessage = document.querySelector(".email-modal__thanks");
const denyOfferText = document.querySelector(".email-modal__offer");
let emailState = false;

// open modal when mouse leaves window
function openModal() {
	// check if modal has been opened, if not add visibility to modal to appear
	if (emailState === false) {
		modal.classList.add("email-modal--visible");
		// reset modal state to not open again when already closed
		emailState = true;
	}
}

// remove class from modal to close it
function closeModal() {
	modal.classList.remove("email-modal--visible");
}

// validate email with regex
function validateEmail(email) {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

// show thanks message if email has been validated else show an error message below input field. Clear message and/or thanks message after 3 seconds
function showThanksMessage() {
	if (validateEmail(emailInput.value)) {
		thanksMessage.classList.add("email-modal__thanks--visible");
		setTimeout(() => {
			modal.classList.remove("email-modal--visible");
		}, 3000);
	} else {
		validateEmailMessage.textContent = "Invalid Email Adress";
		validateEmailMessage.classList.add("email-modal__error--message");
		validateEmailMessage.style.color = "red";
		setTimeout(() => {
			validateEmailMessage.textContent = "";
		}, 2000);
	}
}

// detect when mouse leaves window
document.body.addEventListener("mouseleave", openModal);
// close modal when clicking button
closeBtn.addEventListener("click", closeModal);
// close modal when clicking 'not interested'
denyOfferText.addEventListener("click", closeModal);
// show thanks message after validating correct email
sendEmailBtn.addEventListener("click", showThanksMessage);
