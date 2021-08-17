import React, { useContext } from 'react'
import MainContext from '../context/MainContext'
import { TweenMax } from 'gsap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

import '../styles/footer.css'

const Footer = () => {

    const { language, setShowCurrencyList, showCurrencyList, currencyRef } = useContext(MainContext)

    const handleClick = () => {

        if(showCurrencyList){
            TweenMax.to(
                currencyRef.current,
                .3,
                { y: '200px', opacity: 0 }
            )

            setTimeout(()=>setShowCurrencyList(false), 300)
        }else{
            setShowCurrencyList(true)
        }
    }

    return (
        <footer className={ !showCurrencyList ? 'tooltip' : undefined } data-tooltip={ language === 'ro_RO' ? 'Adaugă valută' : 'Add currency' } onClick={ handleClick }>
            <FontAwesomeIcon icon={faChevronUp} className='expand_collapse' rotation={ showCurrencyList ? 180 : 0} />
        </footer>
    )
}

export default Footer
