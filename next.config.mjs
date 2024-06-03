/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "s3wezazaldezonhg.public.blob.vercel-storage.com"
			}
		]
	}
};

export default nextConfig;
