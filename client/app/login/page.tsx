"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { login } from "../../redux/slices/authSlice";
import Link from "next/link";

export default function Login() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.current && password.current) {
      const credentials = {
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const resultAction = await dispatch(login(credentials));
        if (login.fulfilled.match(resultAction)) {
          router.push("/calendar");
        } else {
          throw new Error("Login failed");
        }
      } catch (err) {
        console.error("Failed to login:", err);
        alert("ログインに失敗しました。");
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
      <div>
        <Link href="/register">アカウントをお持ちでない場合はこちら</Link>
      </div>

      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
