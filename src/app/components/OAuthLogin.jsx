import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setProfile,
  setToken,
  fetchTodos,
  setTodos
} from "../features/todo/todoSlicer";
import axios from "axios";
import { BASE_URL, GOOGLE_ICON } from "../constants/todoConstants";
import ClipLoader from "react-spinners/ClipLoader";
function OAuthLogin() {
  const userData = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [loginSuccess, setLoginSuccess] = useState(false);
  const isLoading = useSelector((state) => state.loading);
  const logout = () => {
    dispatch(setLoading(true));
    dispatch(setToken(""));
    setLoginSuccess(false);
    dispatch(setProfile(null));
    dispatch(setLoading(false));
    dispatch(setTodos([]))
  };
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      dispatch(setLoading(true));
      if (tokenResponse) {
        dispatch(setToken(tokenResponse.access_token));
        if (tokenResponse.access_token != "") {
          await axios
            .get(BASE_URL + "get-user-data?token=" + tokenResponse.access_token)
            .then((response) => {
              dispatch(setProfile(response.data.data));
              setLoginSuccess(true);
              dispatch(fetchTodos());
              dispatch(setLoading(false));
            })
            .catch((r) => {
              dispatch(setLoading(false));
            });
        }
      }
    },
    onError: (response) => setLoginSuccess(false),
  });
  return (
    <div
      className={`container d-flex flex-column mt-5 justify-content-center ${
        isLoading ? "" : ""
      }`}
    >
      <ClipLoader
        loading={isLoading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h3 className="text-center">
        Hey There{" "}
        {userData != null ? userData?.given_name : "Login to continue"}
      </h3>
      {loginSuccess ? (
        <button className="google-login-button" onClick={() => logout()}>
          <img
            src={userData?.picture}
            alt="Google Icon"
            className="google-icon"
          />
          <span className="button-text">Logout {userData?.given_name}</span>
        </button>
      ) : (
        <>
          <p className="text-black-50 text-center">
            {" "}
            The task manger where you can add, mark, update and delete your
            custom tasks{" "}
          </p>
          <button className="google-login-button" onClick={() => login()}>
            <img src={GOOGLE_ICON} alt="User Picture" className="google-icon" />
            <span className="button-text">Login with Google</span>
          </button>
        </>
      )}
    </div>
  );
}

export default OAuthLogin;
