import BoardWritePresenter from './boardWrite.presenter'
import { CREATE_BOARD, UPLOAD_FILE} from './boardWrite.queries'

export default function BoardWriteContainer() {
        //이미지 한개라도 올려보자
    const myImgRef = useRef(null)
    const [imgUrl, setImgUrl] = useState('')
    const [uploadFile] = useMutation(UPLOAD_FILE)

    const router = useRouter()

    const [createBoard] = useMutation(CREATE_BOARD)

    const [title, setTitle] = useState('')
    const [writer, setWriter] = useState('')
    const [contents, setContents] = useState('')
    const [password, setPassword] = useState('')

    const onChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const onChangeWriter = (event) => {
        setWriter(event.target.value)
    }

    const onChangeContents = (event) => {
        setContents(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onClickSubmit = async () => {
        try {
            const result = await createBoard({
                variables: {
                    createBoardInput: {
                        title: title,
                        writer: writer,
                        contents: contents,
                        password: password,
                        images: [imgUrl],
                    }
                }
            })
            alert('글 등록 성공!')
            router.push("/board/" + result.data.createBoard._id)
            console.log(result.data?.createBoard)
        } catch (error) {
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
        router.push("/board")
    }


    return (
        <BoardWritePresenter />
    )
}