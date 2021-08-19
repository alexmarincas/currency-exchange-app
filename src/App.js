
import React, { Suspense, useState, useEffect, useRef } from 'react'

import TweenMax from 'gsap'

// DUMMY DATA IN CASE OF NETWORK ERROR
import { data as localData } from './api/data'
import { symbols as localSymbols } from './api/symbols'

import Header from './components/Header'
import Card from './components/Card'
import Footer from './components/Footer'
import MainContext from './context/MainContext'
import Loading from './components/Loading'

import './App.css'
import './styles/body.css'

const access_key = 'af8e95f6ec37b3b3219e0bb172121a74'

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
    
    // FETCH LATEST EXCHANGE RATES
    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${access_key}`)
      .then(response => response.json())
      .then(data => {            
          if(data.success){ 
            setBase(data.base)              
            setRates(data.rates)           
          }else{
              console.error(data)
              setBase(localData.base)
              setRates(localData.rates)
              console.log('Exchange rates data loaded from local JSON')
          }
      }).catch((err)=>{
          console.error(err)
          setBase(localData.base)
          setRates(localData.rates)
          console.log('Exchange rates data loaded from local JSON')
      })

    
    // FETCH CURRENCY SYMBOLS
    // This condition was implemented because we are limited on accessing the server to 250 requests / month and also to improve loading time
    if( sessionStorage.getItem('currency_symbols') ){

      setAllCurrency( JSON.parse( sessionStorage.getItem('currency_symbols') ) )
      console.log('Symbols loaded from session storage')

    }else{

      fetch(`http://api.exchangeratesapi.io/v1/symbols?access_key=${access_key}`)
      .then(response => response.json())
      .then(data => {            
          if(data.success){ 

              const s = data.symbols    
              const temp_array = Object.keys(s).map( (key,i) => {  
                return { name: s[key], code: key, index: i, active: false }
              })
              setAllCurrency(temp_array)
              sessionStorage.setItem('currency_symbols', JSON.stringify(temp_array))
              console.log('Symbols fetched from the server')

          }else{
              console.error(data)
              const s = localSymbols.symbols    
              const temp_array = Object.keys(s).map( (key,i) => {  
                return { name: s[key], code: key, index: i, active: false }
              })
              setAllCurrency(temp_array)
              sessionStorage.setItem('currency_symbols', JSON.stringify(temp_array))
              console.log('Symbols loaded from local JSON')
          }
      }).catch((err)=>{
          console.error(err)
          const s = localSymbols.symbols    
              const temp_array = Object.keys(s).map( (key,i) => {  
                return { name: s[key], code: key, index: i, active: false }
              })
              setAllCurrency(temp_array)
              sessionStorage.setItem('currency_symbols', JSON.stringify(temp_array))
              console.log('Symbols loaded from local JSON')
      })

    }
    
  }, [])

  // Store currency to sessionStorage in order to reduce the number of interogations to the API
  useEffect(() => {
    if(allCurrency.length){
      sessionStorage.setItem('currency_symbols', JSON.stringify(allCurrency))
    }
  }, [allCurrency])


  // Fetch new rates each time the date is changing; if the date input is cleared, then we receive the latest rates
  useEffect(() => {

    // Convert date from 2021-08-19 Thu Aug 19 2021 20:32:24 GMT+0300 (Eastern European Summer Time) to 2021-08-19 format
    const formatDate = date => {
    
      let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear()
  
      if (month.length < 2) 
          month = '0' + month
      if (day.length < 2) 
          day = '0' + day
  
      return [year, month, day].join('-')
    }

    if(date){
      fetch(`http://api.exchangeratesapi.io/v1/${ formatDate(date) }?access_key=${access_key}`)
      .then(response => response.json())
      .then(data => {            
          if(data.success){             
            setRates(data.rates)           
          }else{
              console.error(data)
              setBase(localData.base)
              setRates(localData.rates)
              console.log('Exchange rates data loaded from local JSON')
          }
      }).catch((err)=>{
          console.error(err)
          setBase(localData.base)
          setRates(localData.rates)
          console.log('Exchange rates data loaded from local JSON')
      })

    }else{
      fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${access_key}`)
      .then(response => response.json())
      .then(data => {            
          if(data.success){ 
            setBase(data.base)              
            setRates(data.rates)            
          }else{
              console.error(data)
              setBase(localData.base)
              setRates(localData.rates)
              console.log('Exchange rates data loaded from local JSON')
          }
      }).catch((err)=>{
          console.error(err)
          setBase(localData.base)
          setRates(localData.rates)
          console.log('Exchange rates data loaded from local JSON')
      })
    }
  }, [date])

  // Close the currency list function
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

  // Toggle opacity of the root element when the currency list is visible or not
  useEffect(() => {
    if(toggleChevron){
      document.getElementById('root').classList.add("modal")
    }else{
      document.getElementById('root').classList.remove("modal")
    }
  }, [toggleChevron])

  // State management in order to avoid props drilling
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
