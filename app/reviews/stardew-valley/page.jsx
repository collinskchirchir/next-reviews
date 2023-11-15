import { readFile } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import Heading from "@/components/Heading";

export default async function StardewValley() {
   const text = await readFile('./content/reviews/stardew-valley.md', 'utf8');
   const {content, data: {title, date}} = matter(text)
   const html = marked(content)
   console.log(title)
   return (
      <>
         <Heading>{title}</Heading>
         {date}
         <article 
            dangerouslySetInnerHTML={{__html: html}}
            className="prose prose-slate"         
         />     
      </>
   );
}