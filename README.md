# `notnot`

A simple npm package that implements the `.not` property in all objects (except `null` and `undefined`).

⚠️ **ATTENTION, MONKEY PATCHING**

## Reason

Sometimes there is a need to negate the value of a very long chain expression. Semantically, only the last property is negated from the whole expression, but the `!` sign is placed first in the expression.
Example:

```javascript
// Checks if the first task is not completed
!JSON.parse(window.localStorage.getItem('tasks'))[0].completed
```

An option with a negation near the negated property is more conveniently readable:

```javascript
JSON.parse(window.localStorage.getItem('tasks'))[0].not.completed
// or even
JSON.parse(window.localStorage.getItem('tasks'))[0].completed.not
```

This is the essence of this package.

## Getting started

Install the package via npm:

```bash
npm install --save notnot
```

Then import the package in your project:

```javascript
import 'notnot';
// or
require('notnot');
```

Remember that the package implements the `.not` property in the `Object.prototype` and this will apply to the whole context after import.
