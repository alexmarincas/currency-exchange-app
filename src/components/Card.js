import React, { useState, useEffect, useContext } from 'react'
import getSymbolFromCurrency from 'currency-symbol-map'
import CurrencyFlag from 'react-currency-flags'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import MainContext from '../context/MainContext'

const Card = ({currency}) => {

    const [ symbol, setSymbol ] = useState(null)
    const [ value, setValue ] = useState(0)
    const [ valueTitle, setValueTitle ] = useState(0)

    const { name, code, index } = currency
    const { base, setBase, rates, allCurrency, setAllCurrency, amount, setAmount, coeficient, setCoeficient } = useContext(MainContext)

    // Here we are updating the exchange value for all the active cards, except the one we are typing in
    useEffect(() => {
        if(code!==base){
            const convertedAmount = rates[code] * amount * coeficient
            setValue( convertedAmount.toFixed(2) )
            setValueTitle( convertedAmount.toFixed(6) )
        }else{
            setValueTitle(value)
        }
    }, [base, code, rates, amount, coeficient, value])

    // Get the currency symbol
    useEffect(()=>{
        setSymbol( getSymbolFromCurrency(code) )
    },[code])

    // Update the card exchange value and set the card's currency as base; here we updating also the coeficient because the current subscription (free) doesn't support the custom base endpoint
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

    // Remove the card when we click the x button; also, if the card removed was the one set as base, we reset the base currency to EUR
    const handleRemoveCard = () =>{
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
            <FontAwesomeIcon icon={ faTimes } className='close' onClick={ handleRemoveCard } />
            <CurrencyFlag currency={ code } className='flag' size="lg" />
            <p className='symbol'>{symbol}</p>
            <input 
                type='text' 
                value={value} 
                onChange={ handleChange } 
                autoComplete="false" 
                className='textbox' 
                placeholder='amount' 
                title={ valueTitle }
                onFocus={ e => e.target.select() }
            />
            <p className='abbreviation'>{code}</p>
            <p className='convert' data-msg={`${(rates[code] * coeficient).toFixed(6)} ${code}`}>1 {base} = { (rates[code] * coeficient).toFixed(2)} {code}</p>
            <p className='name'>{name}</p>
        </div>
    )
}

export default Card
