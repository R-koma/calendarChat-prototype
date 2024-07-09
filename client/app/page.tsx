"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Register() {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirmation = useRef<HTMLInputElement>(null);

  const serverUrl = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.current?.value !== passwordConfirmation.current?.value) {
      passwordConfirmation.current?.setCustomValidity(
        "パスワードが一致しません"
      );
    } else {
      passwordConfirmation.current?.setCustomValidity("");

      try {
        const user = {
          username: username.current?.value,
          email: email.current?.value,
          password: password.current?.value,
        };
        const res = await axios.post(`${serverUrl}/register`, user);
        router.push("/login");

        if (res.status === 201) {
          console.log("登録完了");
          alert("登録完了");
        }
      } catch (err: any) {
        if (err.response) {
          console.log(err.response.data.message);
          alert("このメールアドレスは既に登録されています");
        } else {
          console.error("Error:", err.message);
          alert("エラーが発生しました。やり直してください。");
        }
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>新規登録</p>
        <input
          className="text-gray-500"
          type="text"
          placeholder="ユーザー名"
          required
          ref={username}
        />
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
        <input
          className="text-gray-500"
          type="password"
          placeholder="確認用パスワード"
          required
          ref={passwordConfirmation}
        />
        <button type="submit">登録</button>
      </form>
    </div>
  );
}
