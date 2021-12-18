import markdownToHtml from "../../lib/markdowntohtml"
import markdownStyles from './markdown-styles.module.css'

export default function Post({results,contenido}) {
    const blog = results[0]
    return (
        <div className="flex-col items-center justify-center min-h-screen mt-9">
            {/* Title */}
            <div className="flex-col items-center justify-start ml-6 md:ml-36 space-y-2">
                <h1 className="text-5xl font-bold">{blog["title"]}</h1>
            </div>
            <div className="flex-col items-center justify-start ml-6 md:ml-36 mt-2">
                <p className="text-sm font-extralight"><span className="font-normal">Fecha: </span> {blog["published_at"].slice(0,10)}</p>
                <p className="text-sm font-extralight"><span className="font-normal">Autor: </span> {blog["user"]["username"]}</p>
            </div>
            <div className="mx-8 md:mx-36 my-6">
                <div className={markdownStyles["markdown-body"]} dangerouslySetInnerHTML={{ __html: contenido }}>
                </div>
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
    
    const content = await markdownToHtml(article_post[0].content || "")
    
    return{
        props:{
            results:article_post,
            contenido:content
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