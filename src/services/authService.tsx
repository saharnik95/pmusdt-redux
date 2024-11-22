interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Mock user data
const users: User[] = [
  {
    id: 1,
    name: "sahar",
    email: "saharnikkhah81@gmail.com",
    password: "123456",
  },
];

export const authService = {
  /**
   * Handles user login
   * @param email - User's email
   * @param password - User's password
   * @returns A Promise resolving with the user data or rejecting with an error
   */
  login: (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Find the user by email (case-insensitive comparison)
        const user = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (!user) {
          // If no user with the provided email exists
          reject(new Error("EMAIL_NOT_FOUND"));
        } else if (user.password !== password) {
          // If the password does not match the stored password
          reject(new Error("INVALID_PASSWORD"));
        } else {
          // Successful login
          resolve(user);
        }
      }, 500); // Simulate a 500ms delay for asynchronous behavior
    });
  },

  /**
   * Handles user registration
   * @param name - New user's name
   * @param email - New user's email
   * @param password - New user's password
   * @returns A Promise resolving with the newly created user data or rejecting with an error
   */
  register: (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if the email is already registered
        const existingUser = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (existingUser) {
          // Reject if the email is already taken
          reject(new Error("Email is already registered"));
        } else {
          // Create a new user and add it to the `users` array
          const newUser: User = { id: users.length + 1, name, email, password };
          users.push(newUser);
          resolve(newUser);
        }
      }, 500); // Simulate a 500ms delay for asynchronous behavior
    });
  },

  /**
   * Handles password reset requests
   * @param email - User's email to reset the password
   * @returns A Promise resolving with a success message or rejecting with an error
   */
  forgotPassword: (email: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Find the user by email (case-insensitive comparison)
        const user = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (user) {
          // Simulate sending a password reset email
          resolve("Password reset email sent");
        } else {
          // Reject if the user is not found
          reject(new Error("User not found"));
        }
      }, 500); // Simulate a 500ms delay for asynchronous behavior
    });
  },

  /**
   * Handles changing the user's password
   * @param email - User's email
   * @param newPassword - The new password to set
   * @returns A Promise resolving with a success message or rejecting with an error
   */
  changePassword: (email: string, newPassword: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Looking for email:", email); // Debug: log the input email

        // Find the index of the user with the given email
        const userIndex = users.findIndex(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (userIndex !== -1) {
          // If user exists, update their password
          console.log("User found:", users[userIndex]); // Debug: log the found user
          users[userIndex] = { ...users[userIndex], password: newPassword };
          resolve("Password changed successfully");
        } else {
          // If no user is found with the given email
          console.error("User not found for email:", email); // Debug: log error
          reject(new Error("User not found"));
        }
      }, 500); // Simulate a 500ms delay for asynchronous behavior
    });
  },
};
