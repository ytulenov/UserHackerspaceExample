"use client";

import { useEffect, useState } from 'react';

import Container from '@/components/ui/container';
import useCart from '@/hooks/use-cart';
import React from 'react';
import { Bold, Italic } from 'lucide-react';


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
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-bold text-4xl mb-8 text-center">FAQs</h1>
          <div className="text-lg mb-4">
          <details>
            <summary><strong>What Is IEEE-UBCO All About?</strong></summary>
            The IEEE (Institute of Electrical and Electronics Engineers) chapter at the University of British Columbia - Okanagan (UBC Okanagan) 
            is a dynamic and vibrant community dedicated to advancing the field of electrical and electronics engineering. Comprising passionate 
            students and professionals, the IEEE UBC Okanagan chapter actively engages in a spectrum of activities to foster collaboration, learning, 
            and networking opportunities. The chapter organizes a diverse range of events, including workshops, seminars, and projects, aimed at enhancing the 
            skills and knowledge of its members. With a mission to create a supportive environment for individuals interested in electrical engineering, IEEE UBC 
            Okanagan strives to make a positive impact on both the academic and professional aspects of its members' lives. 
          </details>
          <br/>
          <details>
            <summary><strong>How Can You Find Our Office?</strong></summary>
            Go to EME 2245 on its second floor of the Engineering, Management, and Education (EME) building. There is a sign on the door that says “MLRC HACKERSPACE”

          </details>
          <br/>
          <details>
            <summary><strong>What Other Services Do We Offer?</strong></summary>
            <li>Repairs: Bring in anything and we can assist in fixing it.</li>
            <li>Screen Installations: We can make screens for people like the one we have in our window.</li>
            <li>Lending of Books (Physical and Digital): See us if you need to borrow books for your  classes or interest.</li>

          </details>
          </div>
        </div>
      </Container>
    </div>
  )
};

export default aboutuspage;