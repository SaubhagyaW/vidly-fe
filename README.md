# Vidly FE
React JS front-end for a Movie rental shop.

## Functionality
- Sign-up/Sign-in
- UI validations for forms.
- Movies view.
    - Categorized by Genre.
    - A table view paginated with 10 records per page.
    - Add/Edit/Delete Genre.
    - Add/Edit/Delete Movie.
    - Like Movie.
    - Search Movie
    - Sort Movies by Title, Genre, Stock or Rate.
- User profile
    - Edit user profile.
    - Administrative users can edit other users' access rights.

## Implementation Details

### Component tree

```
NavBar
                  -   Movies  -> ListGroup
                 |            -> SearchBox
                 |            -> MoviesTable  -> Table    -> TableHeader
                 |                                        -> TableBody
                 |                            -> Like
ProtectedRoute  -|            -> Pagination
                 |-   Customers
                 |-   Rentals
                 |-   Profile
                 |-   MovieForm       --
                 |-   RegisterForm    --|- extends Form   -> Field
                  -   LoginForm       --                  -> SelectField
```

## TODO
1. Resolve FIXME comments
2. Implement FE according to the API spec.
    - Proper error handling.
    - FE error handling is already done for user already registered and login failed error scenarios with HTTP 400 status code. But, currently BE is returning HTTP 500.
    - Edit/Delete Genre
    - Handle /returns API
    - Profile and User access rights.
3. Verify Page Not Found redirections
    - Invalid Movie Id redirection not working when it's a string
4. Pagination
    - Add server side pagination
    - Previous and Next
5. De-activate highlighting of "All Genres" when loading.
6. Add toast.success() messages.
7. Improve Sign-up/Sign-in view.
8. Improve UI.
9. Check Sentry (sentry.io) for logging.
