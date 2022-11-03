import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  author: 'Test Author',
  url: 'http://test.com',
  title: 'My Test Blog',
  user: {
    id: '123456789',
    username: 'test',
    name: 'Mr. Test'
  },
  likes: 0
}

let loggedInUser =  {
  id: '123456789',
  username: 'test',
  name: 'Mr. Test'
}

test('renders blog title and author, but not url or number by default', () => {

  const { container } = render(<Blog blog={blog} loggedInUser={loggedInUser} />)

  const titleAndAuthor = screen.getByText('My Test Blog - Test Author')
  const toggleable = container.querySelector('.additional-details')
  expect(titleAndAuthor).toBeDefined()
  expect(toggleable).toHaveStyle('display: none')
})

test('url and number of likes shown when button is clicked', async () => {
  const { container } = render(<Blog blog={blog} loggedInUser={loggedInUser} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const urlInfo = container.querySelector('.item-url')
  const likeInfo = container.querySelector('.item-likes')

  expect(urlInfo).toBeDefined()
  expect(likeInfo).toBeDefined()
})

test('If like button clicked twice, handler is called twice', async() => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} loggedInUser={loggedInUser} handleLikes={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})