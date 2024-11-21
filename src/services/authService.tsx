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
  login: (email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if email exists
        const user = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (!user) {
          // Email not found
          reject(new Error("EMAIL_NOT_FOUND"));
        } else if (user.password !== password) {
          // Password is incorrect
          reject(new Error("INVALID_PASSWORD"));
        } else {
          // Successful login
          resolve(user);
        }
      }, 500); // Simulate latency
    });
  },

  register: (name: string, email: string, password: string): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const existingUser = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (existingUser) {
          reject(new Error("Email is already registered"));
        } else {
          const newUser: User = { id: users.length + 1, name, email, password };
          users.push(newUser);
          resolve(newUser);
        }
      }, 500); // Simulate latency
    });
  },

  forgotPassword: (email: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (user) {
          resolve("Password reset email sent");
        } else {
          reject(new Error("User not found"));
        }
      }, 500); // Simulate latency
    });
  },

  changePassword: (email: string, newPassword: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("Looking for email:", email); // Debug email input

        const userIndex = users.findIndex(
          (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (userIndex !== -1) {
          console.log("User found:", users[userIndex]); // Log found user
          users[userIndex] = { ...users[userIndex], password: newPassword };
          resolve("Password changed successfully");
        } else {
          console.error("User not found for email:", email); // Log error
          reject(new Error("User not found"));
        }
      }, 500);
    });
  },
};
