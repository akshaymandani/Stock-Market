import React, { useState, useEffect } from 'react';

function News() {
  const [selectedNews, setSelectedNews] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://www.moneycontrol.com/newsapi/mc_news.php?query=tags_slug%3A(%22ipo%22+OR+%22ipo-broker-analysis%22+OR+%22ipo-news%22)&start=0&limit=30&sortby=creation_date&sortorder=desc");
        const result = await response.json();
        
        console.log("API Response:", result[0]?.post_image); // Log the response structure

        if (result && typeof result === 'object') {
          const transformedData = Object.keys(result).filter(key => !isNaN(key)).map(key => {
            const item = result[key];
            return {
              id: item.id || "default_id",
              post_image: item.post_image || "default_image_path.jpg",
              headline: item.headline || "Default Headline",
              body: item.body || "Default content",
              update_date: item.update_date || "Unknown date",
              tags: item.tags || "",
              stags: item.stags || "",
              categories: item.categories || "",
              sub_category: item.sub_category || "Unknown sub-category",
              author_name: item.author_name || "Unknown author",
            };
          });

          setData(transformedData);
        } else {
          console.error("Unexpected API response structure:", result);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
//     const auth =localStorage.getItem('tokan')
// if(auth==null  || auth==""){
//   navigate("/login")
// }
    // Prevent body scroll when modal is open
    document.body.style.overflow = selectedNews ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup on unmount
    };
  }, [selectedNews]);

  const handleCardClick = (news) => {
    setSelectedNews(news);
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  const NewsCard = ({ post_image, headline, body, update_date, tags = "", stags = "", categories = "", sub_category, author_name, onClick }) => {
    // Split the tags, stags, and categories strings into arrays
    const tagsArray = tags.split(',').map(tag => tag.trim());
    const stagsArray = stags.split(',').map(stag => stag.trim());
    const categoriesArray = categories.split(',').map(category => category.trim());

    return (
      <div onClick={onClick} className="bg-white shadow-md rounded-lg overflow-hidden mb-4 cursor-pointer">
        <img src={post_image} alt={headline} className="w-full h-48 object-cover" />
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-2">{headline}</h2>
        
          <div className="text-sm text-gray-500 mb-2">Updated: {update_date}</div>
          
          <div className="flex flex-wrap mb-2">
            {tagsArray.length > 0 && tagsArray.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
          
          {
            /* 
          <div className="flex flex-wrap mb-2">
            {stagsArray.length > 0 && stagsArray.map((stag, index) => 
            (
              <span key={index} className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {stag}
              </span>
            ))}
          </div>
           */
           }
          
          <div className="flex flex-wrap mb-2">
            {categoriesArray.length > 0 && categoriesArray.map((category, index) => (
              <span key={index} className="bg-purple-100 text-purple-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {category}
              </span>
            ))}
          </div>
          
          <div className="text-sm text-gray-600">Sub-category: {sub_category}</div>
          <div className="text-sm text-gray-600">Author: {author_name}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((news) => (
          <NewsCard key={news.id} {...news} onClick={() => handleCardClick(news)} />
        ))}
      </div>

      {selectedNews && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-90 ">
          <div className="bg-white p-14 rounded-lg shadow-lg  w-full max-h-[90vh] overflow-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedNews.headline}</h2>
            <p className="text-gray-700 mb-4">{selectedNews.body}</p>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded" 
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default News;
