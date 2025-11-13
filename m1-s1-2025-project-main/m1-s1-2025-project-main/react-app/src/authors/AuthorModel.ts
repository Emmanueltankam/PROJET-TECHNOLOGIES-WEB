export type AuthorModel = {
  id: string
  firstName: string
  lastName: string
  photo?: string
}

export type CreateAuthorModel = {
  firstName: string
  lastName: string
  photo?: string
}

export type UpdateAuthorModel = Partial<CreateAuthorModel>
