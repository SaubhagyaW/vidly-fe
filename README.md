# vidly-fe
FE for Vidly project - An application for Movie Rental Shop


# Vidly FE
React JS front-end for a Movie rental shop.

## Features
- Movies View
    - A table view.
    - Categorized by Genre
        - Defining default props.
    - With client side pagination.
        - Prop type validations added (Using prop-types module).
        - Current page selection highlight.
    - Sort ascending and descending by each column.
    - Like button for each movie.
        - Cursor pointer style added. (Hand icon when hovering over the Like button).

Add/Edit movies
Form validation with Joi
types: text, select
password input.

Search movies.



## TODO
1. Pagination - Previous and Next
2. De-activate highlighting of "All Genres" when loading.



Component tree
Movies -> MoviesTable
(Re-usable components)
-> Table -> TableHeader
         -> TableBody
         -> Pagination
         -> Like

LoginForm       --
RegisterForm    --|- extends Form -> Field
MovieForm       --                -> SelectField
