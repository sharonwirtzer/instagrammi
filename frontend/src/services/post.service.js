import { httpService } from './http.service'
import { storageService } from './async-storage.service'


export const postService = {
  query,
  getById,
  add,
  update,
  remove,
}

async function query(filterBy) {
  return await httpService.get(`posts`, { params: filterBy })
  
}

async function getById(postId) {
  return await httpService.get(`posts/${postId}`)
}

async function remove(postId) {
  return await httpService.delete(`posts/${postId}`)
}

async function add(post) {
  const addedpost = await httpService.post(`posts`, post)
  return addedpost
}

async function update(post) {
  try {
    return await httpService.put(`posts/${post._id}`, post) 
  } catch (err) {
    console.log('error while trzung to update post from post-service: ', err)
    throw err
  }
}
