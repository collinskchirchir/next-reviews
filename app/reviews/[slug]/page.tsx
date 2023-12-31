import Image from "next/image";
import Heading from "@/components/Heading";
import ShareLinkButton from "@/components/ShareLinkButton";
import { getReview, getSlugs } from "@/lib/reviews";
import { Metadata } from "next";

interface ReviewPageProps {
   params: { slug: string };
}
interface ReviewPageParams {
   slug: string;
}

// dynamic metadata for each review
export async function generateMetadata({ params: { slug } }: ReviewPageProps): Promise<Metadata> {
   const review = await getReview(slug);
   return {
      title: review.title
   }
}

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
   const slugs = await getSlugs();
   // console.log('[ReviewPage] generateStaticParams: ', slugs )
   // transform each string in array into object: parenthesis required around boject literal the or will be treated as function body
   return slugs.map((slug) => ({ slug }));
}

export default async function ReviewPage({ params: { slug } }: ReviewPageProps) {
   const review = await getReview(slug);
   // console.log('[ReviewPage] review: ', review);
   return (
      <>
         <Heading>{review.title}</Heading>
         <p className="font-semibold pb-3">
            {review.subtitle}
         </p>
         <div className="flex gap-3 items-baseline">
            <p className="italic pb-2">{review.date}</p>
            <ShareLinkButton />
         </div>
         <Image
            src={review.image}
            alt=""
            priority
            className="mb-2 rounded"
            width="640"
            height="360"
         />
         <article
            dangerouslySetInnerHTML={{ __html: review.body }}
            className="max-w-screen-sm prose prose-slate"
         />
      </>
   );
}