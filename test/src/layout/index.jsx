import styled from "@emotion/styled"
import { useRouter } from "next/router"

const SideBar = styled.div`
    width: 200px;
    height: 708px;
    display: flex;
    flex-direction: column;
    margin: 0px 20px 30px 0px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    background-color: white;
`

const Title = styled.div`
    font-weight: 800;
    font-size: 16px;
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 30px;
    margin-bottom: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #E5E5E5;
    display: flex;
    align-items: center;
`

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`

const List = styled.div`
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;


`

const New = styled.div`
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    display: flex;
    align-items: center;
`

const Body = styled.div`
    
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const Logo = styled.img`
    margin-right: 10px;
`

const ListBoard = styled.img`
    margin-right: 10px;
`

const NewBoard = styled.img`
    margin-right: 10px;
` 

export default function Layout(props) {
    const router = useRouter()

    const onClickMoveList = () => {
        router.push("/board")
    }

    const onClickMoveNew = () => {
        router.push("/board/new")
    }


    return (
        <Wrapper>
            <SideBar>
                <Title><Logo src="/icon/Logo.png" />TALKR</Title>
                <Menu>
                    <List onClick={onClickMoveList}><ListBoard src="/icon/List.png"/>전체 글 보기</List>
                    <New onClick={onClickMoveNew}><NewBoard src="/icon/New.png"/>새 글 작성</New>
                </Menu>
            </SideBar>
            <Body>{props.children}</Body>
        </Wrapper>
    )
}