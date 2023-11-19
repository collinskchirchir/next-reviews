import Heading from "@/components/Heading";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'About'
}

export default function AboutPage() {
   return (
      <>
         <Heading>About Us</Heading>
         <p>
            We are the top Indie Game review site in the business!
         </p>      
      </>
   );
}