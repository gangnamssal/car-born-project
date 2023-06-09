import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import LoginID from "../../components/auth/login/LoginID";
import LoginPassword from "../../components/auth/login/LoginPassword";
import React, { useState, useEffect, ButtonHTMLAttributes } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../modules/takeLoginLogoutModule";
import {
  companyModifyPasswordReset,
  userModifyPasswordReset,
} from "../../modules/modifyPasswordModule";
import { IsCanSignUpReset } from "../../modules/signUpModule";
import Nav2 from "./../../components/Nav2";
import swal from "sweetalert";
import { loginFailureReset } from "./../../modules/takeLoginLogoutModule";

export const StyleLoginContainer = styled.div`
  width: 100vw;
  background-color: white;
`;

export const StyleLoginCenterDiv = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const StyleLink = styled(Link)`
  color: #d23131;
  font-size: 0.75rem;
  font-weight: 900;
  text-decoration: none;
  margin: 0 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

interface IStyleLoginBoxDivProps {
  border: string;
}

export const StyleLoginBoxDiv = styled.div<IStyleLoginBoxDivProps>`
  width: 30vw;
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: #ffffff;
  border: 2px solid ${(props) => props.border};
  border-radius: 5px;
`;

export const StyleLoginForm = styled.form`
  margin-top: 3rem;
  width: 17vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyleLoginBtn = styled.button<StyleLoginSignUpBtnProps>`
  width: 15.5vw;
  height: 2.5rem;
  margin-bottom: 1rem;
  margin-left: 0.1rem;
  color: white;
  border-radius: 5px;
  font-weight: 900;
  font-size: 1rem;
  /* box-shadow: 4px 4px 2px rgba(0, 0, 0, 0.3); */

  &:active {
    box-shadow: none;
  }

  &:hover {
    opacity: 0.8;
  }

  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
`;

export const StyleLoginAnotherLink = styled.div`
  text-decoration: none;
  margin-bottom: 5rem;
`;

// 로그인 인풋 데이터 타입
export interface loginInputType {
  loginid: string;
  loginpassword: string;
  captcha?: string;
  success?: boolean;
}

// CSS 타입
export interface StyleLoginSignUpBtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  backgroundColor: string;
}

// 로그인 props를 정의하는 인터페이스 타입
export interface LoginInputProps {
  setLoginInput: React.Dispatch<React.SetStateAction<loginInputType>>;
  loginInput: loginInputType;
}

const LoginPages = () => {
  const ObjString = localStorage.getItem("login-token");
  const Obj = ObjString ? JSON.parse(ObjString) : null;
  const Token = Obj ? Obj.value : null;

  // 상수화
  const USER = 0;
  const REPAIR = 1;
  const INSPECTOR = 2;
  const INSURANCE = 3;
  // 액션 실행
  const dispatch = useDispatch();
  // 페이지 이동
  const navigate = useNavigate();
  // 리듀서 가져오기
  const { accountType } = useSelector((state: any) => state.LoginOutReducer);

  // 로그인 데이터 컨테이너
  const initialState = {
    loginid: "",
    loginpassword: "",
  };

  const signUpSuccess = useSelector((state:any) => state.SignUpReducer.success) 

  // 로그인 인풋, 리캡챠 적용여부 useState
  const [loginInput, setLoginInput] = useState<loginInputType>(initialState);
  const [captchaValue, setCaptchaValue] = useState<boolean>(false);
  const { error, success } = useSelector((state: any) => state.LoginOutReducer);
  // console.log(error)

  // 로그인 하기(최종)
  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginAction(loginInput));
  };

  useEffect(() => {
    dispatch(userModifyPasswordReset());
    dispatch(companyModifyPasswordReset());
    dispatch(IsCanSignUpReset());
  }, [dispatch]);

  useEffect(() => {
    if (loginInput.loginid && loginInput.loginpassword) {
      setCaptchaValue(true);
    } else {
      setCaptchaValue(false);
    }
  }, [accountType, loginInput.loginid, loginInput.loginpassword]);
  useEffect(() => {
    // 실패하면 이거
    if (success !== true) {
      if (success === false) {
        swal(
          "로그인 문제",
          "아이디 또는 비밀번호가 맞지 않습니다.",
          "error"
        ).then(() => {
          dispatch(loginFailureReset());
          navigate("/login");
        });
      }
      // 성공하면 이거
    } else {
      switch (accountType) {
        case USER:
          navigate("/");
          break;
        case REPAIR:
          navigate("/garage");
          break;
        case INSPECTOR:
          navigate("/inspector");
          break;
        case INSURANCE:
          navigate("/insurance");
          break;
        default:
          navigate("/login");
          break;
      }
    }
  }, [success, navigate, error]);

  useEffect(() => {
    if(signUpSuccess === true) {
      swal("회원가입 성공", "회원가입에 성공했습니다.", "success");
    }
  }, [signUpSuccess])

  return (
    <StyleLoginContainer>
      <Nav2 />
      <StyleLoginCenterDiv>
        <StyleLoginBoxDiv border={captchaValue ? "#d23131" : "grey"}>
          <StyleLoginForm onSubmit={(e) => handleLogin(e)}>
            <LoginID setLoginInput={setLoginInput} loginInput={loginInput} />
            <LoginPassword
              setLoginInput={setLoginInput}
              loginInput={loginInput}
            />
            <StyleLoginBtn
              backgroundColor={captchaValue ? "#d23131" : "grey"}
              disabled={!captchaValue}
              type="submit"
            >
              로그인 하기
            </StyleLoginBtn>
          </StyleLoginForm>
          <StyleLoginAnotherLink>
            <StyleLink to="/getagreement">회원가입</StyleLink> /
            <StyleLink to="/searchid"> 아이디 찾기</StyleLink> /
            <StyleLink to="/passwordresetcheck"> 비밀번호 재설정</StyleLink>
          </StyleLoginAnotherLink>
        </StyleLoginBoxDiv>
      </StyleLoginCenterDiv>
    </StyleLoginContainer>
  );
};

export default LoginPages;
