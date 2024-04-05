import BlogPost from "@/components/UI/BlogPost";
import RootLayout from "@/components/layout/RootLayout";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Blog posts</title>
        <meta
          name="description"
          content="This is The home page of Blog pages"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* body  */}
      <BlogPost />
    </div>
  );
}

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};
