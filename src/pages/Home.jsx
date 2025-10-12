import React from 'react';
import hstyle from '../css/Home.module.css'; // Make sure path is correct
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className={hstyle.main}>
            <div className={hstyle.imgs}></div>
            <div className={hstyle.container}>
                <h2 className={hstyle.heading}>Welcome to Chit-Chat</h2>
                <button className={hstyle.button} onClick={() => navigate('/login')}>
                    Continue
                </button>
            </div>
        </div>
    );
}

export default Home;
