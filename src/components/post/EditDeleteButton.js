import React, { useState } from "react";
import styled from "styled-components";
import palette from "../../lib/palette";
import AskRemoveModal from "../../pages/AskRemoveModal";
import {MdDelete, MdEdit} from "react-icons/md";

const EditDeleteButtonBlock = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
    margin-top: -1.5rem;
`;

const ActionButton = styled.button`
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    color: ${palette.gray[5]};
    font-size: 1rem;
    cursor: pointer;



    &:hover{
        background: ${palette.gray[1]};
        color: ${palette.cyan[7]}
    }

    &+&{
        margin-left: 0.25rem;
    }
`;

const  EditDeleteButton = ({onEdit, onDelete}) =>{

    const [modal, setModal] = useState(false);

    const onDeleteClick = () => setModal(true);

    const onCancel = () => setModal(false);

    const onConfirm = () => {
        setModal(false);
        // 부모로받은 온딜리트 바로실행 
        onDelete();
    }



    return (
    <>
        <EditDeleteButtonBlock>
            <ActionButton onClick={onEdit}>
                <MdEdit />
            </ActionButton>
            <ActionButton onClick={onDeleteClick}>
                {/* <MdDelete style={{color: "red"}}/> */}
                <MdDelete />
            </ActionButton>
        </EditDeleteButtonBlock>
        <AskRemoveModal 
        visible={modal} 
        onCancel={onCancel} 
        onConfirm={onConfirm}
        />
    </>
    );
}


export default EditDeleteButton;