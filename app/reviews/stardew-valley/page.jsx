import { readFile } from "fs/promises";
import Heading from "@/components/Heading";

export default async function StardewValley() {
   const text = await readFile('./content/reviews/stardew-valley.md', 'utf8')
   return (
      <>
         <Heading>Stardew Valley</Heading>
         <p>
            {text}
         </p>      
      </>
   );
}