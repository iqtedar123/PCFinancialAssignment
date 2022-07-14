# PCFinancialAssignment

This is a store admin app. It allows authenticated users to add/remove/edit/delete products.
It uses React, Emotion and FontAwesome for the front end located in `/store-admin`.

For the backend it uses NestJS (Express) located in `/backend`.

## Notes

If I had more time, I would cleanup the code a bit more and add more unit tests.
For Front End:
I would also create shared CSS styles and shared components to improve maintainability.
I would also break up components into Data components (perform all fetch/handler logic) and UI/Layout components (take render props and output a layout).
Storybooks would also be nice to have.
I also couldn't get enzyme to work with React v18. I would try to use that in some render tests.

For Back End:
Since, it was my first time using NestJS, I would try to look into optimizations that NestJS provides for performance/security.
I would also add more unit tests.
