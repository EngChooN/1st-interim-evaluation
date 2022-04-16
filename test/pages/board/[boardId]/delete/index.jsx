import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled"
import { useRouter } from "next/router";
import { useState } from "react";
import { useHistory } from 'react-router-dom';

export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

const Wrapper = styled.div`
`

const Delete = styled.div`
width: 764px;
height: 648px;
display: flex;
flex-direction: column;
background-color: white;
box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
border-radius: 10px;
`

const Title = styled.div`
    width: 648px;
    margin: 40px 40px 220px  40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #6400FF;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
`

const Check = styled.div`
    width: 648px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const CheckInput = styled.input`
    width: 242px;
    height: 48px;
    margin-left: 20px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
`

const Btn = styled.div`
    width: 764px;
    display: flex;
    justify-content: center;
    margin-top: 30px;
`

const DeleteBtn = styled.button`
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
    color: white;
    cursor: pointer;
`

export default function BoardDeletePage() {
    const router = useRouter()

    const [password, setPassword] = useState('')
    const [deleteBoard] = useMutation(DELETE_BOARD)

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onClickDelete = async () => {
        try {
            const result = await deleteBoard({
                variables: {
                    boardId: router.query.boardId,
                }
            })
            alert('삭제성공!')
            router.push("/board")
        } catch(error) {
            alert(error)
        }
    }

    const onClickCancle = () => {
        router.push("/board/" + router.query.boardId)
    }


    return (
        <Wrapper>
            <Delete>
                <Title>게시물 삭제</Title>
                <Check>
                    비밀번호<CheckInput type="password" onChange={onChangePassword}></CheckInput>
                </Check>
            </Delete>
            <Btn>
                <DeleteBtn onClick={onClickDelete}>삭제</DeleteBtn>
                <CancleBtn onClick={onClickCancle}>취소</CancleBtn>
            </Btn>
        </Wrapper>
    )
}