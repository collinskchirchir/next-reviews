import Image from "next/image";
import Heading from "@/components/Heading"
import Link from "next/link";
import { getReviews } from "@/lib/reviews";

export default async function HomePage() {
   const reviews = await getReviews(3);
   return (
      <>
         <Heading>Indie Gamer</Heading>
         <p className="pb-3">
            Only the best indie games, reviewed for you.
         </p>
         <ul className="flex flex-col gap-3">
            {reviews.map((review, index) => (
               <li key={index} className="bg-white border rounded shadow w-80
                        hover:shadow-xl sm:w-full">
                  <Link href={`/reviews/${review.slug}`}
                     className="flex flex-col sm:flex-row">
                     <Image src={review.image} alt=""
                        priority={index === 0}
                        width="320" height="180"
                        className="rounded-t sm:rounded-l sm:rounded-r-none"
                     />
                     <h2 className="font-orbitron font-semibold py-1 text-center sm:px-2">
                        {review.title}
                     </h2>
                  </Link>
               </li>
            ))}
         </ul>
      </>
   );
}