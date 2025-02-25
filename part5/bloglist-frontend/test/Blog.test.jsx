import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import Blog from '../src/components/Blog'
import userEvent from '@testing-library/user-event'
import BlogsForm from '../src/components/BlogsForm'
import { postBlog, likeBlog } from '../src/services/blogs'

vi.mock('../src/services/blogs', () => ({
  postBlog: vi.fn().mockResolvedValue({
    title: 'I do not like testing at all',
    author: 'John Doe',
    url: 'https://something',
    user: { id: "aMongooseId", name: "Martin" }
  }),
  likeBlog: vi.fn().mockResolvedValue({
    id: '123',
    title: 'I do not like testing at all',
    author: 'John Doe',
    url: 'https://something',
    likes: 1000001,
    user: { name: 'User One' }
  })
}))

describe('<Blog />', () => {
  let container

  beforeEach(() => {
    const blog = {
      id: '123',
      title: 'I do not like testing at all',
      author: 'John Doe',
      url: 'https://something',
      likes: 1000000,
      user: { name: 'User One' }
    }

    container = render(<Blog 
      user={{}} 
      blog={blog} 
      addMessage={() => {}} 
      updateBlogs={() => {}} 
      deleteBlog={() => {}} />
    ).container
  })

  afterEach(() => {
    cleanup()
  })

  test('Shows title and author, but not the URL and likes by default', () => {
    const titleAuthorElement = screen.getByTestId('blog-title-author')
    expect(titleAuthorElement).toBeDefined()
  
    const hideContent = screen.getByTestId('togglable-hide-content')
    expect(hideContent.getAttribute('style')).toContain('display: none')
  })

  test('After clicking the button, URL and likes are displayed', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.btn-show-content')
    await user.click(button)

    const hideContent = screen.queryByTestId('togglable-hide-content')
    expect(hideContent.getAttribute('style')).toContain('display: inline')
  })

  test('Clicking the like button twice calls the event handler twice', async () => {
    cleanup()

    const blog = {
      id: '123',
      title: 'I do not like testing at all',
      author: 'John Doe',
      url: 'https://something',
      likes: 1000000,
      user: { name: 'User One' }
    }
  
    const mockUpdateBlogs = vi.fn()
  
    const container = render(<Blog 
      user={{}} 
      blog={blog} 
      addMessage={() => {}} 
      updateBlogs={mockUpdateBlogs} 
      deleteBlog={() => {}} 
    />).container

    const user = userEvent.setup()
  
    const btnShowContent = container.querySelector('.btn-show-content')
    await user.click(btnShowContent)
  
    const btnLike = screen.getByText('like')
    await user.click(btnLike)
    await user.click(btnLike)
  
    expect(mockUpdateBlogs).toHaveBeenCalledTimes(2)
  })
})



test('<BlogsForm /> calls onSubmit handler with correct values when a new blog is created', async () => {
  const addBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogsForm 
    addBlog={addBlog} 
    user={{}} 
    addMessage={() => {}} 
    toggableRef={{}} />)

  const iTitle = screen.getByPlaceholderText('Title')
  const iAuthor = screen.getByPlaceholderText('Author')
  const iUrl = screen.getByPlaceholderText('URL')
  const btnSubmit = screen.getByText('Add')

  await user.type(iTitle, 'I do not like testing at all')
  await user.type(iAuthor, 'John Doe')
  await user.type(iUrl, 'https://something')
  await user.click(btnSubmit)

  expect(addBlog).toHaveBeenCalledTimes(1)
  expect(addBlog).toHaveBeenCalledWith(expect.objectContaining({
    title: 'I do not like testing at all',
    author: 'John Doe',
    url: 'https://something'
  }))
})

