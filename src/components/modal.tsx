import React from 'react';
import { useState, useEffect } from 'react';
import Hamburger from 'hamburger-react'
import { motion, AnimatePresence } from 'framer-motion';
export default function Modal() {
    const [modal, setModal] = useState(false);
    useEffect(() => {
        const modal = document.getElementById('modal');
        const modalContent = document.getElementById('content');
        const btn = document.getElementById('get-started');
        const ham = document.getElementsByClassName('hamburger-react')[0];
        const span = document.getElementsByClassName('close')[0];
        //detect click outside modal
        window.onclick = function (event) {
            if (event.target === btn) {
                setModal(true);
            }
            else if (event.target === ham) {
                console.log('');
            }
            else {
                setModal(false);
            }
        }
    }, []); 
    return (
        <div>
            <AnimatePresence>
                {modal && (
                    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 0.5 }} exit={{ opacity: 0}} className="modal w-52" id="modal">
                        <div className="modal-content text-right p-2" id="content">
                            <ul className="modal-list">
                                <li className="modal-list-item px-4 text-xl font-semibold rounded-sm hover:bg-[var(--bg-color)] hover:brightness-200 py-2">
                                    <a href="/" className="modal-list-item-link block">Home</a>
                                </li>
                                <li className="modal-list-item px-4 text-xl font-semibold rounded-sm hover:bg-[var(--bg-color)] hover:brightness-200 py-2">
                                    <a href="/proxy" className="modal-list-item-link block">Proxy</a>
                                </li>
                                <li className="modal-list-item px-4 text-xl font-semibold rounded-sm hover:bg-[var(--bg-color)] hover:brightness-200 py-2">
                                    <a href="https://auttaja.io/ruby" className="modal-list-item-link block">Discord</a>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="h-14" id="hamburger">
                <Hamburger toggled={modal} toggle={setModal} size={25} color={'var(--text-color)'} />
            </div>
        </div>
    );
}