import { useAppStore } from "@/store"
import axios from "axios"
import { type User, type Post, type Comment } from "@/types"


const baseApi = axios.create({
  baseURL: "https://gorest.co.in/public/v2/",
  headers: {
    "Content-Type": "application/json"
  }
})

baseApi.interceptors.request.use((config) => {
  const token = useAppStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const apiGorest = {
  getUsers: (page: number, perPage: number) =>
    baseApi.get<User[]>(`/users?page=${page}&per_page=${perPage}`),
  
  getUser: (id: number) =>
    baseApi.get<User>(`/users/${id}`),
  
  getPosts: (page: number, perPage: number) =>
    baseApi.get<Post[]>(`/posts?page=${page}&per_page=${perPage}`),
  
  getPost: (id: number) =>
    baseApi.get<Post>(`/posts/${id}`),
  
  getComments: (postId: number) =>
    baseApi.get<Comment[]>(`/posts/${postId}/comments`),
}