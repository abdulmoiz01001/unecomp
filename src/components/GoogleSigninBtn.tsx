// components/GoogleSignInButton.tsx
import { signIn } from 'next-auth/react';
import { FC } from 'react';

const GoogleSigninBtn: FC = () => {
  return (
    <button
      onClick={() => signIn('google')}
      className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300"
    >
      <svg
        className="w-5 h-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M23.09 12.26c.57-1.62.91-3.37.91-5.26 0-1.89-.34-3.64-.91-5.26L12 12l11.09 5.26zM12 22l11.09-5.26c.57-1.62.91-3.37.91-5.26 0-1.89-.34-3.64-.91-5.26L12 22zM2 12c0 1.89.34 3.64.91 5.26L12 12 2.91 7.74C2.34 9.36 2 11.11 2 12zm20.09 7.74c-1.38 3.6-4.32 6.52-8.09 8.09L12 22l11.09 5.26c3.77-1.57 6.71-4.49 8.09-8.09L12 22zM2 12c0 1.89.34 3.64.91 5.26L12 12 2.91 7.74C2.34 9.36 2 11.11 2 12z"/>
      </svg>
      <span className="text-sm font-medium">Sign in with Google</span>
    </button>
  );
};

export default GoogleSigninBtn;
