import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled"
import { useRouter } from "next/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const Slider1 = styled(Slider)`
    width: 764px;
    height: 240px;
    background: linear-gradient(95.18deg, #6400FF 0.47%, #E3D1FF 102.52%, #D0B1FF 102.52%);
    border: 4px solid #FFFFFF;
    box-sizing: border-box;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    margin-bottom: 20px;
`;

const SliderChild1 = styled(Slider)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SliderChild2 = styled(Slider)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SliderChild3 = styled(Slider)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

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

const Wrapper = styled.div`
    width: 764px;
`

const BoardDetail = styled.div`
    width: 764px;
    height: 388px;
    display: flex;
    flex-direction: column;
    background-color: white;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
`

const BoardTitle = styled.div`
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
    border-bottom: 1px solid #6400FF;
    margin: 40px 40px 20px 40px;
    padding-bottom: 20px;
`

const Images = styled.img`
    margin: 0px 40px 30px 40px;
    width: 220px;
    height: 125px;
`

const BoardInfo = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0px 40px 20px 40px;
    justify-content: space-between;
`
const Profile = styled.div`
    display: flex;
    flex-direction: row;
`
const ProfileImg = styled.img`
    /* background-color: #6400FF;
    width: 16px;
    height: 16px;
    border-radius: 15px;
    margin-right: 10px; */
    width: 16px;
    height: 16px;
    margin-right: 10px;
`

const Writer = styled.div`
    font-weight: 700;
    font-size: 14px;
`

const Contents = styled.div`
    width: 564px;
    height: 69px;
    font-weight: 400;
    font-size: 15px;
`

const Btn = styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const ListBtn = styled.button`
    width: 80px;
    height: 30px;
    background: #6400FF;
    border-radius: 30px;
    color: white;
    border: none;
    cursor: pointer;
`

const EditBtn = styled.button`
    margin-left: 10px;
    width: 80px;
    height: 30px;
    background: #999999;
    border-radius: 30px;
    border: none;
    color: white;
    cursor: pointer;
`

const DeleteBtn = styled.button`
    margin-left: 10px;
    width: 80px;
    height: 30px;
    background: #999999;
    border-radius: 30px;
    border: none;
    color: white;
    cursor: pointer;
`

export default function BoardDetailPage() {
    const router = useRouter()

    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: router.query.boardId,
        }
    })

    const onClickMoveList = () => {
        router.push("/board")
    }

    const onClickMoveEdit = () => {
        router.push("/board/" + router.query.boardId + "/edit")
    }

    const onClickMoveDelete = () => {
        router.push("/board/" + router.query.boardId + "/delete")
    }

    const settings = {
        dots: true,
        appendDots: dots => (
            <ul style={{ marginBottom: "25px"}}> {dots} </ul>
        ),
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };

    return (
        <Wrapper>
            <Slider1 {...settings}>
                <SliderChild1>
                    <img
                        src={
                        "https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e666fb33a4b4cf43b6605fc7a1e262f0845"
                        }
                    />
                </SliderChild1>
                <SliderChild2>
                    <img
                        src={
                        "https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66c37d537a8f2c6f426591be6b8dc7b36a"
                        }
                    />
                </SliderChild2>
                <SliderChild3>
                    <img
                        src={
                        "https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66ba2da8249bd9ffef143efb890203e009"
                        }
                    />
                </SliderChild3>
            </Slider1>
            <BoardDetail>
                <BoardTitle>{data?.fetchBoard.title}</BoardTitle>
                <Images src={"https://storage.googleapis.com/" + data?.fetchBoard.images} />
                <BoardInfo>
                    <Profile>
                        <ProfileImg src="/icon/Profile.png" />
                        <Writer>{data?.fetchBoard.writer}</Writer>
                    </Profile>
                    <Contents>{data?.fetchBoard.contents}</Contents>
                </BoardInfo>
            </BoardDetail>
            <Btn>
                <ListBtn onClick={onClickMoveList}>글목록</ListBtn>
                <EditBtn onClick={onClickMoveEdit}>수정</EditBtn>
                <DeleteBtn onClick={onClickMoveDelete}>삭제</DeleteBtn>
            </Btn>
        </Wrapper>
    )
}