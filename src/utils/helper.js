export const getPosters = (posters = []) => {

    if (!posters.length) return null

    if (posters.length > 2) {
        return posters[1]
    }
    return posters[0]
} 