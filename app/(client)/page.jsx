import React from 'react'
import Hero from './_home/review'
import WhatweOffer from './_home/what-we-offer'
import OurCoaches from './_home/our-coaches'
import BookSession from './_home/Book-a-session'
import Reviews from './_home/review'

export default function HomePage() {
  return (
    <>
        <div className=''>
          <WhatweOffer />
          <OurCoaches />
          <BookSession />
          <Reviews />
        </div>
    </>
  )
}