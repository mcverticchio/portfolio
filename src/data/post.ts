import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

export async function getAllPosts()  {
    return await getCollection("post", ({ data }) => {
        return import.meta.env.PROD ? data.draft !== true : true;
    })
}

export function getAllTags(posts: Array<CollectionEntry<"post">>) {
    return posts.flatMap(post => [...post.data.tags]);
}

export function getUniqueTags(posts: Array<CollectionEntry<"post">>) {
    return [...new Set(getAllTags(posts))];
}

export function getUniqueTagsWithCount(
	posts: Array<CollectionEntry<"post">>,
): Array<[string, number]> {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}