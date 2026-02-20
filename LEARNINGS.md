# Project Learnings: REACT, NextJS, and Libraries

<br>

## Issue 1: On click of edit button in task modal, save was getting triggered immediately

<br>

### Context :
**Edit** and **Save** buttons were rendered on the basis of **isEditing** state. **isSubmitting** from **useForm** hook handled form submission state.


### RCA :
On click of **edit button**, the **isEditing** state triggered a **re-render**. React replaced the edit button with **save button** in the DOM.

The **click action is still in progress**. Browser believes the form is submitted as click is acting on the **save button**.


### Fix :
Hide either of the two buttons based on the **isEditing** state.

<br>

## Libraries Used and Their Purpose

### React Hook Form
A performant, flexible, and extensible library for managing forms in React. It leverages uncontrolled components and React hooks to reduce the amount of code you need to write and minimize re-renders, making it ideal for complex forms with validation.

### Zod
A TypeScript-first schema declaration and validation library. It allows you to define data schemas once and use them for runtime validation while automatically inferring static types, ensuring data integrity across your application.

### Lucide React
A popular open-source icon library that provides a collection of clean and consistent SVG icons as React components. It is lightweight, tree-shakeable, and highly customizable, making it easy to integrate professional-looking icons into any project.

### TanStack Query (React Query)
A powerful asynchronous state management library for TS/JS applications. It simplifies data fetching, caching, synchronization, and updating server state, eliminating the need for complex global state management for server-side data.

### Redux Toolkit (RTK)
The official, opinionated toolset for efficient Redux development. It simplifies store setup, reduces boilerplate code, and provides built-in utilities like RTK Query to handle complex application state and data fetching in a standardized way.