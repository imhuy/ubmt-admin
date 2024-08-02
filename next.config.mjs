/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [{
            port: '',
            pathname: '/**',
            protocol: 'https',
            hostname: 'mattranhanoi.com',
        }],
    }
};

export default nextConfig;
