/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["firebase", "@firebase/app", "@firebase/auth", "@firebase/firestore", "@firebase/util", "@firebase/component", "@firebase/logger"],
};

export default nextConfig;
