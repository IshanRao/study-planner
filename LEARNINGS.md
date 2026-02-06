# Project Learnings: REACT, NextJS, and Libraries

<br>

## Issue 1: On click of edit button in task modal, save was getting triggered immediately

<br>

### Context
**Edit** and **Save** buttons were rendered on the basis of **isEditing** state. **isSubmitting** from **useForm** hook handled form submission state.

<br>

### RCA
On click of **edit button**, the **isEditing** state triggered a **re-render**. React replaced the edit button with **save button** in the DOM.

The **click action is still in progress**. Browser believes the form is submitted as click is acting on the **save button**.

<br>

### Fix
Hide either of the two buttons based on the **isEditing** state.