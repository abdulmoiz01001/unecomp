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
      question: 'Delivery Terms',
      answer: 'Delivery is typically completed within 2-3 working days. However, please note that delays may occur due to unforeseen circumstances, and we will keep you informed of any changes. A fixed delivery charge of RS-200 applies, regardless of the quantity of products purchased.'
    },
    {
      question: 'Face to Face Checking Terms',
      answer: 'Our terms are strictly face-to-face transactions. We provide a warranty only for products that arrive damaged. We do not offer any warranty for internal issues or after the transaction has been completed. Once the deal is finalized, we are not responsible for any product concerns'
    },
    {
      question: 'Returns and Refunds',
      answer: 'Returns and refunds are only accepted within 3 days of receipt for unused products with the original seal intact; otherwise, no returns, replacements, or refunds will be granted.'
    },
    {
      question: 'Variation of Price',
      answer: 'Please note that prices are subject to change based on fluctuations in the main stock market; any increases will be reflected accordingly.'
    },
   
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
