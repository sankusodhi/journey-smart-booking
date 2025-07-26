// src/components/Auth.jsx
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    let result;

    if (isLogin) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }

    if (result.error) {
      setMessage(result.error.message);
    } else {
      setMessage("Success! Check your email.");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">{isLogin ? "Login" : "Signup"}</button>
        <br />
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}
