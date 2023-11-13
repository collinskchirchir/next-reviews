import { readFile } from "fs/promises";
import { marked } from "marked";
import Heading from "@/components/Heading";

export default async function StardewValley() {
   const text = await readFile('./content/reviews/stardew-valley.md', 'utf8');
   const html = marked(text)
   return (
      <>
         <Heading>Stardew Valley</Heading>
         <article dangerouslySetInnerHTML={{__html: html}} />     
      </>
   );
}