"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function Login() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const serverUrl = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = {
        email: email.current?.value,
        password: password.current?.value,
      };
      const res = await axios.post(`${serverUrl}/login`, user);
      router.push("/calendar");

      if (res.status === 200) {
        console.log("ログイン完了");
        alert("ログイン完了");
      }
    } catch (err: any) {
      if (err.response) {
        console.error("Error:", err.response.data.message);
        alert("メールアドレスまたはパスワードが間違っています");
      } else {
        console.error("Error:", err.message);
        alert("エラーが発生しました。やり直してください。");
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>ログインはこちらから</p>
        <input
          className="text-gray-500"
          type="email"
          placeholder="メールアドレス"
          required
          ref={email}
        />
        <input
          className="text-gray-500"
          type="password"
          placeholder="パスワード"
          required
          ref={password}
        />
        <button type="submit">ログイン</button>
      </form>
    </div>
  );
}
