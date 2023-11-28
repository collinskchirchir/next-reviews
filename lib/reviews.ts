import { marked } from "marked";
import qs from 'qs';

const CMS_URL = 'http://localhost:1337'

export interface Review {
   title: string;
   subtitle: string;
   date: string;
   image: string;
   slug: string;
}
export interface FullReview extends Review {
   body: string;
}

interface CmsItem {
   id: number;
   attributes: any;
}

export async function getReview(slug: string): Promise<FullReview> {
   const parameters = {
      filters: { slug: { $eq: slug } },
      fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
      populate: { image: { fields: ['url'] } },
      pagination: {
         pageSize: 1, withCount: false
      }
   };
   const { data } = await fetchReviews(parameters);
   const item = data[0];
   return {
         ...toReview(item),
         body: marked(item.attributes.body)
      }
   }

   export async function getReviews(pageSize: number = 6): Promise<Review[]> {
      const parameters = {
         fields: ['slug', 'title', 'subtitle', 'publishedAt'],
         populate: { image: { fields: ['url'] } },
         pagination: { pageSize },
         sort: ['publishedAt:desc']
      };
      const { data } = await fetchReviews(parameters)
      return data.map(toReview);
   }

   export async function getSlugs(): Promise<string[]> {
      const parameters = {
         fields: ['slug'],
         sort: ['publishedAt:desc'],
         pagination: { pageSize: 100 }
      };
      const { data } = await fetchReviews(parameters)
      return data.map((item) => item.attributes.slug);
   }

   // fetch reviews from API
   async function fetchReviews(parameters: any) {
      const url = `${CMS_URL}/api/reviews?`
         + qs.stringify(parameters, { encodeValuesOnly: true });
      // console.log('fetchReviews: ', url)
      const response = await fetch(url);
      if(!response.ok){
         throw new Error(`CMS returned ${response.status} for ${url}`);
      }
      return await response.json();
   }

   //
   function toReview(item: CmsItem): Review {
      const {attributes} = item;
      return {
            slug: attributes.slug,
            title: attributes.title,
            subtitle: attributes.subtitle,
            date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
            image: CMS_URL + attributes.image.data.attributes.url
      }
   }