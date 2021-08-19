
import React, { Suspense, useState, useEffect, useRef } from 'react'
import './App.css'
import './styles/body.css'

import TweenMax from 'gsap'

import { data } from './api/data'
import { symbols } from './api/symbols'

import Header from './components/Header'
import Card from './components/Card'
import Footer from './components/Footer'

import MainContext from './context/MainContext'
import Loading from './components/Loading'
const Currency = React.lazy(() => import('./components/Currency'))

function App() {

  const [ base, setBase ] = useState('')
  const [ coeficient, setCoeficient ] = useState(1)
  const [ amount, setAmount ] = useState(0)
  const [ rates, setRates ] = useState({})
  const [ allCurrency, setAllCurrency ] = useState([])
  const [ showCurrencyList, setShowCurrencyList ] = useState(false)
  const [ date, setDate] = useState( new Date() )
  const [ toggleChevron, setToggleChevron ] = useState(false)
  
  const currencyRef = useRef(null)
  
  useEffect(() => {

    const fetchData = async (url) => {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      return data
    }

    fetchData('https://dog.ceo/api/breeds/image/random')
    
    // http://api.exchangeratesapi.io/v1/latest?access_key=af8e95f6ec37b3b3219e0bb172121a74
    setBase( data.base ) // default EUR
    setRates( data.rates ) // FETCH AT START AND WHENEVER THE BASE IS CHANGING

    // FETCH CURRENCY SYMBOLS
    // This condition was implemented because we are limited on accessing the server to 250 requests / month and also to improve loading time
    if( sessionStorage.getItem('currency_symbols') ){
      setAllCurrency( JSON.parse( sessionStorage.getItem('currency_symbols') ) )
      console.log('Symbols loaded from session storage')
    }else{
      const s = symbols.symbols // FETCH ONCE AT START    
      const temp_array = Object.keys(s).map( (key,i) => {  
        return { name: s[key], code: key, index: i, active: false }
      })
      setAllCurrency(temp_array)
      sessionStorage.setItem('currency_symbols', JSON.stringify(temp_array))
      console.log('Symbols fetched from the server')
    }
    
  }, [])

  useEffect(() => {
    if(allCurrency.length){
      sessionStorage.setItem('currency_symbols', JSON.stringify(allCurrency))
    }
  }, [allCurrency])

  useEffect(() => {
    if(base && date){
      setRates( data.rates ) // FETCH AT START AND WHENEVER THE BASE / DATE ARE CHANGING
      // http://api.exchangeratesapi.io/v1/2013-12-24?access_key=af8e95f6ec37b3b3219e0bb172121a74&base=RON
    }
  }, [base, date])

  const handleFadeOut = () => {
    
    setToggleChevron(false)

    if(currencyRef.current){
      TweenMax.to(
        currencyRef.current,
        .3,
        { y: '200px', opacity: 0 }
      )
  
      setTimeout(()=>setShowCurrencyList(false), 300)
    }
  }

  useEffect(() => {
    if(toggleChevron){
      document.getElementById('root').classList.add("modal")
    }else{
      document.getElementById('root').classList.remove("modal")
    }
  }, [toggleChevron])

  const state = { coeficient, setCoeficient, toggleChevron, setToggleChevron, handleFadeOut, amount, setAmount, allCurrency, setAllCurrency, base, setBase, showCurrencyList, setShowCurrencyList, currencyRef, rates, setRates, date, setDate }

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
        { showCurrencyList && <Suspense fallback={<Loading />}><Currency /></Suspense> }
        <Footer />
    </>
    </MainContext.Provider>
  )
}

export default App
