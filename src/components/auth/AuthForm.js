import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/palette';
import Button from '../Button';

const AuthFormBlock = styled.div`
  h4 {
    margin: 0;
    color: ${palette.gray[6]};
    margin-bottom: 0.7rem;
  }
`;

const StyledInput = styled.input`
  font-size: 1rem;
  border: none;
  outline: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.7rem;
  width: 100%;
  &:focus {
    border-bottom: 1px solid ${palette.cyan[5]};
  }
  & + & {
    margin-top: 1rem;
  }
  &::placeholder {
    color: ${palette.gray[4]};
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[5]};
    text-decoration: underline;
    font-size: 0.7rem;
  }
  &:hover {
    color: ${palette.gray[6]};
  }
`;

const ErrMsg = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const textMap = {
  login: 'LOG IN',
  register: 'REGISTER',
};

const AuthForm = ({ type, form, onChange, onSubmit, error }) => {
  const text = textMap[type]; //"LOG IN"

  console.log(form);
  return (
    <AuthFormBlock>
      <h4>{text}</h4>
      <form onSubmit={onSubmit}>
        <StyledInput
          name="username"
          placeholder="ID"
          minLength="4"
          maxLength="15"
          onChange={onChange}
          value={form.username}
        />
        <StyledInput type="password" name="password" placeholder="PW" onChange={onChange} value={form.password} />
        {type === 'register' && (
          <>
            <StyledInput
              type="password"
              name="passwordConfirm"
              placeholder="PW CONFIRM"
              onChange={onChange}
              value={form.passwordConfirm}
            />
            <StyledInput name="phone" placeholder="Phone Number" onChange={onChange} value={form.phone} />
            <StyledInput name="email" placeholder="E-mail" onChange={onChange} value={form.email} />
            <StyledInput name="address" placeholder="Address" onChange={onChange} value={form.address} />
          </>
        )}
        {error && <ErrMsg>{error}</ErrMsg>}

        <Button fullWidth cyan style={{ marginTop: '1rem' }}>
          {text}
        </Button>
      </form>
      <Footer>
        {type === 'register' ? <Link to="/login">로그인</Link> : <Link to="/register">아직 회원이 아니십니까?</Link>}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
