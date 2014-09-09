# json-override

Override properties of one JS object with those of another. Think basic inheritence for JavaScript object properties (not methods!).

All properties of the override object will be copied into the base object. Other elements in the base object will remain unchanged. It will do a deep copy on objects within the object. It can either modify the base object or create and return a new object.

## Usage

``` js
var override = require('json-override');

override(baseObject, overrideObject, createNew)
```

`baseObject` is a Javascript object whose properties are to be (potentially) overriden.  
`overrideObject` is the object whose properties will override those of `baseObject`.  
`createNew` (boolean, optional) indicates whether to create a new object or modify `baseObject`.

If `baseObject` is `null` then it will be initialised to `{}` and `createNew` is implied.

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
    var opts = override(defaults, options, true);
    // 'opts' is now equal to 'defaults' plus whatever was passed into the function
    ...
}
```

This usage is similar to `_.defaults()`, but kind-of the other way around. It will recurse into sub-objects whereas `_.defaults()` won't.

The use-case that gave rise to this module was for delivering a config file to a child process. The child process had a default config file, and it would be sent another config file with only the properties to be overridden. The config file is hierarchical so `_.extend()` or `_.defaults()` aren't enough to do the job. For example:

``` js
// default config
{
  "http": {
    "port": 8080,
    "host": "localhost"
  },
  "credentials": {
    "sqs": {
      "key": "***************",
      "secret": "*****************",
      "region": "eu-west-1"
    },
    "s3": {
      "bucket": "stuff"
    }
  },
  "log": {
    "level": "silly",
    "output": "file"
  }
}

// override
{
  "http": {
    "host": "10.x.y.z"
  },
  "log": {
    "level": "info"
  }
}

// result:
{
  "http": {
    "port": 8080,
    "host": "10.x.y.z"
  },
  "credentials": {
    "sqs": {
      "key": "***************",
      "secret": "*****************",
      "region": "eu-west-1"
    },
    "s3": {
      "bucket": "stuff"
    }
  },
  "log": {
    "level": "info",
    "output": "file"
  }
}
```

Although a deep-copy is done, don't mistake this for a full-blown JavaScript object deep copy! That is a complex problem (e.g.: https://github.com/jashkenas/underscore/issues/162). The module is intended for something like the above use-case.

Take a look at the tests for further examples.

### Installation

``` js
npm install json-override
```
### License

MIT
