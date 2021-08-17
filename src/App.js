
import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import './styles/body.css'

import CurrencyList from 'currency-list'
import Header from './components/Header'
import Card from './components/Card'
import Footer from './components/Footer'

import MainContext from './context/MainContext'
import Currency from './components/Currency'

function App() {

  const [ currencyList, setCurrencyList ] = useState([]) //[ 'GBP', 'EUR', 'USD', 'RON', 'MDL', 'RUB', 'JPY', 'AUD' ]
  const [ base, setBase ] = useState('')
  const [ allCurrency, setAllCurrency ] = useState([])
  const [ language, setLanguage ] = useState('ro_RO') // en_US
  const [ showCurrencyList, setShowCurrencyList ] = useState(false)

  const currencyRef = useRef(null)

  useEffect(() => {
    
    const temp = []
    for( let x=0; x<allCurrency.length; x++ ){
      if(allCurrency[x].active){
        temp.push(allCurrency[x].code)
      }
    }
    setCurrencyList(temp)

  }, [allCurrency])
  
  //  List of Currency Codes   
  useEffect(()=>{
    const temp = CurrencyList.getAll(language)
    const temp_array = Object.keys(temp).map( key => {
      const el = temp[key]
      return { name: el.name, symbol:el.symbol, code:el.code, name_plural: el.name_plural, active: false }
    })

    setAllCurrency(temp_array)
  }, [language])


  // http://api.exchangeratesapi.io/v1/latest?access_key=af8e95f6ec37b3b3219e0bb172121a74

  const state = { currencyList, setCurrencyList, allCurrency, setAllCurrency, base, setBase, language, setLanguage, showCurrencyList, setShowCurrencyList, currencyRef }

  return (
    <MainContext.Provider value={state}>
    <>
        <Header />
        <div className='body'>
            { currencyList.map(currency => <Card currency={currency} key={currency} /> ) }
        </div>
        { showCurrencyList && <Currency /> }
        <Footer />
    </>
    </MainContext.Provider>
  )
}

export default App
