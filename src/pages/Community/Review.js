import React, {useEffect, useState} from "react";
import {Container,Form, Button,Table,} from "react-bootstrap";
import 'react-quill/dist/quill.snow.css';
import './styles.css'
import './community.css'
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";

const Review = ({match}) => {
    const [postList, setPostList] = useState('')
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [boardNo, setBoardNo] = useState('')
    const [readOnly, setReadOnly] = useState(true)
    const [value, setValue] = useState('')
    const [creationDate, setCreationDate] = useState('')

    const history = useHistory()

    const handleQuill = (value)=>{
        setValue(value)
    }


    useEffect(()=>{
        axios
            .get(`http://localhost:8080/board/list/getOne/${match.params.boardNo}`)
            .then((res)=>{
                console.log(`java에서 넘어온 data`+res.data.boardNo)
                setPostList(res.data)
                setBoardNo(res.data.boardNo)
                // setContent(res.data.boardNo)
                //  setTitle(res.data.title)
            })
            .then((err)=>{
                throw err;
            })
    },[])


    const updateBoard = e =>{
        e.preventDefault();
        console.log(`boardNo : ${boardNo}, title : ${title}, content : ${value}, creationDate : ${creationDate}`)
        // setReadOnly(false)
        const uploadData ={
            boardNo: boardNo,
            title : title,
            content : value,
            creationDate : creationDate
        }
        axios
            .post(`http://localhost:8080/board/modify`,uploadData)
            .then((res)=>{
                console.log(res.data);
                history.push('/Community')

            })
            .catch((err)=>{
                throw err;
            })
        };


    const getContent = e =>{
        e.preventDefault();
        console.log(`boardNo ${setBoardNo}`)
        setBoardNo(match.params.boardNo)
        setReadOnly(false)
        axios
            .get(`http://localhost:8080/board/list/medCategory/${match.params.boardNo}`)
            .then((res)=>{
                // setPostList(res.data)
                setTitle(res.data)
                setBoardNo(res.data)
                setCreationDate(res.data)
            })
            .catch((err)=>{
                throw err;
            })
    }

    const deleteBoard = e =>{
        e.preventDefault()
        axios
            .delete(`http://localhost:8080/board/list/delete/${match.params.boardNo}`)
            .then((res)=>{
                console.log(res)
                history.push('/Community')
            })
            .catch((err)=>{
                throw err;
            })
    }

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'link', 'image']
        ]
    }

    const formats = [
        'bold',
        'italic',
        'underline',
        'strike',
        'link',
        'image']

    return (
        <Container>
            <div className="Rev-tab">
                <textPath>
                    <Link to="/https://twitter.com/realdonaldtrump">
                        Donald J. Trump @realDonaldTrump 님 게시글
                    </Link>
                </textPath>

                <Table striped bordered hover size="sm"
                       value={content}
                       readOnly={readOnly}
                       // onChange={getContent}
                >
                    <thead>
                    <tr>
                        <th style={{width:"180px"}}>사용자</th>

                        <th>
                            제목 :
                            <textPath
                                value={postList.title}
                                onChange={(e)=>{setTitle(title)}}
                            >
                                {readOnly &&
                                postList.title}

                                {!readOnly &&
                                <textarea>
                                        {postList.title}
                                </textarea>
                                }
                            </textPath>
                        </th>


                        {/*<th>*/}
                        {/*    제목 :*/}
                        {/*    <textPath*/}
                        {/*        // value={postList.title}*/}
                        {/*        value ={content}*/}
                        {/*        onChange={(e)=>{setTitle(value)}}*/}
                        {/*    >*/}
                        {/*        {readOnly &&*/}
                        {/*        postList.title}*/}

                        {/*        {!readOnly &&*/}
                        {/*        <textarea*/}
                        {/*            className="titlebox"*/}
                        {/*            value={postList.title}*/}
                        {/*            onChange={(e)=>{setTitle(e.target.value)}}*/}
                        {/*        >*/}
                        {/*            {content.title}*/}

                        {/*        </textarea>*/}
                        {/*        }*/}
                        {/*    </textPath>*/}
                        {/*</th>*/}
                        <th style={{width:"150px"}}>게시날짜</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="Rev">
                        <td>
                            <textPath
                                className="use-pic">
                                <img src="https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F7%2F201804241120041041.jpg"/>
                                Donald J. Trump @realDonaldTrump
                            </textPath>
                        </td>

                        <td>

                            <textPath
                                value={content}
                                // onChange={getContent}
                            >
                                {readOnly &&
                                postList.content
                                }

                                {!readOnly &&

                                <ReactQuill
                                    theme="snow"
                                    // value={newValue}
                                    onChange={handleQuill}
                                    modules={modules}
                                    formats={formats}
                                >
                                    <textarea className="quill-font">
                                        {postList.content}
                                        {/*onChange={(e)=>{setContent(e.target.value)}}*/}
                                    </textarea>
                                </ReactQuill>
                                }

                            </textPath>


                            {/*<textPath*/}
                            {/*    value={content}*/}
                            {/*    onChange={getContent}*/}
                            {/*    // onChange={(e)=>{setContent(value)}}*/}
                            {/*>*/}
                            {/*    {readOnly &&*/}
                            {/*    postList.content*/}
                            {/*    }*/}

                            {/*    {!readOnly &&*/}

                            {/*    <ReactQuill*/}
                            {/*        theme="snow"*/}
                            {/*        onChange={handleQuill}*/}
                            {/*        modules={modules}*/}
                            {/*        formats={formats}*/}
                            {/*    >*/}
                            {/*        <textarea className="quill-font"*/}
                            {/*            value={postList.content}*/}
                            {/*            onChange={(e)=>{setContent(e.target.value)}}*/}
                            {/*            // onChange ={setContent}*/}
                            {/*        >*/}
                            {/*            {content.value}*/}
                            {/*        </textarea>*/}
                            {/*    </ReactQuill>*/}
                            {/*    }*/}
                            {/*</textPath>*/}
                        </td>

                        <td
                        value={creationDate}
                        >{postList.value}</td>
                    </tr>
                    </tbody>
                </Table>

                <textPath>
                    {readOnly &&
                    <div>
                        <Button className="fix-btn"
                                variant="outline-dark"
                                onClick={getContent}
                        >수정
                        </Button>

                        <Button
                            variant="outline-dark"
                            onClick={deleteBoard}
                        >
                            삭제
                        </Button>
                    </div>
                    }


                    {
                        !readOnly &&
                        <div>
                            <Button className="fix-btn"
                                    variant="outline-dark"
                                    onClick={updateBoard}
                            >수정완료
                            </Button>
                            <Button variant="outline-dark">
                                <Link to='/Community/Review'>뒤로</Link>
                            </Button>
                        </div>
                    }

                </textPath>

                <Form.Group className="comment">
                    <button className='comment-btn' >댓글 :</button>

                    <Form.Control type="text" placeholder="Normal text" />
                    <Button className="cmt-btn" variant="secondary" >
                        <Link to='/Review'>댓글달기</Link>
                    </Button>
                </Form.Group>

            </div>
        </Container>
    );
};

export default Review;
