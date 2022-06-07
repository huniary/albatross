import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/common/Header";
import { logout } from "../modules/user";

function  HeaderContainer(){
    const {user} = useSelector(({user}) =>({
        user:user.user,
    }));
    const dispatch = useDispatch();

    const onLogout = ()=> {
        localStorage.removeItem("user");
        dispatch(logout());
    }

    return <Header user={user} onLogout={onLogout}/>;

};


export default HeaderContainer;