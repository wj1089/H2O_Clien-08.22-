import React from "react";
import {Switch, Route } from "react-router-dom";
import {NavBar, Footer} from './layout'
import {MainTopPage, MainBottomPage} from './pages/splash-page'
import {SearchHospital} from './pages/SearchHospital'
import {Ambulance} from './pages/Ambulance'
import {TeleMedicine, RtcRoom} from './pages/TeleMedicine'
import {Community, CustomerServiceCenter, QueAn, Review,CSReview, Edit,QAFix,CSFix,QAReview,Fix } from './pages/Community'
import {Login, SignUp, MyPage, UserModify, UserFindID, UserFindPW, UserDelete, } from './pages/Account'
import './pages/Community/community.css'

const Page = () => (

    <Switch>
            <Route path="/" exact>
                    <MainTopPage/>
                    <MainBottomPage/>
                    <Footer/>
            </Route>

            <Route path="/Ambulance">
                    <NavBar/>
                    <Ambulance/>
                    <Footer/>
            </Route>

            <Route path="/CustomerServiceCenter">
                    <NavBar/>
                    <CustomerServiceCenter/>
                    <Footer/>
            </Route>

            <Route path="/QueAn">
                    <NavBar/>
                    <QueAn/>
                    <Footer/>
            </Route>

        {/*<Route path="/QAReview">*/}
        {/*    <NavBar/>*/}
        {/*    <Route path={`/Community/QAReview/:boardNo`}*/}
        {/*           render = {(props) => <QAReview {...props}/>}>*/}
        {/*    </Route>*/}
        {/*    <Footer/>*/}
        {/*</Route>*/}


            <Route path="/QAFix">
                    <NavBar/>
                    <QAFix/>
                    <Footer/>
            </Route>
            <Route path="/QAReview">
                    <NavBar/>
                    <QAReview/>
                    <Footer/>
            </Route>

            <Route path="/Review">
                <NavBar/>
                    <Route path={`/Community/Review/:boardNo`}
                           render = {(props) => <Review {...props}/>}>
                    </Route>
                <Footer/>
            </Route>


            <Route path="/Fix">
                <NavBar/>
                    <Route path={`/Community/Fix/:boardNo`}
                           render = {(props) => <Fix {...props}/>}>
                    </Route>
                <Footer/>
            </Route>


            {/*<Route path="/CSReview">*/}
            {/*        <NavBar/>*/}
            {/*        <CSReview/>*/}
            {/*        <Footer/>*/}
            {/*</Route>*/}

        <Route path="/CSReview">
            <NavBar/>
            <Route path={`/Community/CSReview/:boardNo`}
                   render = {(props) => <CSReview {...props}/>}>
            </Route>
            <Footer/>
        </Route>



        <Route path="/CSFix">
                    <NavBar/>
                    <CSFix/>
                    <Footer/>
            </Route>

            <Route path="/Edit">
                    <NavBar/>
                  <Edit/>
                    <Footer/>
            </Route>

            <Route path="/Community">
                    <NavBar/>
                    <Community/>
                    <Footer/>
            </Route>

            <Route path="/SearchHospital">
                    <NavBar/>
                    <SearchHospital/>
                    <Footer/>
            </Route>

            <Route path="/Login">
                    <NavBar/>
                    <Login/>
                    <Footer/>
            </Route>

            <Route path="/MyPage">
                    <NavBar/>
                    <MyPage/>
                    <Footer/>
            </Route>

            <Route path="/UserModify">
                    <NavBar/>
                    <UserModify/>
                    <Footer/>
            </Route>

            <Route path="/UserFIndID">
                    <NavBar/>
                    <UserFindID/>
                    <Footer/>
            </Route>

            <Route path="/UserFIndPW">
                    <NavBar/>
                    <UserFindPW/>
                    <Footer/>
            </Route>

            <Route path="/UserDelete">
                    <NavBar/>
                    <UserDelete/>
                    <Footer/>
            </Route>

            <Route path="/SignUp">
                    <NavBar/>
                    <SignUp/>
                    <Footer/>
            </Route>




            
            <React.Fragment>
                    <Route path="/TeleMedicine" exact component={RtcRoom}/>
                    <Route path="/TeleMedicine/:roomId" exact component={TeleMedicine}/>
            </React.Fragment>

    </Switch>
);

export default Page;