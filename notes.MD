
# Front End Refactoring Challenge

In TodoForm component, I converted jquery to ref.
```
<input
    type="text"
    ref={e => this.itemNameRef = e}
    id="itemName"
    className="form-control"
    placeholder="add a new todo..." />
```

Notes:
- Clone this repo.  `npm install`, then `npm start` to get your development environment running.

- This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

- You call the shots on what you think is best on how to improve this project.  But **do not add or remove any features**.

- Again, **don't worry about styling or CSS**. Just focus on JavaScript and React.

- Feel free to add notes your cloned repo to explain your thought process.
