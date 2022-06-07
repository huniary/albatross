import React from "react";
import Modal from "../components/common/Modal";

const  AskRemoveModal =({visible, onConfirm, onCancel}) =>{
    const title = "삭제 할거야?";
    const description = "삭제할포스터 복구못해, 할꺼야?";


    return (
    <Modal 
    visible={visible} 
    title={title} 
    description={description}
    onConfirm={onConfirm}
    onCancel={onCancel}
    />
    );
}


export default AskRemoveModal;