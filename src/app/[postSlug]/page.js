import React from "react";
import dynamic from "next/dynamic";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";
import CodeSnippet from "@/components/CodeSnippet";
import { loadBlogPost } from "@/helpers/file-helpers";
import styles from "./postSlug.module.css";
import { BLOG_TITLE } from "@/constants";

const DivisionGroupsDemo = dynamic(() =>
  import("@/components/DivisionGroupsDemo")
);
const CircularColorsDemo = dynamic(() =>
  import("@/components/CircularColorsDemo")
);

async function BlogPost({ params }) {
  const slug = await params.postSlug;
  const blogPost = await loadBlogPost(slug);
  const { title, publishedOn } = blogPost.frontmatter;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote
          source={blogPost.content}
          components={{
            pre: CodeSnippet,
            DivisionGroupsDemo,
            CircularColorsDemo,
          }}
        />
      </div>
    </article>
  );
}

export async function generateMetadata({ params }) {
  const slug = await params.postSlug;
  const blogPost = await loadBlogPost(slug);
  const { title, abstract } = blogPost.frontmatter;

  return {
    title: `${title} • ${BLOG_TITLE}`,
    description: abstract,
  };
}

export default BlogPost;
