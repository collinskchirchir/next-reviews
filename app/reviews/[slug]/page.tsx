import Heading from "@/components/Heading";
import { getReview } from "@/lib/reviews";

interface ReviewPageProps {
   params: { slug: string };
}
export default async function ReviewPage({params: {slug}}: ReviewPageProps)   {
   console.log('[ReviewPage] props:', slug)
   const review = await getReview(slug);

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