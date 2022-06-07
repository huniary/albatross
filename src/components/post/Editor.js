// import React, { useEffect, useRef } from "react";
// import styled from "styled-components";
// import Quill from "quill";
// import "quill/dist/quill.bubble.css";

// const EditorBlock = styled.div``;

// const TitleInput = styled.input`

// `;

// const QuillWrapper = styled.div`

// `;


// const  Editor= () => {

//     const quillElement = useRef(null); //밖의 리얼돔에 접근할수있는 친구 //Quil Container
//     const quillInstance = useRef(null);

//     useEffect(()=>{
//                 //컨테이너       , {퀼의옵션}
//         quillInstance.current = new Quill(quillElement.current, {
//             theme:"bubble",
//             placeholder: "지금 무슨생각하니?",
//             modules:{
//                 toolbar: [
//                     [{header:1}, {header:2}],
//                     ["bold","italic","umderline","strike"], //툴바자체가 배열임//글작성 위에 항목 뭐를 넣을꺼냐
//                     [{list: "ordered" }, {list: "bullet"}],
//                     ["blockquote", "code-block", "link","image"],
//                 ],
//             },
//         });

//     },[]);

//     return (
//         <EditorBlock>
//             {/* title */}
//             {/* body */}
//                 <TitleInput />
//                 <QuillWrapper>
//                     <div ref={quillElement} />
//                 </QuillWrapper>
//         </EditorBlock>
//     );
// };


// export default Editor;


import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Quill from "quill";
import "quill/dist/quill.bubble.css";
import palette from "../../lib/palette";

const EditorBlock = styled.div`
    padding-top: 5rem;
    padding-bottom: 5rem;
`;

const TitleInput = styled.input`
    border:none;
    outline: none;
    border-bottom: 1px solid ${palette.gray[5]};
    width: 100%;
    margin-bottom: 2rem;
    font-size: 2rem;
    padding-bottom: 0.5rem;

    //자기자신의 플레이스홀더
    &::placeholder{
        color: ${palette.gray[3]};
    }
`;

const QuillWrapper = styled.div`
    .ql-editor{
        padding-top: 0;
        min-height: 320px;
        font-size: 1.125rem;
        line-height: 1.5;

    }

    .ql-editor.ql-blankk::before{ //게시물속임
        left : 0;
        color: ${palette.gray[3]};
    }
`;

const Editor = ({title, body, onChange}) => {
  const quillElement = useRef(null); // Quill Container
  const quillInstance = useRef(null);
  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: "bubble",  //bubble 은 툴바 생략 snow 는 툴바보임.
      placeholder: "지금 무슨 생각 하고있나요?_?",
      modules: {
        toolbar: [
          [{ header: 1 }, { header: 2 }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["blockquote", "code-block", "link", "image"],
        ],
      },
    });

    const quill = quillInstance.current;
    quill.on("text-change", (delta,oldDelta,source)=>{
        if(source ==="user"){
            onChange({key: "body", value: quill.root.innerHTML});
        }
    }); //quill에 on 이란 내장함수잇음
    
  }, [onChange]);

  const onChangeTitle = e => {
      onChange({key: "title", value: e.target.value});
  }
// 여기 한번확인하김ㄴ울;ㅣ마눙리ㅏ;ㅁ눙
//html안에 <div>안에 리액트안에<quill>이있음 거기에 바디를넣고싶다라는뜻??
  const mounted = useRef(false);
  useEffect(()=>{
    if(mounted.current) return;
    mounted.current = true;
    // 퀼인스턴스의 현재 루트의 이너thml = body넣어죵
    quillInstance.current.root.innerHTML =body;
  },[body])

  return (
    <EditorBlock>
      <TitleInput 
        placeholder="Title...." 
        onChange={onChangeTitle}
        value={title}
      />
      <QuillWrapper>
        <div ref={quillElement} />
      </QuillWrapper>
    </EditorBlock>
  );
};

export default Editor;