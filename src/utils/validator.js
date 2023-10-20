export const validateMovie = (movieInfo) => {
    const { title, storyLine, language, releaseDate, status, type, genres, tags, cast } = movieInfo
    if (!title.trim()) return { error: "Title is missing!" }
    if (!storyLine.trim()) return { error: "Story line is missing!" }
    if (!language.trim()) return { error: "Language is missing!" }
    if (!releaseDate.trim()) return { error: "Release date is missing!" }
    if (!status.trim()) return { error: "Status is missing!" }
    if (!type.trim()) return { error: "Type is missing!" }
    if (!genres.length) return { error: "Genres are missing!" }
    if (!tags.length) return { error: "Tags are missing!" }
    if (!cast.length) return { error: "Casts are missing!" }
  
    return { error: null }
  }