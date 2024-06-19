type Game = {
  imageSource: string
  title: string
  publisher: string
  releaseYear: string
  description: string
  officialPages: string
}

type User = {
  nickname: string
  username: string //unique
  avatarSource: string
  reviews?: Review[]
}

type Review = {
  user: User
  rating: number
  description?: string
}
