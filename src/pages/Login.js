import React, { useEffect, useState } from "react";
import AuthForm from "../components/auth/AuthForm";
import AuthTemplate from "../components/auth/AuthTemplate";
import { changeField, initForm } from "../modules/auth";
import { useDispatch, useSelector } from "react-redux";
import { check, login } from "../api/auth";
import {useNavigate} from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LOGIN = "login";

const  Login =()=>{
    const dispatch = useDispatch();
    const history = useNavigate();
    const {form, auth, authError,user} = useSelector(({auth, user})=>({
        form: auth.login,
         auth:auth.auth,
         authError:auth.authError,
         user: user.user,
    }));

    const [err, setErr]= useState("");

    const onChange =(e)=>{
        setErr("");
        const {name, value} = e.target;
        dispatch(changeField({form:LOGIN, key: name, value}));
    };

    const onSubmit=(e)=>{
        e.preventDefault();
        const{username, password } = form;

        dispatch(login({username, password}));
        dispatch(initForm(LOGIN));
        
    };

    useEffect(()=>{
        setErr("");
        dispatch(initForm(LOGIN));
        return () => dispatch(initForm(LOGIN));
    },
    [dispatch]
    );

    useEffect(()=>{

        if(authError){
            setErr("아이디, 패스워드를 확인해주세요.")
        }

        //모듈 어스에서 auth가 바껴서 리랜더되서 auth에 유저네임이 들어옴
        if(auth){
            dispatch(check());
        }
    },[auth,authError,dispatch]);


    useEffect(()=>{
        if(user){
            history("/");
        }

        try{
            localStorage.setItem("user",JSON.stringify(user));
        }catch(error){
            console.log("localStorage is not working.");
        }
    },[user, history])



    return (
    <AuthTemplate>
        {/* <Helmet>
            <title>LOG IN</title>
        </Helmet> */}
        <AuthForm 
        type={LOGIN}
        form={form} 
        onChange={onChange} 
        onSubmit={onSubmit}
        error={err}/>

    </AuthTemplate>
    );
}


export default Login;