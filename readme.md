#understate.js 
## a simple string formatter for javascript / node

Saying I was missing a string formatter in javascript is an understatement. So I made one. 

syntax: 

> `string._(a,b,...)` replace underscores (`_`, `_`) or numbered underscores (`_1_`, `_2_`) by the consecutive arguments; 

> `string._( {a:x, b:y, ...} )` replace by name: `_a_`, `_b_`


* escape with /
* Named patterns can't contain underscores, spaces or forward slashes.
* Unmatched patterns will be removed from the string by default
```
> require('./understate')

> 'hello _!'._('world')
'hello world!'
> 'this is _1_; _1_ is a _2_'._('bob', 'builder') 
'this is bob; bob is a builder'
> 'The name is _lastname_, _firstname_ _lastname_'._({firstname: 'James', lastname: 'Bond'})
'The name is Bond, James Bond'
> console.log('_/__@_.com'._('john', 'snow', 'nightswatch')) // escape an underscore with '/'
'john_snow@nightswatch.com'
```
by doing sth like:
```
> require('./understate').replace_character('~')
> 'hello ~!'._('world')
'hello world!'
```
... you can change the character that is used in stead of _; the function name is still _ though. Also bear in mind that this has to be regex-safe; so in stead of e.g. '%' do '\\%'. It can also be a sequence of characters.
```
> require('./understate').replace_character('\\%')
> 'hello %!'._('world')
'hello world!'
```

By default, if the function runs out of arguments, the remaining unreplaced occurrences of underscores are removed. To change this behaviour, do sth like this:
```
> '_ _ _ _ _'._('hello', 'world')
'hello world   '
> require('./understate').keep_in_place(true)
> '_ _ _ _ _'._('hello', 'world')
'hello world _ _ _'
```

see index.js for examples
for now, understate.js can be used as a module in node. By removing the module lines, it can also be used for general purpose.

TODO:
make full npm package

Please feel free to use this thing. Or hack it to your own personal taste. Any remarks / bugs / updates / etc are welcome.

