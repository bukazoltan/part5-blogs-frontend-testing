import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'

test('tests that the form calls the event handler with the right details', async () => {
  const testParameters = {
    title: 'Test Title',
    author: 'Mr. Testy Test',
    url: 'http://mytestblog.com'
  }
  const mockHandler = jest.fn()
  render(<NewBlogForm createBlog={mockHandler} />)
  await userEvent.type(screen.getByPlaceholderText('Enter Title'), testParameters['title'])
  await userEvent.type(screen.getByPlaceholderText('Enter Author'), testParameters['author'])
  await userEvent.type(screen.getByPlaceholderText('Enter URL'), testParameters['url'])
  const submitBtn = screen.getByText('Submit')
  await userEvent.click(submitBtn)
  console.log(mockHandler.mock)
  expect(mockHandler.mock.lastCall[0]).toStrictEqual(testParameters)
})