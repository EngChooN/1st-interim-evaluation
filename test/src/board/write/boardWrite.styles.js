import styled from "@emotion/styled"

export const Wrapper = styled.div`

`

export const NewForm = styled.div`
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

export const Title = styled.div`
    width: 684px;
    font-weight: 700;
    font-size: 18px;
    line-height: 24px;
    margin: 40px 40px 20px 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #6400FF;
`
export const TitleInputWrapper = styled.div`
    width: 684px;
    margin: 30px 40px 20px 40px;
    display: flex;
    justify-content: space-between;
`
export const TitleInput = styled.input`
    width: 604px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
`

export const ContentsInputWrapper = styled.div`
    width: 684px;
    margin: 30px 40px 20px 40px;
    display: flex;
    justify-content: space-between;
`
export const ContentsInput = styled.input`
    width: 604px;
    height: 240px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
`

export const UserInfo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 684px;
    margin: 30px 40px 20px 40px;
`

export const UserNameWrapper = styled.div``
export const UserName = styled.input`
    width: 242px;
    height: 40px;
    margin-left: 35px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
`

export const UserPasswordWrapper = styled.div``
export const UserPassword = styled.input`
    width: 242px;
    height: 40px;
    margin-left: 35px;
    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    border-radius: 5px;
`

export const Btn = styled.div`
    width: 764px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 30px;
`

export const SubmitBtn = styled.button`
    width: 80px;
    height: 30px;
    background: #6400FF;
    border-radius: 30px;
    color: white;
    border: none;
    cursor: pointer;
`

export const CancleBtn = styled.button`
    margin-left: 10px;
    width: 80px;
    height: 30px;
    background: #999999;
    border-radius: 30px;
    border: none;
    color: white;
    cursor: pointer;
`

export const Images = styled.div`
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
    cursor: pointer;
`

const Img = styled.img`
    border-radius: 5px;
    width: 80px;
    height: 80px;
`