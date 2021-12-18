import Head from 'next/head'
import Blogcards from '../components/Blogcards'

export default function Home({posts}) {
  console.log(posts)
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-6 my-6">
        {/* Top */}
        <div className="flex items-center justify-center h-28 py-2">
          <h1 className="text-3xl font-semibold">Gerardo's Blog</h1>
        </div>
        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(({title, slug, published_at, description, user})=>(
          <div className="my-6">
            <Blogcards key={slug} title={title} date={published_at} desc={description} usr={user}/>
          </div>
        ))}
        </div>
      </div>
      </div>
  )
}

export async function getStaticProps(){
  const req = await fetch("https://strapi.legisladoresmx.fun/posts").then(r=>r.json())

  // console.log(req[0])

  return{
    props:{
      posts:req
    }
  }
}
