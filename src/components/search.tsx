import React from 'react';
import { useState, useEffect } from 'react';
import Hamburger from 'hamburger-react';
import { motion, AnimatePresence } from 'framer-motion';
//import font awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function Search() {
    const [search, setSearch] = useState(false);
    //listen for search button click
    useEffect(() => {
        const searchButton = document.getElementById('search-button');
        if (searchButton !== null) {
            searchButton.addEventListener('click', () => {
                setSearch(true);
            });
        }
    }, []);
    return (
        <>
            {search && (
                <>
                    <div className="h-full w-full fixed top-0 left-0 right-0 bottom-0 z-40 bg-transparent backdrop-blur-sm overflow-hidden"></div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            const search =
                                document.getElementById('uv-address');
                            const searchForm =
                                document.getElementById('uv-form');
                            const newSearch =
                                document.getElementById('new-search');
                            if (search !== null) {
                                // @ts-ignore
                                search.value = newSearch.value;
                                if (searchForm !== null) {
                                    searchForm.dispatchEvent(
                                        new Event('submit')
                                    );
                                }
                                setSearch(false);
                            }
                        }}
                    >
                        <input
                            id="new-search"
                            placeholder="Search..."
                            type="text"
                            className="text-center password h-10 bg-[var(--input-bg-color)] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 rounded-xl"
                        />
                    </form>
                </>
            )}
        </>
    );
}
