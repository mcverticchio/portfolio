import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export async function getAllPosts()  {
    return await getCollection("post")
}
