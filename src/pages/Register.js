import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthForm from '../components/auth/AuthForm';
import AuthTemplate from '../components/auth/AuthTemplate';
import { changeField, initForm, register } from '../modules/auth';
import { check } from '../modules/user';
import { useNavigate } from 'react-router-dom';

const REGISTER = 'register';

const Register = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { form, auth, authError, user } = useSelector(({ auth, user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user,
  }));
  //로그인과의 에러가 달라서 각자 선언해주는거임
  const [err, setErr] = useState('');

  const onChange = (e) => {
    setErr(''); //다시입력할때 에러가 사라지게하는거 null도 ""도 괜츈
    const { name, value } = e.target;
    dispatch(changeField({ form: REGISTER, key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm, email = '', phone = '', address = '' } = form;
    //이게 우선순위 1위 입력체크

    if ([username, password, passwordConfirm].includes('')) {
      setErr('항목을 전부 입력해주세요');
      return;
    }

    //상관체크 패스워드가 일치할까안할까 우선순위 2위
    if (password !== passwordConfirm) {
      setErr('패스워드가 일치하지않습니다.');
      dispatch(changeField({ form: REGISTER, key: 'password', value: '' }));
      dispatch(changeField({ form: REGISTER, key: 'passwordConfirm', value: '' }));
      return;
    }

    //모듈에잇는register //api에잇는거아님
    dispatch(register({ username, password, email, phone, address }));
    dispatch(initForm(REGISTER));
  };

  useEffect(() => {
    setErr('');
    dispatch(initForm(REGISTER));
    return () => dispatch(initForm(REGISTER));
  }, [dispatch]);

  useEffect(() => {
    // 논리 첵크
    if (authError) {
      if (authError.response.status === 409) {
        setErr('입력한아이디가 이미사용되고있습니다.');
        return;
      }
      if (authError.response.status === 400) {
        setErr('4글자 이상 15글자이하로 적어주세요.');

        return;
      }
      setErr('회원등록이 실패했습니다.');
      return;
    }
    // 모듈 어스에서 auth가 바껴서 리랜더되서 auth에 유저네임이 들어옴
    if (auth) {
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      history('/');
    }
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.log('localStorage is not working.');
    }
  }, [user, history]);

  return (
    <AuthTemplate>
      <AuthForm type={REGISTER} form={form} onChange={onChange} onSubmit={onSubmit} error={err} />
    </AuthTemplate>
  );
};

export default Register;
