import {strategies} from "./strategy";

/* Strategy Design Pattern to validate the input and search result */
export const Validator = function(){
    this.cache = []; 
};

Validator.prototype.add = function(target, rules){
  const self = this;
  for (let i = 0; i < rules.length; i++) {
    let rule = rules[i];
    (function( rule ){
        let strategyAry = rule.strategy.split( ':' );
        let errorMsg = rule.errorMsg;
        let args = rule.args;

        self.cache.push(function(){
          let strategy = strategyAry.shift();
          strategyAry.unshift( args );
          strategyAry.unshift( target );
          strategyAry.push( errorMsg );
          return strategies[ strategy ].apply(self, strategyAry);
        });
    })( rule )
  }
};

Validator.prototype.start = function(){
  for ( let i = 0; i < this.cache.length; i++ ){
    const validatorFunc = this.cache[i];
    const msg = validatorFunc(); 
    if (msg){ 
      return msg;
    }
  }
};
