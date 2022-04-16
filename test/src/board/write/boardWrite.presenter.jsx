import {
    Wrapper,
    NewForm,
    Title,
    TitleInputWrapper,
    TitleInput,
    ContentsInputWrapper,
    ContentsInput,
    UserInfo,
    UserNameWrapper,
    UserName,
    UserPasswordWrapper,
    UserPassword,
    Btn,
    SubmitBtn,
    CancleBtn,
    Images,
    ImagesBtn,
    Img,
} from './boardWrite.styles'

export default function BoardWritePresenter(props) {

    return (
        <Wrapper>
            <NewForm>
                <Title>새 글 작성</Title>
                <TitleInputWrapper>
                    제목 <TitleInput onChange={onChangeTitle} type="text"></TitleInput>
                </TitleInputWrapper>
                <ContentsInputWrapper>
                    내용 <ContentsInput onChange={onChangeContents} type="text"></ContentsInput>
                </ContentsInputWrapper>
                <Images>
                    이미지
                    <ImagesBtn onClick={onClickImg}>
                        <input style={{ display: "none" }} type="file" onChange={onChangeImg} ref={myImgRef} />
                        <Img src={"https://storage.googleapis.com/" + imgUrl} />
                    </ImagesBtn>
                </Images>
                <UserInfo>
                    <UserNameWrapper>
                        작성자 <UserName onChange={onChangeWriter} type="text"></UserName>
                    </UserNameWrapper>
                    <UserPasswordWrapper>
                        비밀번호 <UserPassword onChange={onChangePassword} type="password"></UserPassword>
                    </UserPasswordWrapper>
                </UserInfo>
            </NewForm>
            <Btn>
                <SubmitBtn onClick={onClickSubmit}>등록</SubmitBtn>
                <CancleBtn onClick={onClickCancle}>취소</CancleBtn>
            </Btn>
        </Wrapper>
    )
}