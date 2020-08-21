import React, {useEffect, useState} from "react";
import {Container, Form, Button, Table,} from "react-bootstrap";
import 'react-quill/dist/quill.snow.css';
import './styles.css'
import './community.css'
import {Link, useHistory} from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import {localeData} from "moment";

const CSReview = ({match}) => {

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


//게시물 수정후 업데이트
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

//처음 게시물 제목클릭시 가져오는 데이터
  const getContent = e => {
    e.preventDefault();
    console.log(`=========================`)
    console.log(`boardNo ${boardNo}`)
    //setBoardNo(match.params.boardNo)
    console.log(`click ${click}`)
    setReadOnly(false)

  }
//게시물 삭제
  const deleteBoard = e => {
    e.preventDefault()
    axios
      .delete(`http://localhost:8080/board/list/delete/${match.params.boardNo}`)
      .then((res) => {
        console.log(res)
        history.push('/CustomerServiceCenter')
      })
      .catch((err) => {
        throw err;
      })
  }


  const [value, setValue] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      'image'
  ]
  return (
    <>
      <Container>
        {/*<div className="Rev-tab">*/}
        {/*    <Table striped bordered hover size="sm">*/}
        {/*        <thead>*/}
        {/*        <tr>*/}
        {/*            <th style={{width:"180px"}}>사용자</th>*/}
        {/*            <th>내용</th>*/}
        {/*            <th style={{width:"150px"}}>게시날짜</th>*/}
        {/*        </tr>*/}
        {/*        </thead>*/}
        {/*        <tbody>*/}
        {/*        <tr className="Rev">*/}
        {/*            <td>*/}
        {/*                <textPath*/}
        {/*                    className="use-pic">*/}
        {/*                    Donald J. Trump @realDonaldTrump*/}
        {/*                </textPath>*/}
        {/*            </td>*/}
        {/*            <td>*/}
        {/*                <textPath>*/}
        {/*                    원하는 서비스를 제공받을수가 없습니다,  오류를 해결해주세요.*/}
        {/*                </textPath>*/}
        {/*            </td>*/}
        {/*            <td>2020.07.31</td>*/}
        {/*        </tr>*/}
        {/*        </tbody>*/}
        {/*    </Table>*/}
        {/*    <Button className="fix-btn" variant="secondary" >*/}
        {/*        <Link to='/CSFix'>수정하기</Link></Button>*/}
        {/*    <Form.Group className="comment">*/}
        {/*        <button className='comment-btn' >댓글 :</button>*/}
        {/*        <Form.Control type="text" placeholder="Normal text" />*/}
        {/*        <Button className="fix-btn" variant="secondary" >*/}
        {/*            <Link to='/CSReview'>댓글달기</Link>*/}
        {/*        </Button>*/}
        {/*    </Form.Group>*/}
        {/*</div>*/}

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
                <ReactQuill  // 게시물제목 클릭이후 BoardNo를 통한 내용정보를 볼수있음
                  theme="snow"
                  value={content}
                  modules={modules}
                  formats={formats}
                  readOnly
                />}

                {!readOnly &&
                <ReactQuill  // 수정하기 클릭이후 내용정보 수정하기 사용가능.
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
              <Button className="fix-btn" //클릭시 수정하기 모드로 변환
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
                <Button className="fix-btn" //클릭시 커뮤니티 창으로 업로드&이동
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

export default CSReview;

