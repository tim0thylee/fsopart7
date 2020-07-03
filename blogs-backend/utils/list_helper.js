const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
    if (blogs.length === 0) return 0
    
    return blogs.reduce((sum,blog) => {
        return sum + blog.likes
    }, 0)
}

const favoriteBlog = blogs => {
    if (blogs.length === 0) return 0

    let favorite = blogs[0]

    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })

    return favorite
}

const mostBlogs = blogs => {
    if (!blogs.length) return 0
    
    const authors = {}
    const arrayKeys = []
    let mostBlogsAuthor = {blogs:0}

    blogs.forEach(blog => {
        if (!authors[blog.author]) {
            authors[blog.author] = 1
        } else {
            authors[blog.author]++
        }
    })

    for (let key in authors) {
        arrayKeys.push({
            author: key,
            blogs: authors[key]
        })
    }

    arrayKeys.forEach(arrayKey => {
        if (arrayKey.blogs > mostBlogsAuthor.blogs) {
            mostBlogsAuthor = arrayKey
        }
    })

    return mostBlogsAuthor
}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs};