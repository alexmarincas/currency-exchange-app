import React, { Suspense, useContext, useEffect } from 'react'
import { TweenMax } from 'gsap'

import '../styles/currency.css'
import MainContext from '../context/MainContext'

const Valuta = React.lazy(() => import('./Valuta'))

const Currency = () => {

    const { currencyRef, allCurrency } = useContext(MainContext)

    useEffect(()=>{
        TweenMax.to(
            currencyRef.current,
            .3,
            { y: '0px', opacity: 1 }
        )
    }, [currencyRef])

    return (
        <Suspense fallback={<h1 className='currency-list'>Loading..</h1>}>
        <div className='currency-list' ref={currencyRef}>
            { allCurrency.map( (el, i) => <Valuta el={el} index={i} key={`el${i}`} />) }
        </div>
        </Suspense>
    )
}

export default Currency
