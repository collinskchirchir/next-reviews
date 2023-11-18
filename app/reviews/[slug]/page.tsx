import Heading from "@/components/Heading";
import { getReview, getSlugs } from "@/lib/reviews";

interface ReviewPageProps {
   params: { slug: string };
}
interface ReviewPageParams {
   slug: string;
}

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
   const slugs = await getSlugs();
   // transform each string in array into object: parenthesis required around boject literal the or will be treated as function body
   return slugs.map ((slug) => ({ slug }) );
}

export default async function ReviewPage({params: {slug}}: ReviewPageProps)   {
   const review = await getReview(slug);
   console.log('[ReviewPage] rendering', slug);
   return (
      <>
         <Heading>{review.title}</Heading>
         <p className="italic pb-2">{review.date}</p>
         <img 
            src={review.image}
            className="mb-2 rounded"
            width="640"
            height="360"
         />
         <article 
            dangerouslySetInnerHTML={{__html: review.body}}
            className="max-w-screen-sm prose prose-slate"         
         />     
      </>
   );
}