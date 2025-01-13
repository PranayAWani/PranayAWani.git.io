// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCPVKX0xD12qUuZUsVMJML3ziYmM_zG27U",
    authDomain: "hardware-c4141.firebaseapp.com",
    projectId: "hardware-c4141",
    storageBucket: "hardware-c4141.appspot.com",
    messagingSenderId: "952737919097",
    appId: "1:952737919097:web:4fc7c24e916a2106d5a4a8",
    measurementId: "G-NSLYTPT3NC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle form submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    try {
        // Sign in with Firebase Email/Password
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert(`Welcome ${user.email}`);
        window.location.href = "home.html"; // Redirect to home page after successful login
    } catch (error) {
        console.error("Error logging in:", error);
        errorMsg.textContent = "Invalid email or password.";
    }
});

// Google login functionality
document.getElementById('google-login').addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        alert(`Welcome ${user.displayName}`);
        window.location.href = "home.html"; // Redirect after login
    } catch (error) {
        console.error("Google login error:", error);
        alert("Error during Google login. Please try again.");
    }
});
