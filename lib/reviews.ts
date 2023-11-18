import exp from "constants";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

export interface Review {
   title: string;
   date: string;
   image: string;
   body: string;
   slug: string;
}

export async function getReview(slug: string): Promise<Review> {
   const text = await readFile(`./content/reviews/${slug}.md`, 'utf8');
   const {content, data: {title, date, image}} = matter(text)
   const body = marked(content)
   return { slug, title, date, image, body}
}

export async function getReviews(): Promise<Review[]> { 
   const slugs = await getSlugs();
   // declare empty array
   const reviews = [];
   for (const slug of slugs) {
      const review = await getReview(slug);
      reviews.push(review)
   }
   // sort Date descending order
   reviews.sort((a, b) => b.date.localeCompare(a.date));
   return reviews;
}

export async function getSlugs(): Promise<string[]> {
   const files = await readdir('./content/reviews'); 
   return files.filter((file) => file.endsWith('.md'))
      .map(file => file.slice(0, -'.md'.length))
}

// get Featured Review
 export async function getFeaturedReview(): Promise<Review> {
   const reviews = await getReviews();
   return reviews[0];
 }