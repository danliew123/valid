const email = document.querySelector("#email");
const emailValue = email.value;
const emailError = document.querySelector(".email-error");

email.addEventListener("focusout", () => {
  console.log("hi");
  checkEmail();
});

function checkEmail() {
  if (email.validity.valueMissing) {
    email.setCustomValidity("You need to enter an email address.");
    email.reportValidity();
  } else if (email.validity.typeMismatch) {
    email.setCustomValidity("Entered value needs to be an email address.");
    email.reportValidity();
  } else if (email.validity.tooShort) {
    email.setCustomValidity(
      `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`
    );
    email.reportValidity();
  } else {
    email.setCustomValidity("");
  }
}

const ZIP = document.querySelector("#ZIP");
ZIP.addEventListener("input", checkZIP);

function checkZIP() {
  console.log("hi");
  const constraints = {
    sg: ["^(SG-)?\\d{6}$", "Singapore ZIPs must have exactly 6 digits"],
    ms: ["^(MS-)?\\d{5}$", "Malaysia ZIPs must have exactly 5 digits"],
    ch: ["^(CH-)?\\d{5}$", "China ZIPs must have exactly 5 digits"],
    th: [
      "^(TH-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Thailand ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };
  const country = document.querySelector("#country").value;
  const constraint = new RegExp(constraints[country][0], "");
  if (constraint.test(ZIP.value)) {
    ZIP.setCustomValidity("");
  } else {
    ZIP.setCustomValidity(constraints[country][1]);
    ZIP.reportValidity();
  }
}

const password = document.querySelector("#password");
password.addEventListener("input", checkPassword);

function checkPassword() {
  if (password.value.length < 8) {
    password.setCustomValidity("Password must be at least 8 characters");
    password.reportValidity();
  } else {
    password.setCustomValidity("");
  }
}

const confirmPassword = document.querySelector("#confirm-password");
confirmPassword.addEventListener("input", checkConfirmPassword);

function checkConfirmPassword() {
  if (
    password.value !== confirmPassword.value ||
    confirmPassword.value === "" ||
    confirmPassword.value === null
  ) {
    confirmPassword.setCustomValidity("Password not the same!");
    confirmPassword.reportValidity();
  } else {
    confirmPassword.setCustomValidity("");
  }
}

const form = document.querySelector("form");
const button = document.querySelector("button");
form.addEventListener("submit", (event) => {
  if (!email.validity.valid) {
    checkEmail();
    event.preventDefault();
  } else if (!ZIP.validity.valid) {
    checkZIP();
    event.preventDefault();
  } else if (!password.validity.valid) {
    checkPassword();
    event.preventDefault();
  } else if (!confirmPassword.validity.valid) {
    checkConfirmPassword();
    event.preventDefault();
  }
});
