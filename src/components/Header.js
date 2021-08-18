import React, { useContext } from 'react'

import DatePicker from 'react-date-picker'
import MainContext from '../context/MainContext'


import '../styles/header.css'

const Header = () => {

    const { date, setDate } = useContext(MainContext)
    
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
            </section>
        </header>
    )
}

export default Header
