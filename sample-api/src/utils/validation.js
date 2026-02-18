// FLAW: No JSDoc comments
// FLAW: Weak email validation
function validateEmail(email) {
    return email.includes('@');  // FLAW: too simplistic
}

// FLAW: No password strength check
function validatePassword(pwd) {
    return pwd.length > 6;  // FLAW: weak requirement
}

// FLAW: Inconsistent naming (camelCase vs snake_case)
function check_username(username) {
    return username.length >= 3;
}

// GOOD: Proper validation function (for contrast)
/**
 * Validates a phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
function validatePhone(phone) {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone);
}

module.exports = {
    validateEmail,
    validatePassword,
    check_username,
    validatePhone
};
