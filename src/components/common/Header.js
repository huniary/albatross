import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from './Button_';
import Responsive from './Responsive';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); //rgb색 a는 줄?
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between; //떨치는거 서로를
  .logo {
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: 7px;
  }

  .userSec {
    display: flex;
    align-items: center;
  }
  .userInfo {
    font-weight: 800;
    margin-right: 1rem;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

function Header({ user, onLogout }) {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div className="logo">
            <Link to="/">알바토로스</Link>
          </div>

          {user ? (
            <div className="userSec">
              <Link to="/userInfo">
                <div className="userInfo">{user.username}</div>
              </Link>
              <Button onClick={onLogout}>LOG OUT</Button>
            </div>
          ) : (
            <div className="userSec">
              <Button to="/login">LOG IN</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
}

export default Header;
