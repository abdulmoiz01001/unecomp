"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import contactImage from "@/assets/contact.jpeg";
import globalCartCountAction from "@/actions/globalCartCountAction";
import { cartsCount } from "@/lib/store/features/carts/cartsSlice";
import contactMessageAction from "@/actions/contactMessageAction";
import { useAppDispatch } from "@/lib/store/hooks";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useFormik } from "formik";
import * as Yup from "yup";

gsap.registerPlugin(ScrollTrigger);

const ContactUsComp = () => {
  const dispatch = useAppDispatch();

  const countCarts = async () => {
    try {
      console.log("Counting carts");
      const cart = await globalCartCountAction();
      if (cart == null) {
        console.log("Cart is empty");
        return;
      }
      dispatch(cartsCount(cart));
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  };

  useEffect(() => {
    console.log("Counting carts");
    countCarts();
  }, []);

  const sendMessage = async (values: any) => {
    try {
      console.log("Sending message", values);
      // Send message to the server
      const sendMail = await contactMessageAction(values);
      if(sendMail){
        toast.success('Contact Message Sent!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      } else{
        toast.error('Failed to send message', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }



    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      console.log("Form data", values);
      await sendMessage(values);
      resetForm();
    },
  });

  return (
    <div className="min-h-screen w-[100vw] bg-gray-100 flex flex-col items-center p-8">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
      <ToastContainer className="z-50 mt-[100px]" />
        <div className="w-full h-96 relative">
          <Image
            src={contactImage}
            alt="Contact Us"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-8 flex flex-col md:flex-row">
          <div className="md:w-1/2 md:pr-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
            <p className="text-gray-600 mb-4">
              We would love to hear from you! Whether you have a question about
              our services, pricing, or anything else, our team is ready to
              answer all your questions. Please fill out the form on the right,
              and we will get in touch with you shortly.
            </p>
            <p className="text-gray-600 mb-4">You can also reach us at:</p>
            <p className="text-gray-600 mb-4">
              <strong>Email:</strong> abdulmoizawan@acm.org || asadchipa15@gmail.com
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Phone:</strong> +92 331 3645504 || +92 333 8270932
            </p>
           
          </div>
          <div className="md:w-1/2 md:pl-8 mt-8 md:mt-0">
            <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="px-4 py-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600 text-sm">{formik.errors.name}</div>
              ) : null}

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="px-4 py-2 border border-gray-300 rounded"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600 text-sm">{formik.errors.email}</div>
              ) : null}

              <textarea
                name="message"
                placeholder="Message"
                className="px-4 py-2 border border-gray-300 rounded h-32"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
              ></textarea>
              {formik.touched.message && formik.errors.message ? (
                <div className="text-red-600 text-sm">{formik.errors.message}</div>
              ) : null}

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded active:scale-95 hover:bg-green-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsComp;
