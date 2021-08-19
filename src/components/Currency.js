import React, { useState, useContext, useEffect } from 'react'
import { TweenMax } from 'gsap'

import '../styles/currency.css'
import MainContext from '../context/MainContext'
import Valuta from './Valuta'

const Currency = () => {

    const { currencyRef, allCurrency } = useContext(MainContext)

    const [ search, setSearch ] = useState('')

    // Fade in / slide up animation
    useEffect(()=>{
        TweenMax.to(
            currencyRef.current,
            .3,
            { y: '0px', opacity: 1 }
        )
    }, [currencyRef])

    return (        
        <div className='currency-list' ref={currencyRef}>
            <input type='text' className='search' value={search} onChange={ e => setSearch(e.target.value) } placeholder='search...' />
            <section>
            { search ? 
                allCurrency.map( (el, i) => (el.code.includes(search.toUpperCase()) || el.name.toLowerCase().includes(search.toLowerCase())) && <Valuta el={el} index={i} key={`el${i}`} />) 
                :
                allCurrency.map( (el, i) => <Valuta el={el} index={i} key={`el${i}`} />) 
            }
            </section>
        </div>
    )
}

export default Currency
