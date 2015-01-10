/*
 *   'hello _!'._('world') => 'hello world!'
 *   'my name is _ _'._(firstname, lastname) => 'my name is '+firstname+' '+lastname
 *   'this is _1_; _1_ is a _2_'._('bob', 'builder') => 'this is bob; bob is a builder'
 *   'this is _name_ the _profession_'._({profession: 'builder', name: 'bob'}) => 'this is bob the builder'
 *   '_first_ _1_'._('expressions', {first: 'mixed'}) => 'mixed expressions'
 *   '_1_'._('which', {1:'one?'}) => 'which'
 *   '_'._('_named_', {named: 'hello world'}) => 'hello world'
 *
 *   'hello /_ _'._('world') => 'hello _ world' // '/' escapes underscore for understate processor
 *
 * syntax: 
 *   string._(a,b,...) => replace underscores or numbered underscores by the arguments; 
 *   string._({a:x, b:y, ...}) object-arguments will attempt to replace named underscores with their values. 
 *   string._(a,b,{a:x,...}) => replace underscores or numbered underscores by the arguments; the last argument will attempt to replace named underscores by arguments in the string in a second pass  
 * Unmatched underscore sequences will be removed from the string by default
 */

// version 2 plan: allow for different symbol as replacer; allow option to keep unmatched replacers in place

/*
 * TODO:
 * 1. implement single pass, non-indexed replacers with escaping - done
 * 2. implement in the same pass numbered replacers with escaping - done
 * 3. implement named replacers, multi-pass
 * 4. implement alternative replacer 
 * 5. option to keep unmatched replacer in place = done
 */

var keep_in_place = false;
understate = function(keep){
    if(keep)keep_in_place=true;
}
String.prototype._ = function(){
    var args = arguments, 
        position = -1;
    var r = this.replace(/(\/)?_(\d+)(\/)?_/g, function(_, $0,$1,$2){return ($0||$2)?_:(args[$1-1]||(keep_in_place?_:''))})
             .replace(/(\/)?(_)/g, function(match, slash, _){return slash?_:(args[++position]||(keep_in_place?_:''))});
    return r;
}

module.exports = understate;
