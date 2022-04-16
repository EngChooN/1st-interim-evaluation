import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled"
import { useRouter } from "next/router";
import { useRef, useState } from "react"

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      images
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const UPDATE_BOARD = gql`
  mutation updateBoard(
    $boardId: ID!
    $password: String
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
    ) {
      _id
    }
  }
`;

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const NewForm = styled.div`
    width: 764px;
    height: 648px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 10px;

`

const Title = styled.div`
    width: 684px;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    margin: 40px 40px 20px 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #6400FF;
`
const TitleInputWrapper = styled.div`
    width: 684px;
    margin: 30px 40px 20px 40px;
    display: flex;
    justify-content: space-between;
`
const TitleInput = styled.input`
    width: 604px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
`

const ContentsInputWrapper = styled.div`
    width: 684px;
    margin: 30px 40px 20px 40px;
    display: flex;
    justify-content: space-between;
`
const ContentsInput = styled.input`
    width: 604px;
    height: 240px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
`

const UserInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 684px;
    margin: 30px 40px 20px 40px;
`

const UserNameWrapper = styled.div``
const UserName = styled.input`
    width: 242px;
    height: 40px;
    margin-left: 35px;
    background: rgba(229, 229, 229, 0.5);
    border: 1px solid #E5E5E5;
    border-radius: 5px;
`

const UserPasswordWrapper = styled.div``
const UserPassword = styled.input`
    width: 242px;
    height: 40px;
    margin-left: 35px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
`

const Btn = styled.div`
    margin-top: 30px;
`

const SubmitBtn = styled.button`
    width: 80px;
    height: 30px;
    background: #6400FF;
    border-radius: 30px;
    color: white;
    border: none;
    cursor: pointer;
`

const CancleBtn = styled.button`
    margin-left: 10px;
    width: 80px;
    height: 30px;
    background: #999999;
    border-radius: 30px;
    border: none;
    cursor: pointer;
`

const Images = styled.div`
    width: 684px;
    display: flex;
    flex-direction: row;
`


const ImagesBtn = styled.div`
    /* background: #FAFAFA; */
    border: 1px dashed #E5E5E5;
    border-radius: 5px;
    width: 80px;
    height: 80px;
    margin-left: 39px;
`

const Img = styled.img`
    border-radius: 5px;
    width: 80px;
    height: 80px;
`

export default function BoardEditPage() {
    const myImgRef = useRef(null)
    const [imgUrl, setImgUrl] = useState('')
    const [uploadFile] = useMutation(UPLOAD_FILE)

    const router = useRouter()
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState('')
    const [password, setPassword] = useState('')
    const [updateBoard] = useMutation(UPDATE_BOARD)
    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: router.query.boardId,
        }
    })

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onChangeContents = (event) => {
        setContents(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onClickSubmit = async () => {
        try {
            const result = await updateBoard({
                variables: {
                    boardId: router.query.boardId,
                    password: password,
                    updateBoardInput: {
                        title: title,
                        contents: contents,
                        images: [imgUrl],
                    }
                }
            })
            alert('수정 성공!')    
            router.push('/board/' + data.fetchBoard._id)
        } catch(error) {
            alert(error)
        }
    }

    const onChangeImg = async(event) => {
        const myImg = event.target.files?.[0]

        try {
            const result = await uploadFile({
                variables: { file: myImg },
            })
            setImgUrl(result.data?.uploadFile.url)
            alert('이미지 올리기 성공!')
            console.log(result)
        } catch (error) {
            alert(error)
        }
    }

    const onClickImg = () => {
        myImgRef.current?.click();
    }

    const onClickCancle = () => {
        router.push("/board/" + router.query.boardId)
    }


    return (
        <Wrapper>
            <NewForm>
                <Title>게시물 수정</Title>
                <TitleInputWrapper>
                    제목 <TitleInput onChange={onChangeTitle} type="text" defaultValue={data?.fetchBoard.title}></TitleInput>
                </TitleInputWrapper>
                <ContentsInputWrapper>
                    내용 <ContentsInput onChange={onChangeContents} type="text" defaultValue={data?.fetchBoard.contents}></ContentsInput>
                </ContentsInputWrapper>
                <Images>
                    이미지
                    <ImagesBtn onClick={onClickImg}>
                        <input style={{ display: "none" }} type="file" onChange={onChangeImg} ref={myImgRef} />
                        <Img src={imgUrl === '' ? "https://storage.googleapis.com/" + data?.fetchBoard.images : "https://storage.googleapis.com/" + imgUrl} />
                    </ImagesBtn>
                </Images>
                <UserInfo>
                    <UserNameWrapper>
                        작성자 <UserName type="text" value={data?.fetchBoard.writer} disabled></UserName>
                    </UserNameWrapper>
                    <UserPasswordWrapper>
                        비밀번호 <UserPassword onChange={onChangePassword} type="password"></UserPassword>
                    </UserPasswordWrapper>
                </UserInfo>
            </NewForm>
            <Btn>
                <SubmitBtn onClick={onClickSubmit}>수정</SubmitBtn>
                <CancleBtn onClick={onClickCancle}>취소</CancleBtn>
            </Btn>
        </Wrapper>
    )
}