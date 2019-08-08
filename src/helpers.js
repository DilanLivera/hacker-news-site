function fetchComments(kids) {
  const storyUrlBase = 'https://hacker-news.firebaseio.com/v0/item/';
  let url, commentList;

  Promise.all(kids.map(id => {
    url = `${storyUrlBase}${id}.json`;
    return fetch(url).then( data => data.json())
  }))
  .then(response => Promise.all( response))
  .then(comments => {
      commentList = comments.map(comment => {
        const { by, id, text, time, kids } =  comment;
        let formatedTime = new Date(time*1000).toDateString();

        return{ id, by, text, time: formatedTime, kids };
      });
      return commentList;
  });

}

export { fetchComments };