import { useEffect, useState } from 'react';

function App() {
  const [stories, setStories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const storyIds = await response.json();
        const stories = await Promise.all(
          storyIds.slice(0, 200).map(async (id) => {
            const storyResp = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return storyResp.json();
          })
        );
        setStories(stories.filter(story => story && story.title)); // Filter out null stories
      } catch (error) {
        console.error(error);
        setError('An error occurred while fetching the stories.');
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-300">
      <h1 className="text-5xl font-bold text-center mb-10 text-green-400">Hacker News</h1>
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story.id} className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="p-6">
              <a href={story.url} target="_blank" rel="noreferrer" className="hover:underline">
                <h3 className="text-lg font-semibold mb-2 text-green-300">{story.title}</h3>
              </a>
              <div className="text-gray-400 text-sm mb-4">By {story.by}</div>
              <div className="flex justify-between items-center text-gray-500 text-sm">
                <span>{new Date(story.time * 1000).toLocaleDateString()}</span>
                <span>{story.score} points</span>
                <span>{story.descendants || 0} comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!stories.length && <div className="text-center text-lg">Loading...</div>}
    </div>
  );
}

export default App;
