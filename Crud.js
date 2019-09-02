function getSheet(name){
  return SpreadsheetApp.openById(
    PropertiesService.getScriptProperties()
    .getProperties()[name]
  );
}

function insert(collName, document, _id){
  document._id = ors([_id, randomId()]);
  getSheet('Pasien').appendRow([JSON.stringify(document)]);
  return true
}

function read(collName, _id){
  var sheet = getSheet(collName);
  var foundDoc = sheet.getRange('a1:a'+sheet.getLastRow()).getValues()
  .filter(function(row){return _.includes(row[0], _id)})[0];
  return JSON.parse(foundDoc);
}

function list(collName, start, length){
  var sheet = getSheet(collName);
  var cellRange = 'a'+start+':a'+(start+length);
  return sheet.getRange(cellRange).getValues()
  .filter(function(item){return item[0]})
  .map(function(item){return JSON.parse(item[0])});
}

function update(collName, _id, newDocument){
  remove(collName, _id);
  insert(collName, newDocument, _id);
  return true
}

function remove(collName, _id){
  var sheet = getSheet(collName);
  var rowNum = null;
  sheet.getRange('a1:a'+sheet.getLastRow()).getValues()
  .filter(function(row, index){
    var test = _.includes(row[0], _id);
    if(test){rowNum = index+1; return test}
  });
  sheet.deleteRow(rowNum);
  return true;
}