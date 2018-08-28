import axios from 'axios'
import cleanPosts from '../helpers/cleanPosts'

const redditPics = (category) => {

    const getAndFilterPosts = async (category) => {
        try {
            let baseURL = `https://www.reddit.com/r/pics/${category}.json`
            let responseFromReddit = await axios.get(baseURL)
            let posts = responseFromReddit.data.data.children
            let cleanResults = cleanPosts(posts)
            return cleanResults
        }
        catch (err) {
            if (err.code === 'ENOTFOUND') {
                throw('Your device is not connected. Try again later.')
            }
            else {
                throw (err)
            }
        }
    }

    return {
        getAndFilterPosts
    }

}

export default redditPics()