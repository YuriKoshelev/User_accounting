Link to the application: http://knowledge.ykoshelev.ru/

## Test assignment for the Front-end React Developer vacancy
## Тестовое задание на вакансию Front-end React Developer

## Used / Использовано:

- JavaScript 
- React 18.1.0
- Styled-components 5.3.5
- Redux 7.2.8
- Toolkit 1.8.1
- Axios 0.27.2

### The main task / Основное задание:

Develop a mini web-app consist of two pages: 
1. Login form
2. User List

The application must be developed using the React framework. It is ok to use bootstrap and jQuery if you like. It is also allowed to use the Svelte framework.

Here is placed a simple RESTful API https://api.clubstation.io and here is endpoints:

User can login and logout.
If the user is not logged in, he has access to the login page and does not have access to the student list page.
If a user is logged in, he has access to the student list page and does not have access to the login  page.
At the student list page user can navigate through the list by page navigation.
Users can click on a student's email and view selected student information in the modal dialog.

Additional:
Create a form in the modal dialog to edit selected student data.
Create an additional action button to call a modal dialog with a form to create a new student.
Display current user email in Header & Footer of the application (work with state manager)
