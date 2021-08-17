import React, { useState, useContext } from 'react'

import DatePicker from 'react-date-picker'

import MainContext from '../context/MainContext'

import '../styles/header.css'

const Header = () => {

    const [ date, setDate] = useState( new Date() )
    const [ languages ] = useState([{key:'ro_RO', name: 'RO'}, {key:'en_US', name: 'EN'}])

    const { language, setLanguage } = useContext(MainContext)
    
    return (
        <header>
            <div className='logo'>
                <img src='./logo.png' alt='logo'/>
                <p>Currency Exchange</p>
            </div>
            <section>
                <DatePicker
                    onChange={setDate}
                    value={date}
                />
                <select value={language} onChange={ e => setLanguage(e.target.value) }>
                    { languages.map( lang => <option key={lang.key} value={lang.key}>{lang.name}</option> ) }
                </select>
            </section>
        </header>
    )
}

export default Header
