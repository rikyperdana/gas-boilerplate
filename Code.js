var _ = LodashGS.load();

function doGet(){
  return HtmlService.createTemplateFromFile('Page')
  .evaluate();
}

function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename)
  .getContent();
}

function initiate(){
  var anySheet = ors(_.map(
    ['Pasien', 'Barang'],
    function(name){return DriveApp.getFilesByName(name).hasNext()}
  ));
  if(!anySheet){
    var list = _.map(['Pasien', 'Barang'], function(name){
      return [name, SpreadsheetApp.create(name).getId()]
    });
    PropertiesService.getScriptProperties()
    .setProperties(_.fromPairs(list));
  }
}