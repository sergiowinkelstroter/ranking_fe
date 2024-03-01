"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../service/firebase";
import { useRouter } from "next/navigation";
import { Loading } from "@/app/components/Loading";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function SignIn() {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/");
        toast.success("Login feito com sucesso");
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Algo de errado aconteceu! Tente novamente");
        setEmail("");
        setPassword("");
        setLoading(false);
      });

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24 ">
      <div className="flex flex-col gap-6 border-2 border-white p-6 rounded-md mt-4 w-96 justify-center text-black">
        <label className="flex gap-2 items-center ">
          <input
            type="email"
            className="p-2 rounded-md border focus:outline-none w-full"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="flex gap-2 items-center ">
          <input
            type="password"
            className="p-2 rounded-md border focus:outline-none w-full"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          onClick={SignIn}
          className="bg-white rounded-md p-2 text-black font-bold hover:opacity-75 transition-opacity"
        >
          {loading ? <Loading /> : "Entrar"}
        </button>
      </div>
    </main>
  );
}
