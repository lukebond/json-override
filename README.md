# json-override

Override properties of one JS object with those of another. Think basic inheritence for JavaScript objects.

All proerties of the override object will be copied into the base object. Other elements in the base object will remain unchanged. It will do a deep copy on objects within the object. It can either modify the base object or create and return a new object.

## Usage

``` js
var override = require('json-override');

override(baseObject, overrideObject, createNew)
```

`baseObject` is a Javascript object whose properties are to be (potentially) overriden.
`overrideObject` is the object whose properties will override those of `baseObject`.
`createNew` (boolean, optional) indicates whether to create a new object or modify `baseObject`.

## Example

``` bash
$ node
> var jso = require('json-override');
undefined
> jso({a: 1, b: 2, c: 3, xyz: 'abc'}, {d: 4, e: 5, f: 6});
{ a: 1,
  b: 2,
  c: 3,
  xyz: 'abc',
  d: 4,
  e: 5,
  f: 6 }
```

It can be useful for setting default options in a function:

``` js
function someFunc(options) {
    var defaults = {
        debug: false,
        verbose: false,
        dir: '.'
    };
    var opts = override(default, options, true);
    // 'opts' is now equal to 'defaults' plus whatever was passed into the function
    ...
}
```

Take a look at the tests for further examples.

### Installation

``` js
npm install json-override
```
### License

MIT
