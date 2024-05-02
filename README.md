# My Blog Site

This site is a personal portfolio site as well as a collection of blogs about new things I'm learning related to coding and other general interests.  It is using [Astro](https://astro.build/) and is modeled after the [Astro Cactus Starter Theme](https://astro.build/themes/details/astro-cactus/).  


The Cactus Readme has excellent documentation, but I am adding my notes for my own reference and documentation of what I've learned while porting things from the cactus theme.

## Structure

The app is structured as follows:

`src/components` - a components directory with various individual components used throughout the application organized by feature (common, posts, and layout).
`src/content` - a content directory with content collections (posts) and frontmatter schema for the colletion used in the application.
`src/data` - a data directory that contains any functions used to perform common operations to query the collection.
`src/layouts` - a layouts directory with a page and blog layout component used on multiple pages.
`src/pages` - a pages directory that contains main pages in the website (so far) including a home page, an about page, a 404 page, a main blog page, and individual posts pages.
`src/styles` - a styles directory with global styles used in the application.
`src/utils` - a utility directory with commonly used functions throughout the application.


### Paginator

Utilizing the (paginate())[https://docs.astro.build/en/guides/routing/#pagination] func.

### Image

Utilizing the built in (<Image>)[https://docs.astro.build/en/guides/images/] component.

### Content Collection

Modeled after (Content Collection)[https://docs.astro.build/en/guides/content-collections/]

### Main Blog Page

Based on information about pagination in the documentation the main page is rendered in the [...page].astro file.  

### Slug Pages

Slugs are generated in [slug].astro.

### Alias

To create shortcuts for my imports. In the ts.config can include paths in 'paths' array which allows using the @ symbol in files.

### Prefetching pages

Adding`"prefetch: true"` to my astro config file adds a prefetch script to all pages of the site. I can then add the data-astro-prefetch attribute to any <a /> links on the site to opt-in to prefetching. So basically, when I hover over the link, the script will fetch the page in the background.  Check out the network request tab to see in action.

### GetStaticPaths

A (built-in function)[https://docs.astro.build/en/reference/api-reference/#getstaticpaths] that returns an array of page routes, and all pages at those routes will use the same template defined in the file.

### Custom tailwind theme

No idea how this works yet - except magic.





