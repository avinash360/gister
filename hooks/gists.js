import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
const PER_PAGE = 2

const useGists = (username, pageNum) => {
    const [gists, setGists] = useState([])
    const [isLoading, setLoading] = useState(false)

    function formatGist(gist) {
        const filenames = Object.keys(gist.files || [])
        const isFileNameUndefined = filenames.some(filename => filename === 'gistfile1.txt')
        const tags = Object.values(gist.files || []).map(file => file.language)
        const uniqueTags = [...new Set(tags)].filter(tag => !!tag)

        return {
            name: isFileNameUndefined ? `gist:${gist.id}` : filenames[0],
            description: gist.description,
            tags: uniqueTags,
            id: gist.id,
            link: gist.html_url,
        }
    }

    useEffect(() => {
        // simonmcc
        // let username = "PurpleBooth"
        // let username = "simonmcc"
        let statusCode = ''
        setLoading(true)
        fetch(`https://api.github.com/users/${username}/gists?per_page=${PER_PAGE}&page=${pageNum}`)
            .then((res) => {
                statusCode = res.status
                return res.json()
            })
            .then(data => {
                if (statusCode === 200) {
                    const formattedGists = (data || []).map(formatGist)
                    if (data.length === 0) {
                        toast.error('User does not have any public Gists')
                    }
                    setGists(formattedGists)
                } else if (statusCode === 404) {
                    toast.error('User not found!')
                } else if (statusCode === 403) {
                    toast.error('Too many API requests, please try after some time!')
                }
            })
            .finally(() => setLoading(false))
    }, [username, pageNum])

    return { gists, isLoading, }
}

useGists.whyDidYouRender = true
export default useGists
