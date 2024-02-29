import { useEffect, useState } from 'react' 


function App() {
  const [stories, setStories] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const getTopStories = await fetch(' https://hacker-news.firebaseio.com/v0/topstories.json');
      const topStoryData = await getTopStories.json();
      const topTwentyStories = topStoryData.splice(0, 200);

      const storyData = topTwentyStories.map(async (storyID) => {
        const getStoryData = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`);
        return await getStoryData.json(); 
      });


      const allStories = await Promise.all(storyData);
      setStories(allStories);
    }
    fetchData();
  });

  return (
    <>
      <h1>Header</h1>
      {stories ? (
        stories.map((story) => (
          <article key={story.id}>
            <span>{story.score}</span>
            <a href={story.url} target="_blank" rel="noreferrer">
              {story.title}
            </a>
            {' by '}{story.by}
          </article>
        ))
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
  
  
}

export default App
