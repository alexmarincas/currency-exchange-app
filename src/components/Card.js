import React, { useState, useEffect, useContext } from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'
import CurrencyFlag from 'react-currency-flags'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import MainContext from '../context/MainContext'

import '../styles/card.css'

const Card = ({currency}) => {

    const [ symbol, setSymbol ] = useState(null)
    const [ value, setValue ] = useState('')

    const { name, code, index } = currency

    const { base, setBase, rates, allCurrency, setAllCurrency, amount, setAmount, coeficient, setCoeficient } = useContext(MainContext)

    useEffect(() => {
        if(code!==base){
            const convertedAmount = rates[code] * amount * coeficient
            setValue( convertedAmount.toFixed(2) )
        }
    }, [base, code, rates, amount, coeficient])

    useEffect(()=>{
        setSymbol( getSymbolFromCurrency(code) )
    },[code])

    const handleChange = e =>{

        if(code !== base){
            setBase(code)
            setCoeficient( code==='EUR' ? 1 : 1/rates[code] )
        }

        if(!isNaN( Number(e.target.value) )){
            setValue( e.target.value )
            setAmount( e.target.value )
        }

    }

    const handleClose = () =>{
        const temp = [...allCurrency]
        temp[index].active = false        
        setAllCurrency(temp)
        if( temp[index].code === base ){
            setBase('EUR')
            setCoeficient(1)
        }
    }

    return (
        <div className={ base===code ? 'card base' : 'card'}>
            <FontAwesomeIcon icon={ faTimes } className='close' onClick={ handleClose } />
            <CurrencyFlag currency={ code } className='flag' size="lg" />
            <p className='symbol'>{symbol}</p>
            <input type='text' value={value} onChange={ handleChange } autoComplete="false" className='textbox' placeholder='amount' />
            <p className='abbreviation'>{code}</p>
            <p className='convert' data-msg={`${(rates[code] * coeficient).toFixed(6)} ${code}`}>1 {base} = { (rates[code] * coeficient).toFixed(2)} {code}</p>
            <p className='name'>{name}</p>
        </div>
    )
}

export default Card
