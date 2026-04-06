import { en } from './en'
import { bg } from './bg'
import { blogPostsEn } from './blog-posts-en'
import { blogPostsBg } from './blog-posts-bg'

// Merge blog posts into main translations
const enFull = { ...en, blogPosts: blogPostsEn }
const bgFull = { ...bg, blogPosts: blogPostsBg }

export const translations: Record<string, any> = { en: enFull, bg: bgFull }
