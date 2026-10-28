const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=70`
const day = 86400000
const now = Date.now()

const raw = [
  ['Cherry Clafoutis', 'French', 45, 'Medium', true, 'A custardy baked French classic studded with ripe sweet cherries and finished with powdered sugar.', 'photo-1488477181946-6428a0291777', ['cherry', 'baked']],
  ['Tagliatelle al Pomodoro', 'Italian', 25, 'Easy', true, 'Silky egg pasta tossed with slow-simmered San Marzano tomatoes, garlic and a torn handful of basil.', 'photo-1621996346565-e3dbc646d9a9', ['pasta', 'vegetarian']],
  ['Butter Chicken', 'Indian', 60, 'Medium', true, 'Tender tandoori chicken folded into a rich, mildly spiced tomato and butter gravy. Best with warm naan.', 'photo-1603894584373-5ac82b2ae398', ['curry', 'comfort']],
  ['Salmon Nigiri Board', 'Japanese', 40, 'Hard', true, 'Hand-pressed nigiri with seasoned sushi rice, silky salmon and a brush of sweet soy.', 'photo-1579871494447-9811cf80d66c', ['sushi', 'seafood']],
  ['Street Tacos al Pastor', 'Mexican', 50, 'Medium', true, 'Chili-marinated pork with charred pineapple, onion and coriander on warm corn tortillas.', 'photo-1565299585323-38d6b0865b47', ['tacos', 'spicy']],
  ['Strawberry Shortcake', 'Dessert', 35, 'Easy', true, 'Buttery biscuits layered with macerated strawberries and softly whipped cream.', 'photo-1464349095431-e9a21285b5f3', ['berries', 'summer']],
  ['Fluffy Buttermilk Pancakes', 'Breakfast', 20, 'Easy', true, 'Tall, tender pancakes with crisp edges, served with maple syrup and a pat of salted butter.', 'photo-1567620905732-2d1ec7ab7445', ['brunch', 'sweet']],
  ['Mushroom Risotto', 'Italian', 55, 'Hard', false, 'Creamy arborio rice stirred patiently with mixed mushrooms, white wine and aged parmesan.', 'photo-1476124369491-e7addf5db371', ['rice', 'vegetarian']],
  ['Ratatouille Confit', 'French', 90, 'Medium', true, 'Thinly sliced summer vegetables baked in a spiral over a sweet pepper and tomato base.', 'photo-1572453800999-e8d2d1589b7c', ['vegan', 'vegetables']],
  ['Chocolate Lava Cakes', 'Dessert', 25, 'Medium', false, 'Individual dark chocolate cakes with a molten centre. Serve straight from the oven with cherries.', 'photo-1624353365286-3f8d62daad51', ['chocolate', 'date-night']],
  ['Masala Dosa', 'Indian', 75, 'Hard', true, 'Crisp fermented rice and lentil crepes folded around a turmeric-spiced potato filling.', 'photo-1668236543090-82eba5ee5976', ['south-indian', 'vegan']],
  ['Shakshuka', 'Breakfast', 30, 'Easy', false, 'Eggs poached in a smoky tomato and pepper sauce with cumin, paprika and crumbled feta.', 'photo-1590412200988-a436970781fa', ['eggs', 'one-pan']],
]

export const seedRecipes = raw.map(([name, category, cookTime, difficulty, published, description, photo, tags], i) => {
  const createdAt = new Date(now - (i * 2.5 + 0.3) * day).toISOString()
  return { id: `rcp_seed_${i + 1}`, name, category, cookTime, difficulty, published, description, imageUrl: img(photo), tags, createdAt, updatedAt: createdAt }
})
