import React, {useEffect, useState} from "react";
import {Container, Form, Button, Table,} from "react-bootstrap";
import 'react-quill/dist/quill.snow.css';
import './styles.css'
import './community.css'
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import {localeData} from "moment";

const Review = ({match}) => {
  const [postList, setPostList] = useState('')
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [boardNo, setBoardNo] = useState('')
  const [readOnly, setReadOnly] = useState(true)
  const [creationDate, setCreationDate] = useState('')
  const [click, setClick] =useState(0)
  const history = useHistory()

  const handleQuill = (value) => {
     setContent(value)
  }


  useEffect(() => {
    axios
      .get(`http://localhost:8080/board/list/getOne/${match.params.boardNo}`)
      .then((res) => {
        console.log(`java에서 넘어온 data` + res.data.boardNo)
        setBoardNo(res.data.boardNo)
        setTitle(res.data.title)
        setContent(res.data.content)
        setClick(res.data.click)
        setCreationDate(res.data.creationDate)
        // setContent(res.data.boardNo)
        //  setTitle(res.data.title)
      })
      .then((err) => {
        throw err;
      })
  }, [])



  const updateBoard = e => {
    e.preventDefault();
    console.log(`boardNo : ${boardNo}, title : ${title}, content : ${content}`)
    // setReadOnly(false)
    const uploadData = {
    // boardNo: boardNo,
      title: title,
      content: content,
      creationDate: creationDate
    }
    axios
      .patch(`http://localhost:8080/board/modify/${boardNo}`, uploadData)
      .then((res) => {
        console.log(res.data);
        history.push('/Community')

      })
      .catch((err) => {
        throw err;
      })
  };


  const getContent = e => {
    e.preventDefault();
    console.log(`=========================`)
    console.log(`boardNo ${boardNo}`)
    //setBoardNo(match.params.boardNo)
    console.log(`click ${click}`)
    setReadOnly(false)

  }

  const deleteBoard = e => {
    e.preventDefault()
    axios
      .delete(`http://localhost:8080/board/list/delete/${match.params.boardNo}`)
      .then((res) => {
        console.log(res)
        history.push('/Community')
      })
      .catch((err) => {
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
    <>
      {/*<h2 style={{'display': 'hidden'}}>BoardNo : {boardNo}</h2>*/}
      {/*<h2>BoardNo : {boardNo}</h2>*/}
      {/*/!*<h2>localDate : {creationDate(LocalDateTime.now())}</h2>*!/*/}
      {/*<button onClick={()=>setClick(click+1)}>click me! : {click}</button>*/}
      {/*<h2>CreateDate : {creationDate}</h2>*/}

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
              <th style={{width: "180px"}}>사용자</th>

              <th>
                제목 :
                  {readOnly && title}
                  {!readOnly && (
                    <input
                      value={title}
                      onChange={e=>setTitle(e.target.value)}
                    />)}

              </th>
              <th style={{width: "150px"}}>게시날짜</th>
            </tr>
            </thead>
            <tbody>
            <tr className="Rev">
              <td>
                <textPath
                  className="use-pic">
                  <img
                    src="https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F7%2F201804241120041041.jpg"/>
                  Donald J. Trump @realDonaldTrump
                </textPath>
              </td>
              <td>

                {readOnly &&
                <ReactQuill
                  theme="snow"
                  value={content}
                  modules={modules}
                  formats={formats}
                  readOnly
                />}

                  {!readOnly &&
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={handleQuill}
                    modules={modules}
                    formats={formats}
                  />
                  }
              </td>
              <td>{creationDate}</td>
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
                  <Link to='/Community'>뒤로</Link>
                </Button>
              </div>
            }

          </textPath>

          <Form.Group className="comment">
            <button className='comment-btn'>댓글 :</button>

            <Form.Control type="text" placeholder="Normal text"/>
            <Button className="cmt-btn" variant="secondary">
              <Link to='/Review'>댓글달기</Link>
            </Button>
          </Form.Group>

        </div>
      </Container>
    </>
  );
};

export default Review;
