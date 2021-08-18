
import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import './styles/body.css'

import TweenMax from 'gsap'

import { data } from './api/data'
import { symbols } from './api/symbols'

import Header from './components/Header'
import Card from './components/Card'
import Footer from './components/Footer'

import MainContext from './context/MainContext'
import Currency from './components/Currency'

function App() {

  const [ base, setBase ] = useState('')
  const [ amount, setAmount ] = useState(0)
  const [ rates, setRates ] = useState({})
  const [ allCurrency, setAllCurrency ] = useState([])
  const [ showCurrencyList, setShowCurrencyList ] = useState(false)
  const [ date, setDate] = useState( new Date() )
  
  const currencyRef = useRef(null)
  
  useEffect(() => {
    
    // http://api.exchangeratesapi.io/v1/latest?access_key=af8e95f6ec37b3b3219e0bb172121a74
    setBase( data.base ) // FETCH ONCE AT START
    setRates( data.rates ) // FETCH AT START AND WHENEVER THE BASE IS CHANGING

    const s = symbols.symbols // FETCH ONCE AT START
    
    const temp_array = Object.keys(s).map( (key,i) => {  
      return { name: s[key], code: key, index: i, active: false }
    })
    setAllCurrency(temp_array)
    
  }, [])

  useEffect(() => {
    if(base && date){
      setRates( data.rates ) // FETCH AT START AND WHENEVER THE BASE / DATE ARE CHANGING
      // http://api.exchangeratesapi.io/v1/2013-12-24?access_key=af8e95f6ec37b3b3219e0bb172121a74&base=RON
    }
  }, [base, date])

  const handleFadeOut = () => {

    if(currencyRef.current){
      TweenMax.to(
        currencyRef.current,
        .3,
        { y: '200px', opacity: 0 }
      )
  
      setTimeout(()=>setShowCurrencyList(false), 300)
    }
  }



  const state = { amount, setAmount, allCurrency, setAllCurrency, base, setBase, showCurrencyList, setShowCurrencyList, currencyRef, rates, setRates, date, setDate }

  return (
    <MainContext.Provider value={state}>
    <>
        <Header />
        <div className='body' onClick={ handleFadeOut }>
            { allCurrency.map(currency => {
              if(currency.active){
                return <Card currency={currency} key={currency.code} /> 
              }else{
                return undefined
              }
            }) }
        </div>
        { showCurrencyList && <Currency /> }
        <Footer />
    </>
    </MainContext.Provider>
  )
}

export default App
