/* eslint-disable no-undef */

describe('Blog app', function() {
  beforeEach(function() {
    const testUser = {
      username: 'testuser',
      name: 'My Test User',
      password: 'test123'
    }
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', testUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.visit('http://localhost:3000')
    cy.get('.login-form')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('test123')
      cy.get('#login-btn').click()
      cy.contains('Currently logged in as My Test User')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-btn').click()
      cy.contains('invalid username or password')
      cy.get('#error-message')
        .should('have.css', 'color')
        .should('equal', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('test123')
      cy.get('#login-btn').click()
    })

    it('A blog can be created', function() {
      const title = 'Test Blog'
      const author = 'Test Author'
      const url = 'http://www.mytestblog.com/test/test123'

      cy.get('#new-note-toggle').click()
      cy.get('#new-blog-title').type(title)
      cy.get('#new-blog-author').type(author)
      cy.get('#new-blog-url').type(url)
      cy.get('#new-blog-submit').click()

      cy.contains(title)
      cy.contains(author)
      cy.contains(url)
    })

    it('A blog can be liked', function () {
      const title = 'Test Blog'
      const author = 'Test Author'
      const url = 'http://www.mytestblog.com/test/test123'

      cy.get('#new-note-toggle').click()
      cy.get('#new-blog-title').type(title)
      cy.get('#new-blog-author').type(author)
      cy.get('#new-blog-url').type(url)
      cy.get('#new-blog-submit').click()

      cy.get('.blog-visibility-toggle-btn').click()
      cy.get('.blog-like-btn').click()
      cy.get('.item-likes:first').contains('likes: 1')
    })

    it('A blog can be deleted by the user', function () {
      const title = 'Test Blog'
      const author = 'Test Author'
      const url = 'http://www.mytestblog.com/test/test123'

      cy.get('#new-note-toggle').click()
      cy.get('#new-blog-title').type(title)
      cy.get('#new-blog-author').type(author)
      cy.get('#new-blog-url').type(url)
      cy.get('#new-blog-submit').click()

      cy.get('.blog-visibility-toggle-btn').click()
      cy.get('.blog-delete-btn').click()

    })

    it('Blogs are ordered according to likes', function() {
      const blogs = [
        { title: 'Test Blog', author: 'Test Author', url: 'http://www.mytestblog.com/test/test1' },
        { title: 'Test Blog 2', author: 'Test Author 2', url: 'http://www.mytestblog.com/test/test2' },
        { title: 'Test Blog 3', author: 'Test Author 3', url: 'http://www.mytestblog.com/test/test3' },
      ]

      cy.get('#new-note-toggle').click()

      blogs.forEach(blog => {
        cy.get('#new-blog-title').type(blog.title)
        cy.get('#new-blog-author').type(blog.author)
        cy.get('#new-blog-url').type(blog.url)
        cy.get('#new-blog-submit').click()
      })

      cy.contains('Test Blog 3').parent().parent().find('button').contains('view').click()
      cy.contains('Test Blog 3').parent().parent().find('button').contains('like').as('testBlog3LikeButton')
      cy.get('@testBlog3LikeButton').click()
      cy.contains('Test Blog 3').parent().parent().contains('likes: 1')
      cy.get('@testBlog3LikeButton').click()
      cy.contains('Test Blog 3').parent().parent().contains('likes: 2')
      cy.get('@testBlog3LikeButton').click()
      cy.get('.blog-item').eq(0).should('contain', 'Test Blog 3')
      cy.get('.blog-item').eq(0).should('contain', 'likes: 3')
    })
  })
})
