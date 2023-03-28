import React from 'react';
import { useState, useEffect } from 'react';
import Hamburger from 'hamburger-react';
import { motion, AnimatePresence } from 'framer-motion';
//import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHome,
    faWindowMaximize,
    faGear,
    faCompass,
    faGamepad,
} from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
export default function Modal() {
    const [modal, setModal] = useState(false);
    const [isTabbed, setTabbed] = useState(false);
    useEffect(() => {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('content');
        const btn = document.getElementById('get-started-button');
        let btn2 = document.getElementById('get-started');
        const ham = document.getElementsByClassName('hamburger-react')[0];
        const ham2 = document.getElementById('hamburger');
        const span = document.getElementsByClassName('close')[0];
        if (localStorage.getItem('tabs') === 'true') {
            setTabbed(true)
        }
        //detect click outside modal
        window.onclick = function (event) {
            if (event.target === btn || event.target === btn2) {
                setModal(true);
            } else if (event.target === ham || event.target === ham2) {
                console.log('');
            } else {
                setModal(false);
            }
        };
    }, []);
    //onscroll
    window.onscroll = function () {
        setModal(false);
    };
    return (
            <div>
            <AnimatePresence>
                {modal && (
                    <motion.div
                        animate={{ x: '0', opacity: 1 }}
                        initial={{ x: '200%', opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        exit={{ x: '200%', opacity: 0 }}
                        className="modal w-52"
                        id="modal"
                    >
                        <div
                            className="modal-content font-['Exo_2'] text-center p-2"
                            id="content"
                        >
                            <ul className="modal-list">
                                <li className="modal-list-item text-xl font-semibold rounded-xl hover:bg-[var(--bg-color)] hover:brightness-200 m-3">
                                    <a
                                        rel="prefetch"
                                        href="/"
                                        className="modal-list-item-link block w-full p-2 border-[var(--border-color)] border-2 border-solid rounded-xl"
                                    >
                                        <FontAwesomeIcon icon={faHome} /> Home
                                    </a>
                                </li>
                                {!isTabbed &&
                                <li className="modal-list-item text-xl font-semibold rounded-xl hover:bg-[var(--bg-color)] hover:brightness-200 m-3">
                                    <a
                                        rel="prefetch"
                                        href="/search"
                                        className="modal-list-item-link block w-full p-2 border-[var(--border-color)] border-2 border-solid rounded-xl"
                                    >
                                        <FontAwesomeIcon
                                            icon={faWindowMaximize}
                                        />{' '}
                                        Proxy
                                    </a>
                                </li>
                                }
                                {isTabbed && 
                                <li className="modal-list-item text-xl font-semibold rounded-xl hover:bg-[var(--bg-color)] hover:brightness-200 m-3">
                                    <a
                                        rel="prefetch"
                                        href="/tabs"
                                        className="modal-list-item-link block w-full p-2 border-[var(--border-color)] border-2 border-solid rounded-xl"
                                    >
                                        <FontAwesomeIcon
                                            icon={faWindowMaximize}
                                        />{' '}
                                        Proxy
                                    </a>
                                </li>
                                }
                                <li className="modal-list-item text-xl font-semibold rounded-xl hover:bg-[var(--bg-color)] hover:brightness-200 m-3">
                                    <a
                                        rel="prefetch"
                                        href="/games"
                                        className="modal-list-item-link block w-full p-2 border-[var(--border-color)] border-2 border-solid rounded-xl"
                                    >
                                        <FontAwesomeIcon icon={faGamepad} />{' '}
                                        Games
                                    </a>
                                </li>
                                <li className="modal-list-item text-xl font-semibold rounded-xl hover:bg-[var(--bg-color)] hover:brightness-200 m-3">
                                    <a
                                        rel="prefetch"
                                        href="/apps"
                                        className="modal-list-item-link block w-full p-2 border-[var(--border-color)] border-2 border-solid rounded-xl"
                                    >
                                        <FontAwesomeIcon icon={faCompass} />{' '}
                                        Apps
                                    </a>
                                </li>
                                <li className="modal-list-item text-xl font-semibold hover:bg-[var(--bg-color)] hover:brightness-200 m-3 rounded-xl">
                                    <a
                                        rel="prefetch"
                                        href="/settings"
                                        className="modal-list-item-link block w-full p-2 border-[var(--border-color)] border-2 border-solid rounded-xl"
                                    >
                                        <FontAwesomeIcon icon={faGear} />{' '}
                                        Settings
                                    </a>
                                </li>
                                <li className="modal-list-item text-xl font-semibold rounded-xl hover:bg-[var(--bg-color)] hover:brightness-200 m-3">
                                    <a
                                        rel="prefetch"
                                        href="https://auttaja.io/ruby"
                                        className="modal-list-item-link block w-full p-2 border-[var(--border-color)] border-2 border-solid rounded-xl"
                                    >
                                        <FontAwesomeIcon icon={faDiscord} />{' '}
                                        Discord
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="h-14" id="hamburger">
                <Hamburger
                    toggled={modal}
                    toggle={setModal}
                    size={25}
                    color={'var(--text-color)'}
                />
            </div>
        </div>
    );
}
