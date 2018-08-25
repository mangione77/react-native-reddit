import axios from 'axios'
import cleanPosts from '../helpers/cleanPosts'

const redditPics = () => {

    let baseURL = 'https://www.reddit.com/r/pics/new.json'

    let getAndFilterPosts = async () => {
        try {
            let responseFromReddit = await axios.get(baseURL)
            let posts = responseFromReddit.data.data.children
            let cleanResults = cleanPosts(posts)
            return cleanResults
        }
        catch (err) {
            throw (err)
        }
    }

    return {
        getAndFilterPosts
    }
}

export default redditPics()