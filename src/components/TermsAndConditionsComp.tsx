"use client"
import React, { useState } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';

const TermsAndConditionsComp = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index : any) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const terms = [
    {
      question: 'General Terms',
      answer: 'These terms and conditions outline the rules and regulations for the use of UneComp’s Website. By accessing this website we assume you accept these terms and conditions in full. Do not continue to use UneComp’s website if you do not accept all of the terms and conditions stated on this page.'
    },
    {
      question: 'License',
      answer: 'Unless otherwise stated, UneComp and/or its licensors own the intellectual property rights for all material on UneComp. All intellectual property rights are reserved. You may view and/or print pages from http://unecomp.com for your own personal use subject to restrictions set in these terms and conditions.'
    },
    {
      question: 'User Comments',
      answer: 'Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material and data (\'Comments\'). UneComp does not screen, edit, publish or review Comments prior to their appearance on the website and Comments do not reflect the views or opinions of UneComp, its agents or affiliates.'
    },
    {
      question: 'Hyperlinking to our Content',
      answer: 'The following organizations may link to our Web site without prior written approval: Government agencies, Search engines, News organizations, Online directory distributors when they list us in the directory may link to our Web site in the same manner as they hyperlink to the Web sites of other listed businesses; and Systemwide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.'
    },
    {
      question: 'iFrames',
      answer: 'Without prior approval and express written permission, you may not create frames around our Web pages or use other techniques that alter in any way the visual presentation or appearance of our Web site.'
    },
    {
      question: 'Content Liability',
      answer: 'We shall have no responsibility or liability for any content appearing on your Web site. You agree to indemnify and defend us against all claims arising out of or based upon your Website. No link(s) may appear on any page on your Web site or within any context containing content or materials that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.'
    }
  ];

  return (
    <section className="w-full min-h-[100vh] xxs:h-full xs:h-full bg-gray-200 flex flex-col items-center p-8">
      <div className="w-full flex flex-col justify-center items-center mb-8">
        <h1 className="text-6xl xxs:text-4xl xs:text-4xl font-semibold text-gray-700 p-4">Terms and Conditions</h1>
        <p className="text-lg xxs:text-sm xs:text-sm font-semibold text-gray-700 p-4 text-center">
          Please read these terms and conditions carefully before using our website.
        </p>
      </div>
      <div className="w-[90%] xxs:w-full xs:w-full flex flex-wrap justify-between items-start gap-8">
        {terms.map((item, index) => (
          <div
            key={index}
            className="w-[45%] xxs:w-full xs:w-full bg-white border-2 border-gray-300 rounded-lg shadow-md overflow-hidden transition-all"
          >
            <div
              className="px-4 xxs:px-2 xs:px-2 xxs:py-4 xs:py-2 py-6 flex justify-between items-center cursor-pointer bg-slate-300 hover:bg-slate-400 transition-colors"
              onClick={() => toggleQuestion(index)}
            >
              <h1 className="text-2xl xxs:text-xl xs:text-xl font-semibold text-gray-700">{item.question}</h1>
              <p className="text-4xl xxs:text-2xl xs:text-2xl font-semibold text-gray-700">
                {openQuestion === index ? '-' : '+'}
              </p>
            </div>
            <div
              className={`px-4 py-6 text-gray-600 transition-max-height duration-500 ease-in-out ${openQuestion === index ? 'max-h-screen' : 'max-h-0'
                } overflow-hidden`}
            >
              <p className='xxs:text-sm xs:text-sm'>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-[50%] xxs:w-full xs:w-full flex xxs:mt-4 xs:mt-4 flex-col justify-center items-center">
        <FaRegQuestionCircle size={50} />
        <h1 className="text-4xl xxs:text-xl xs:text-xl font-semibold text-gray-700 p-4">Need more information?</h1>
        <p className="text-lg xxs:text-sm xs:text-sm font-semibold text-gray-700 p-4 text-center">
          Feel free to reach out to us for further clarification on our terms and conditions.
        </p>
        <button className="text-white w-[40%] xxs:w-[80%] xs:w-[80%] xxs:text-sm xs:text-sm active:scale-95 font-bold text-2xl bg-[#285d31] px-8 py-2 rounded-lg border-2 transition-transform">
          Contact Us
        </button>
      </div>
    </section>
  );
}

export default TermsAndConditionsComp;
