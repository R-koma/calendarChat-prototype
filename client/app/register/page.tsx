"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slices/authSlice";
import { AppDispatch, RootState } from "../../redux/store";

export default function Register() {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordConfirmation = useRef<HTMLInputElement>(null);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.current?.value !== passwordConfirmation.current?.value) {
      passwordConfirmation.current?.setCustomValidity(
        "パスワードが一致しません"
      );
    } else {
      passwordConfirmation.current?.setCustomValidity("");

      if (username.current && email.current && password.current) {
        const credentials = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        };
        const resultAction = await dispatch(register(credentials));
        if (register.fulfilled.match(resultAction)) {
          router.push("/login");
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
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
    </div>
  );
}
