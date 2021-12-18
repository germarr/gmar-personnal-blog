export default function Post({results}) {
    console.log(results)
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="mx-6">
                <p>{results[0]["content"]}</p>
            </div>
        </div>
    )
}

export async function getStaticProps({params}){
    const article_post = []
    
    const req = await fetch(`https://strapi.legisladoresmx.fun/posts`)
    const result = await req.json()

    result.forEach(element => {
        if(element["slug"] === params.postid){
            article_post.push(element)
        }
    });

    return{
        props:{
            results:article_post
        }
    }
}


export async function getStaticPaths(){
    const req = await fetch("https://strapi.legisladoresmx.fun/posts")
    const result = await req.json()


    return{
        paths: result.map(posts=>{
            return{
                params:{
                    postid:posts.slug
                }
            }
            }
        ),
        fallback:false
    }
}