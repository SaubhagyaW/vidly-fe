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
1. Implement FE according to the API spec and Error handling.
    - Edit/Delete Genre
    - Handle user already registered and login failed error scenarios with a HTTP 400 status code. Currently returning HTTP 500.
    - Handle /returns API
    - Profile and User access rights.
2. Pagination
    - Add server side pagination
    - Previous and Next
3. De-activate highlighting of "All Genres" when loading.
4. Add toast.success() messages.
5. Improve Sign-up/Sign-in view.
6. Improve UI.
7. Check Sentry (sentry.io) for logging.
