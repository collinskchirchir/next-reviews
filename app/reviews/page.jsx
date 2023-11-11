import Link from "next/link";

export default function ReviewsPage() {
   return (
      <>
         <h1>Reviews Page</h1>
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