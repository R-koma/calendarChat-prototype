"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { RootState } from "../../redux/store";
import { setUser } from "../../redux/slices/authSlice";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { user, status } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("access_token");
        if (!token) {
          router.push("/login");
          return;
        }

        const serverUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await axios.get(`${serverUrl}/calendar`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUser(response.data.user));
      } catch (error) {
        router.push("/login");
      }
    };

    if (!user && status !== "loading") {
      fetchData();
    }
  }, [user, status, router, dispatch]);

  return { user, status };
};
