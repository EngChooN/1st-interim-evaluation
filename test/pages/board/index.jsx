import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";
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

const FETCH_BOARDS = gql`
    query fetchBoards($page: Int, $search: String) {
        fetchBoards(page: $page, search: $search) {
            _id
            title
            createdAt
        }
    }
`;

const Wrapper = styled.div`
    width: 764px;
    height: 648px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Boards = styled.div`
    width: 764px;
    height: 50px;
    border-radius: 10px;
    margin: 0px 20px 15px 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    background-color: white;
`

const BoardsTitle = styled.div`
    cursor: pointer;
    font-weight: 700;
    font-size: 14px;
`

const CreatedAt = styled.div`
    font-weight: 400;
    font-size: 14px;
    color: #999999;
`

export default function BoardListPage() {
    const router = useRouter()
    const { data, fetchMore } = useQuery(FETCH_BOARDS)

    const onClickBoardDetail = (event) => {
        router.push("/board/" + event.target.id)
    }

    const getDate = (createdAt) => {
        const newCreatedAt = new Date(createdAt);
        const year = newCreatedAt.getFullYear();
        const month = String(newCreatedAt.getMonth() + 1).padStart(2, "0");
        const date = String(newCreatedAt.getDate()).padStart(2, "0");
        const hours = String(newCreatedAt.getHours()).padStart(2, "0");
        const minutes = String(newCreatedAt.getMinutes()).padStart(2, "0");
        return `${year}.${month}.${date}  ${hours}:${minutes}`;
    }

    const loadFunc = () => {
    if (!data) return;
        fetchMore({
            variables: { page: Math.ceil(data?.fetchBoards.length / 10) + 1 },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult.fetchBoards)
                return { fetchBoards: [...prev.fetchBoards] };
                return {
                    fetchBoards: [
                        ...prev.fetchBoards,
                        ...fetchMoreResult.fetchBoards,
                    ],
                };
            },
        });
    };

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
            <InfiniteScroll pageStart={0} loadMore={loadFunc} hasMore={true}>
                {data?.fetchBoards.map((el) => (
                    <Boards>
                        <BoardsTitle id={el._id} onClick={onClickBoardDetail}>{el.title}</BoardsTitle>
                        <CreatedAt>{getDate(el.createdAt)}</CreatedAt>
                    </Boards>
                ))}
            </InfiniteScroll>
        </Wrapper>
    )
}