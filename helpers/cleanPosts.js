const cleanPosts = (posts) => {
    let cleanResultsArray = posts.map((post) => {
        return {
            'author': post.data.author,
            'thumbnail': post.data.thumbnail,
            'title': post.data.title,
            'date_utc': post.data.created_utc,
            'score': post.data.score,
            'num_comments': post.data.num_comments,
            'permalink': 'https://reddit.com' + post.data.permalink
        }
    })
    return cleanResultsArray
}

export default cleanPosts