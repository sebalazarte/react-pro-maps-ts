import React from 'react'
import { BtnMyLocation, MapView, ReactLogo } from '../components'

export const HomeScreen = () => {
  return (
    <div>
        <MapView/>
        <BtnMyLocation/>
        <ReactLogo/>
    </div>
  )
}
