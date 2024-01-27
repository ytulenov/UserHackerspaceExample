"use client";

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import React from 'react';


export const revalidate = 0;

const aboutuspage = () => {
  const [isMounted, setIsMounted] = useState(false);


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  

  return (
    <div className="bg-white">
    <div style={{ backgroundImage:'https://res.cloudinary.com/dpoaqbfag/image/upload/v1701500591/ieee-1920x1080-1_ryst04.jpg'}}></div>
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-bold text-4xl mb-8 text-center text-decoration: underline">About Us</h1>
          <div className="text-lg mb-4">
          <p> Welcome to the official page of the Institute of Electrical and Electronics Engineers (IEEE) chapter at the University of British Columbia - Okanagan Campus. We are a vibrant community of students and professionals passionate about advancing technology and innovation.

            Our mission is to foster collaboration, learning, and networking opportunities for individuals interested in electrical and electronics engineering. Whether you are a student looking to expand your knowledge, a researcher seeking to connect with like-minded individuals, or a professional wanting to stay updated with the latest industry trends, IEEE UBCO is the place for you.

            Join us in our events, workshops, and activities that aim to enhance your skills, promote knowledge sharing, and create a supportive environment for growth. Together, we strive to make a positive impact on the field of electrical and electronics engineering.

            Feel free to explore our website for more information about our upcoming events, leadership team, and how you can get involved. If you have any questions or would like to collaborate with us, don't hesitate to reach out.

            
            </p>
            <p style={{ textAlign: 'center', fontWeight: 'bold' }}>⚡👍Thank you for being a part of IEEE UBCO!👍⚡</p>
          </div>
        </div>
      </Container>
    </div>
  )
};

export default aboutuspage;