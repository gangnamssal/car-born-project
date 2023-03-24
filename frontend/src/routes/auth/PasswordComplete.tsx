import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import carbornLogo from "../../assets/carbornLogo.png";
import Nav from './../../components/Nav';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newPasswordReset } from './../../modules/PasswordResetModule';

const StyleSearchidCompleteContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .SearchidCompleteTitle {
    text-align: center;
    display: block;
    font-size: 2rem;
    font-weight: 900;
  }

  .SearchidCompleteGuide {
    text-align: center;
    display: block;
    font-size: 1rem;
    font-weight: 900;
    color: #3c3c3c;
  }
`;

export const StyleBtn = styled.button`
  width: 15rem;
  text-align: center;
  font-size: 1.2rem;
  color: white;
  background-color: #D23131;
  border: none;
  margin: 0.5rem 0;
  cursor: pointer;
`;

const PasswordComplete = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(newPasswordReset())
  }, [])

  return (
    <div>
      <Nav />
      <StyleSearchidCompleteContainer>
        <div>
          <img src={carbornLogo} alt="asdfasdf" />
        </div>
        <div>
          <span className="SearchidCompleteTitle">
            비밀번호 재설정을 완료했습니다.
          </span>
          <span className="SearchidCompleteGuide">
            로그인을 하시려면 아래 버튼을 눌러주세요
          </span>
        </div>
        <Link to="/login">
          <StyleBtn
          >로그인</StyleBtn>
        </Link>
      </StyleSearchidCompleteContainer>
    </div>
  );
};

export default PasswordComplete;
