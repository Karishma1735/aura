/**
 * ENTITY SCHEMA — the single place that describes a "Recipe".
 * To manage something else (products, clients, …): edit the constants and zod
 * schema here, then the fields in components/EntityForm.jsx and the card/table.
 */
import { z } from 'zod'

export const ENTITY = { singular: 'Recipe', plural: 'Recipes', lower: 'recipe' }
export const CATEGORIES = ['Italian', 'Indian', 'Japanese', 'Mexican', 'French', 'Dessert', 'Breakfast']
export const DIFFICULTIES = ['Easy', 'Medium', 'Hard']
export const STATUSES = ['Published', 'Draft']

export const recipeSchema = z.object({
  name: z.string().trim().min(3, 'Give your recipe a name (at least 3 characters).').max(60, 'Keep the name under 60 characters.'),
  category: z.enum(CATEGORIES, { errorMap: () => ({ message: 'Pick a cuisine so it is easy to find.' }) }),
  cookTime: z.coerce.number({ invalid_type_error: 'Enter the cook time in minutes.' }).int('Whole minutes please.').min(1, 'Cook time must be at least 1 minute.').max(600, 'That is a long cook — 600 minutes max.'),
  difficulty: z.enum(DIFFICULTIES),
  published: z.boolean(),
  description: z.string().trim().min(10, 'Tell us a little more (at least 10 characters).').max(400, 'Please keep it under 400 characters.'),
  imageUrl: z.string().trim().refine((v) => v === '' || v.startsWith('data:image/') || /^https?:\/\/\S+$/.test(v), 'Use a full image link starting with https://'),
  tags: z.array(z.string()).max(6, 'Six tags is plenty.'),
})

export const emptyRecipe = {
  name: '', category: '', cookTime: '', difficulty: 'Easy', published: true, description: '', imageUrl: '', tags: [],
}
