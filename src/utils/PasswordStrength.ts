export function checkPasswordStrength(password: string): string {
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  const mediumRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/;

  if (strongRegex.test(password)) {
    return "Strong!";
  } else if (mediumRegex.test(password)) {
    return "Medium";
  } else if (password.length >= 6) {
    return "Weak";
  } else {
    return "Very Weak";
  }
}
