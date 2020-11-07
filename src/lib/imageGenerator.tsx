const generateImageUrl = function(): string {
  const id: number = Math.floor(Math.random() * (99) + 1)
  return `https://picsum.photos/id/${id}/1000`
}

export default generateImageUrl
