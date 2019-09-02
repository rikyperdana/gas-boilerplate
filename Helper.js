function ors(array){
  return _.filter(array, function(item){return item})[0];
}

function ands(array){
  if(_.every(array)){return _.last(array)}
}

function randomId(){
  return Math.random().toString(36).slice(2);
}