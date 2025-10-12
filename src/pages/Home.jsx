import React from 'react';
import hstyle from '../css/Home.module.css';
import { useNavigate } from 'react-router-dom';


function Home() {

    const navigate = useNavigate();
    return (
        <>
            <div className={hstyle.main}>
                <div className={hstyle.container}>
                    <h2>welcome to chit-chat</h2>
                    <button className={hstyle.button} onClick={() => navigate('/login')}>Continue</button>
                </div>
            </div>
        </>
    );
}

export default Home;

// Completed.