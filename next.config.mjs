// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['fakestoreapi.com' , 'firebasestorage.googleapis.com' , 'www.bing.com'], // add your custom domains here
        
//       },
   
//         productionBrowserSourceMaps: false,
 
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/auth/login',
  //       permanent: false,
  //     },
  //   ];
  // },
  images: {
    domains: ['fakestoreapi.com', 'firebasestorage.googleapis.com', 'via.placeholder.com', 'www.bing.com'],
  },
  productionBrowserSourceMaps: false, // Disable source maps in production
  reactStrictMode: false,
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = 'eval-source-map'; // Enable source maps in development
    }

    return config;
  },
};

export default nextConfig;
