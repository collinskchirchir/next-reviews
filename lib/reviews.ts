import exp from "constants";
import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import qs from 'qs';

const CMS_URL = 'http://localhost:1337'

export interface Review {
   title: string;
   date: string;
   image: string;
   body: string;
   slug: string;
}

/*
{
   slug: 'hellblade',
   title: 'Hellblade',
   date: '2020-10-15',
   image: '/images/hellblade.jpg',
   body: '<p><strong>Hellblade</strong> is a 2017 action-adventure game developed and published by the British video game development studio Ninja Theory. Set in a dark fantasy world inspired by Norse mythology and Celtic culture, the game follows Senua, a Pict warrior who must make her way to Helheim by defeating otherworldly entities and facing their challenges, in order to rescue the soul of her dead lover from the goddess Hela. It was released worldwide for PlayStation 4, and Windows in August 2017, Xbox One in April 2018, Nintendo Switch in April 2019, and Xbox Series X and Series S in August 2021. Hellblade features support for virtual reality, which was added in a 2018 update.</p>\n' +
     '<p>Self-described as an &quot;independent AAA game&quot;, Hellblade was created by a team of approximately twenty developers led by writer and director Tameem Antoniades. The game blends different gameplay mechanics and concepts like puzzle solving, psychological horror and melee combat. Voice acting is an integral part of the game, while its cutscenes combine motion capture by Melina Juergens, and live action performances by other actors. The game&#39;s narrative serves as a metaphor for the character&#39;s struggle with psychosis, as Senua, who suffers from the condition but believes it to be a curse, is haunted by an entity known as the &quot;Darkness&quot;, voices in her head known as &quot;Furies&quot;, and memories from her past. To properly represent psychosis, developers worked closely with neuroscientists, mental health specialists, and people living with the condition.</p>\n'
 }
 */

export async function getReview(slug: string): Promise<Review> {
   const url = `${CMS_URL}/api/reviews?`
      + qs.stringify({
         filters: { slug: { $eq: slug } },
         fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
         populate: { image: { fields: ['url'] } },
         pagination: { pageSize: 1, withCount: false }
      }, { encodeValuesOnly: true });
   console.log('getReview: ', url)
   const response = await fetch(url);
   const { data } = await response.json();
   const { attributes } = data[0];
   return {
      slug: attributes.slug,
      title: attributes.title,
      date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
      image: CMS_URL + attributes.image.data.attributes.url, 
      body: marked(attributes.body)
   }

}

export async function getReviews(): Promise<Review[]> {
   const url = `${CMS_URL}/api/reviews?`
      + qs.stringify({
         fields: ['slug', 'title', 'subtitle', 'publishedAt'],
         populate: { image: { fields: ['url'] } },
         pagination: { pageSize: 6 },
         sort: ['publishedAt:desc']
      }, { encodeValuesOnly: true });
   console.log('getReviews: ', url)
   const response = await fetch(url);
   const { data } = await response.json();
   return data.map(({ attributes }) => ({
      slug: attributes.slug,
      title: attributes.title,
      date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
      image: CMS_URL + attributes.image.data.attributes.url
   }));
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