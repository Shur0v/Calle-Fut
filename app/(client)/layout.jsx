"use client";
import React from 'react';
import Footer from "./_components/footer";
import Header from "./_components/header";
import WhatWeOffer from './_home/what-we-offer';
import OurCoaches from './_home/our-coaches';
import BookSession from './_home/Book-a-session';
import Review from './_home/review';

export default function Layout({ children }) {
    return (
      <div className="relative overflow-x-hidden">
        {/* Home Section */}
        <section id="home" className="w-full min-h-screen">
          <Header />
        </section>

        {/* What We Offer Section */}
        <section id="what-we-offer" className="w-full">
          <WhatWeOffer />
        </section>

        {/* Our Coaches Section */}
        <section id="our-coaches" className="w-full">
          <OurCoaches />
        </section>

        {/* Book a Session Section */}
        <section id="book-a-session" className="w-full">
          <BookSession />
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="w-full">
          <Review />
        </section>

        <Footer />
      </div>
    );
  }