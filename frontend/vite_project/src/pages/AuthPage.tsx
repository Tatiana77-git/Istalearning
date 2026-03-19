
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./AuthPage.css";


function AuthPage() {

  const [mode, setMode] = useState <"signup" | "login">("signup");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,  setConfirmPassword] = useState("")
  const [message, setMessage] = useState("");

  const location = useLocation ();

 const redirectTo = 
 new URLSearchParams(location.search).get("redirect") || "/";


  const handleSignup = () => {

    if (password !== confirmPassword) {
  setMessage("Passwords do not match");
  return;
}
    fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({
        email,
        phone,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || "Account created");
      })
      .catch(() => {
        setMessage("Server error");
      });
  };
    
       const handleLogin = () => {
  fetch("http://localhost:3000/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.token) {
        setMessage("Invalid email or password");
        return;
      }
      localStorage.setItem("token", data.token);
      window.location.href = redirectTo || "/";
 
    })
    .catch(() => {
      setMessage("Server error");
    });
};


  return (
    <div className="signup-container">
      <div className="signup-card">
      <h1>{mode === "signup" ? "Sign up" : "Login"}</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />



      {mode  === "signup" && (
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
         )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        

        {mode === "signup" && (
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />   
        
        )}
  <div className="auth-buttons">
  <button
    onClick={() => {
      setMessage("");
      mode === "signup" ? handleSignup() : setMode("signup");
    }}
  >
    Sign up
  </button>

  <button
    onClick={() => {
      setMessage("");
      mode === "login" ? handleLogin() : setMode("login");
    }}
  >
    Login
  </button>
</div>

       
        {mode === "login" && (
  <p
    className="forgot-password-link"
    onClick={() => window.location.href = "/forgot-password"}
  >
    Mot de passe oublié ?
  </p>
)}

        <p>{message}</p>
      </div>
    </div>
  );
}

export default AuthPage;