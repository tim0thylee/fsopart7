describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Tom',
            username: 'Tom',
            password: '1234'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
      cy.contains('username')
      cy.contains('password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('login').click()
            cy.get('#username').type('Tom')
            cy.get('#password').type('1234')
            cy.get('#loginButton').click()

            cy.contains('Tom has logged in')
        })
        it('login fails with wrong password', function() {
            cy.contains('login').click()
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#loginButton').click()
        
            cy.contains('Wrong username or password')
        })
    })

    describe('When logged in', function(){
        beforeEach(function() {
            cy.login({username: 'Tom', password: '1234'})
        })
        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('Testing')
            cy.get('#author').type('Tester')
            cy.get('#url').type('www.testing.com')
            cy.get('#createButton').click()
            cy.contains('Testing')
        })
        describe('When a blog is created', function() {
            beforeEach(function(){
                cy.createBlog({
                    title: 'Testing',
                    author: 'Tester',
                    url: 'www.testing.com',
                    likes: 0
                })
                cy.contains('Testing')
                cy.contains('view').click()
            })
            it('The number of likes can be updated', function() {
                cy.get('.likeButton').click()
                cy.contains('likes')
                  .contains('1')
            })
            it('The blog can be deleted', function() {
                cy.get('.removeButton').click()
                cy.contains('Blog was successfully deleted.')
            })
            it('Blogs are in order by likes', function(){
                cy.createBlog({
                    title: 'Bunny',
                    author: 'Bunny',
                    url: 'www.bunny.com',
                    likes: 10
                })
                cy.createBlog({
                    title: 'Alien',
                    author: 'alien',
                    url: 'www.alien.com',
                    likes: 15
                })
                cy.contains('Testing')
                  .contains('view').click()
                cy.contains('Bunny')
                  .contains('view').click()
                cy.contains('Alien')
                  .contains('view').click()
                cy.get('.blog').then(blogs => {
                    cy.wrap(blogs[0]).contains('Alien')
                    cy.wrap(blogs[1]).contains('Bunny')
                    cy.wrap(blogs[2]).contains('Testing')
                })
            })
        })
    })
})