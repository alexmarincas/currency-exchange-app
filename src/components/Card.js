import React, { useState, useEffect } from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'
import CurrencyFlag from 'react-currency-flags'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

import '../styles/card.css'

const Card = ({currency}) => {

    const [ symbol, setSymbol ] = useState(null)
    const [ value, setValue ] = useState('')

    useEffect(()=>{
        setSymbol( getSymbolFromCurrency(currency) )
    },[currency])

    const handleChange = e =>{
        setValue( e.target.value )
    }

    return (
        <div className='card'>
            <CurrencyFlag currency={ currency } size="sm" />
            <p>{symbol}</p>
            <input type='text' value={value} onChange={ handleChange } />
            <p>{currency}</p>
            <FontAwesomeIcon icon={ faWindowClose } />
        </div>
    )
}

export default Card
