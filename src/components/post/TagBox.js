import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import palette from "../../lib/palette";

const TagBoxBlock = styled.div`
    width: 100%;
    border-top:  1px solid ${palette.gray[5]};
    padding-top: 2rem;

    h4{
        color: ${palette.gray[7]};
        margin-top: 0;
        margin-bottom: 0.5rem;

    }

`;

const TagForm = styled.form`
    border: 1px solid ${palette.gray[5]};
    border-radius: 4px;
    display: flex;
    width:480px;
    overflow: hidden;

    input {
        outline: none;
        border: none;
        font-size: 1rem;
        padding: 0.5rem;
        min-width: 0;

        &::placeholder{
            color: ${palette.gray[3]};
        }

    }
`;

const TagListBox = styled.div`
    display:flex;
    margin-top: 0.5rem;
`;

const TagItemBox = styled.div`
    & +& {
        margin-left: 0.8rem;
    }
    background: ${palette.gray[4]};
    border-radius: 3rem;
    padding: 0.6rem;
    color:${palette.gray[6]};
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
        opacity: 0.5;
    }
`;

const TagItem = 
React.memo(({tag, onRemove}) => (
    <TagItemBox onClick={()=>onRemove(tag)}>#{tag}</TagItemBox>  
));

// ({tag}) => <TagItemBox>#{tag}</TagItemBox>;

const TagList = 
React.memo(({tags, onRemove})=><TagListBox>
{tags.map((tag)=> (
<TagItem tag={tag} key={tag} onRemove={onRemove}/>
))}
</TagListBox>);

// ({tags})=><TagListBox>
//     {tags.map((tag)=> (<TagItem tag={tag} />
//     ))}
// </TagListBox>;

const  TagBox = ({onChangeTag, tags}) => {
    const [tagInput, setTagInput] = useState("");
    const [localTag, setLocalTag] = useState([]);

    const addTag = useCallback((text)=>{
        if(!text) return;
        if(localTag.includes(text)) return; //로컬태긍나에 태그인풋이 포함되있으면 리턴
        const nextTag =[...localTag, text];
        setLocalTag(nextTag); //지금까지의 로컬태그안에 태그인풋을 넣는다
                                         //공백이들어가면안되니까 .trim()
        onChangeTag({key: "tags", value: nextTag});
    },[localTag,onChangeTag])

    const removeTag = useCallback((tag) => {
        // setLocalTag(localTag.filter((t)=> t!==tag)); 위에도똑같음
        const nextTag = localTag.filter((t)=> t!==tag);
        setLocalTag(nextTag);
        onChangeTag({key: "tags", value: nextTag});
    }, [localTag, onChangeTag]);

    const onChange = useCallback((e) => {
        setTagInput(e.target.value);
    }, []);

    const onSubmit= useCallback((e) => {
        e.preventDefault();
        addTag(tagInput.trim());
        setTagInput("");
        },                             
        [tagInput, addTag]
    );


    useEffect(()=>{
        setLocalTag(tags);
    },[tags]);
    //프롭스에서 받은 tags



    return (
    <TagBoxBlock>
        <h4>태그</h4>
        <TagForm onSubmit={onSubmit}>
            <input 
            placeholder="태그를입력해주세요" 
            onChange={onChange} 
            value={tagInput}
            />
        </TagForm>
        <TagList tags={localTag} onRemove={removeTag}/>
    </TagBoxBlock>
    );
};


export default TagBox;