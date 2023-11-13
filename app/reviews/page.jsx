import Link from "next/link";
import Heading from "@/components/Heading";

export default function ReviewsPage() {
   return (
      <>
         <Heading>Reviews Page</Heading>
         <p>
            Here we'll list all the reviews:
         </p>
         
            <ol>
               <li><Link href="/reviews/stardew-valley">StarDew Valley</Link></li>
               <li><Link href="/reviews/hollow-knight">Hollow Knight</Link></li>
            </ol>
         
      </>
   );
}