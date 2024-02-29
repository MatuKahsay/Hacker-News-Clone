import { useEffect } from 'react' 


function App() {
  useEffect(() => {
    async function fetchData() {
      const getTopStories = await fetch(' https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
      const topStoryData = await getTopStories.json();
      const topTwentyStories = topStoryData.splice(0, 20);

      const storyData = topTwentyStories.map(async (storyID) => {
        const getStoryData = await fetch(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`);
        return await getStoryData.json(); 
      });

      const allStories = await Promise.all(storyData);
      console.log(allStories);
    }
    fetchData();
  });
  
}

export default App
