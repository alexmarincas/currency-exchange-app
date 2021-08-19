import React, { useEffect, useState, useContext } from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'
import CurrencyFlag from 'react-currency-flags'

import MainContext from '../context/MainContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'


const Valuta = ({el, index}) => {

    const [ symbol, setSymbol] = useState(null)

    const { allCurrency, setAllCurrency } = useContext(MainContext)

    // Currency symbol
    useEffect(()=>{
        setSymbol( getSymbolFromCurrency(el.code) )
    },[el.code, setSymbol])

    // Here we toggle the clicked card (active/inactive)
    const handleClick = () =>{
        const temp = [...allCurrency]
        temp[index].active = !temp[index].active
        setAllCurrency(temp)
    }

    return (
        <div className={ el.active ? 'valuta selected' : 'valuta'} onClick={ handleClick }>
            <CurrencyFlag currency={ el.code } size="md" />
            <p className='valuta_symbol'>{symbol}</p>
            <p className='valuta_name'>{el.name}</p>
            <p className='valuta_code'>{el.code}</p>
            <FontAwesomeIcon icon={ el.active ? faMinusCircle : faPlusCircle } className={ el.active ? 'red' : undefined  }/>
        </div>
    )
}

export default Valuta
