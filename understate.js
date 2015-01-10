/*
 * >> require('./understate')
 * or: 
 * >> require('./understate')(true)
 *
 *   'hello _!'._('world') => 'hello world!'
 *   'my name is _ _'._(firstname, lastname) => 'my name is '+firstname+' '+lastname
 *   'this is _1_; _1_ is a _2_'._('bob', 'builder') => 'this is bob; bob is a builder'
 *   'this is _name_ the _profession_'._({profession: 'builder', name: 'bob'}) => 'this is bob the builder'
 *   '_first_ _1_'._('expressions', {first: 'mixed'}) => 'mixed expressions'
 *   '_1_'._('which', {1:'one?'}) => 'which'
 *
 *   'hello /_ _'._('world') => 'hello _ world' // '/' escapes underscore for understate processor
 *
 * syntax: 
 *   string._(a,b,...) => replace underscores or numbered underscores by the arguments; 
 *   string._({a:x, b:y, ...}) object-arguments will attempt to replace named underscores with their values. 
 *
 * * A '/' before an underscore escapes the underscore for the understate processor. 
 * * Named underscore patterns are not allowed to have underscores, spaces or slashes in them.
 * * Named patterns can be only numbers if not mixed with unnamed patterns.
 * * Unmatched underscore sequences will be removed from the string by default; this behaviour can be changed by calling the module with for example 
 * >> require('./understate')(true)
 */


/*
 * TODO:
 * 4. implement alternative replacer 
 */

var keep_in_place = false;

module.exports.keep_in_place = function(keep){
    if(keep)keep_in_place=keep;
    return this;
}

String.prototype._ = function(){
    var args = Array.apply(null, arguments), 
        named_args;

    if(typeof args[0] == 'object')
        named_args = args[0];

    if(!named_args){
        var re1 = new RegExp("(\\/)?_(\\d+)_", "gm"),
            re2 = new RegExp("(\\/)?(_)", "gm"),
            position = -1;
                
        return this.replace(re1, function(_, $0,$1){
            return ($0)?_:(args[$1-1]||(keep_in_place?_:''))
        })
        .replace(re2, function(m, slash, _){
            return slash?(keep_in_place?m:_):(args[++position]||(keep_in_place?_:''))
        });
    }
    else
        return this.replace(/(\/)?_([^/_\s]*)(\/)?_/gm, function(_, $0,$1,$2){
            return ($0||$2)?_:(named_args[$1]||(keep_in_place?_:''))
        });
}
