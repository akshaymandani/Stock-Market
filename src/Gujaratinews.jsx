import { useEffect, useState } from 'react';


// Mock categories data
const mockCategories = [
  { name: 'Gujarat', category: 'gujarat' },
  { name: 'Agriculture', category: 'agriculture' },
  { name: 'Sports', category: 'sports' },
  { name: 'Olympic', category: 'olympic' },
  { name: 'T20 World Cup', category: 't20-world-cup' },
  { name: 'Monsoon 2024', category: 'monsoon-2024' },
  { name: 'India', category: 'india' },
  { name: 'World', category: 'world' },
  { name: 'Entertainment', category: 'entertainment' },
  { name: 'Business', category: 'business' },
  { name: 'Union Budget', category: 'union-budget-2024' },
  { name: 'Knowledge', category: 'knowledge' },
  { name: 'Tech', category: 'tech' },
  { name: 'Crime', category: 'crime' },
  { name: 'Bhakti', category: 'bhakti' },
  { name: 'Ganeshotsav', category: 'ganeshotsav' },
  { name: 'Astro', category: 'astrology' },
  { name: 'Lifestyle', category: 'lifestyle' },
  { name: 'Supplement', category: 'supplement' },
  { name: 'Edu Scope', category: 'edu-scope' },
  { name: 'Business @ Sandesh', category: 'business-sandesh' },
  { name: 'Nari', category: 'nari' },
  { name: 'Ardha Saptahik', category: 'ardhasaptahik' },
  { name: 'Shraddha', category: 'shraddha' },
  { name: 'Nakshatra', category: 'nakshatra' },
  { name: 'Cine Sandesh', category: 'cine-sandesh' },
  { name: 'Kids World', category: 'kids-world' },
  { name: 'Sanskar', category: 'sanskar' },
];

export default function NewsComponent() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // No default category initially
  const [newsItems, setNewsItems] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true); // To ensure categories are loaded first
  const [loadingNews, setLoadingNews] = useState(false);

  // Use mock data for categories
  useEffect(() => {
    setCategories(mockCategories);

    // Automatically select the first category after fetching
    if (mockCategories.length > 0) {
      setSelectedCategory(mockCategories[0].category); // Set the first category as default
    }

    setLoadingCategories(false); // Categories loaded
  }, []);

  // Fetch news based on the selected category
  useEffect(() => {
//     const auth =localStorage.getItem('tokan')
// if(auth==null  || auth==""){
//   navigate("/login")
// }
    // Only fetch news if a category is selected and categories are loaded
    if (selectedCategory && !loadingCategories) {
      const fetchNews = async () => {
        try {
          setLoadingNews(true); // Start loading news
          const response = await fetch(
            `https://new-wapi.sandesh.com/api/v1/category/${selectedCategory}/?page=1&limit=24`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch news');
          }
          const data = await response.json();
          setNewsItems(data.data.posts);
          setLoadingNews(false); // News loading finished
        } catch (error) {
          console.error('Error fetching news:', error);
          setLoadingNews(false);
        }
      };

      fetchNews();
    }
  }, [selectedCategory, loadingCategories]); // Fetch news only when category or loading status changes

  return (
    <>
   

      <div className="container mx-auto px-4 py-8">
        {/* Loading indicator for categories */}
        {loadingCategories ? (
          <p>Loading categories...</p>
        ) : (
          <>
            {/* Category selection dropdown */}
            <div className="mb-6">
              <select
                className="border border-gray-300 p-2 rounded"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category, index) => (
                  <option key={index} value={category.category}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Loading indicator for news */}
            {loadingNews ? (
              <p>Loading news...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {newsItems.map((item) => (
                  <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <a href={`https://sandesh.com/${item.url}`} target="_blank" rel="noopener noreferrer">
                      <header>
                        <img
                          src={`https://resize-img.sandesh.com/epapercdn.sandesh.com/${item.media}`}
                          alt={item.title}
                          width={300}
                          height={500}
                          className="w-full h-48 object-fill"
                        />
                      </header>
                      <div className="p-4">
                        <h2 className="text-lg font-semibold mb-2">{item.tagline}</h2>
                        <h3 className="text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.tagline}</p>
                        <p className="text-xs text-gray-500">{item.publish_date}</p>
                      </div>
                    </a>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
