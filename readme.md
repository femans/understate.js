understate.js - a simple string formatter for javascript / node
=======

syntax: 
>  string._(a,b,...) => replace underscores or numbered underscores by the arguments; 
>  string._({a:x, b:y, ...}) object-arguments will attempt to replace named underscores with their values. 

syntax: 
  string._(a,b,...) => replace underscores or numbered underscores by the arguments; 
  string._({a:x, b:y, ...}) object-arguments will attempt to replace named underscores with their values. 

* A '/' before an underscore escapes the underscore for the understate processor. 
* Named underscore patterns are not allowed to have underscores, spaces or slashes in them.
* Named patterns can be only numbers if not mixed with unnamed patterns.
* Unmatched underscore sequences will be removed from the string by default

> require('./understate')

>  'hello _!'._('world') => 'hello world!'
>  'my name is _ _'._(firstname, lastname) => 'my name is '+firstname+' '+lastname
>  'this is _1_; _1_ is a _2_'._('bob', 'builder') => 'this is bob; bob is a builder'
>  'this is _name_ the _profession_'._({profession: 'builder', name: 'bob'}) => 'this is bob the builder'
>  '_first_ _1_'._('expressions', {first: 'mixed'}) => 'mixed expressions'
>  '_1_'._('which', {1:'one?'}) => 'which'
>
>  'hello /_ _'._('world') => 'hello _ world' // '/' escapes underscore for understate processor

by doing sth like:
>> var understate = require('./understate');
>> understate.replace_character('~');
you can change the character that is used in stead of _; the function name is still _ though. Also bear in mind that this has to be regex-safe; so in stead of e.g. '%' do '\\%'. It can also be a sequence of characters.

to change behaviour of removing of the unreplaced sequence, do sth like this:
>> var understate = require('./understate');
>> understate.keep_in_place(true);

see index.js for examples
for now, understate.js can be used as a module in node. By removing the module lines, it can also be used for general purpose.
======
TODO:
make full npm package

