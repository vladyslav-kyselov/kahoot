import React from "react";
import {Route, Routes} from "react-router-dom";
import {Home} from "./modules/home";
import {HomeHost} from "./modules/home/host";
import {Quizzes} from "./modules/quizzes";
import {Quiz} from "./modules/quiz";
import {Game} from "./modules/game";
import {AdminHeader} from "./components/admin-header";
import {Rating} from "./modules/rating";
import {RedirectPage} from "./modules/redirect";

import './styles/_variable.scss'
import './main.css';


function App() {
    return (
        <Routes>
                <Route index element={<Home/>}/>
                <Route path="/home-host" element={<HomeHost/>}/>
                <Route path="/quizzes" element={
                    <AdminHeader>
                        <Quizzes/>
                    </AdminHeader>
                }/>
                <Route path="/quiz/:id" element={
                    <AdminHeader>
                        <Quiz/>
                    </AdminHeader>
                }/>
                <Route path="/game" element={<Game/>}/>
                <Route path="/rating" element={<Rating/>}/>

                <Route path="*" element={<RedirectPage/>}/>
            </Routes>
    )
}

export default App
