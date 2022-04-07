var ss = SpreadsheetApp.getActive();
var sh = ss.getSheetByName('Document Properties');

function getDocProps() {
  let uObj=PropertiesService.getDocumentProperties().getProperties();
  let keys = Object.keys(uObj);
  sh.clearContents();
  let a=[['Key','Value']];
  keys.forEach(k => {a.push([k,uObj[k]]);});
  sh.getRange(1,1,a.length, a[0].length).setValues(a);
  ss.toast('Document Properties generated.')
}

function docPropsMenu() {
  var ui = SpreadsheetApp.getUi();

  var result = ui.alert(
    'Delete document properties?',
    'This will cause the script to forget the students\' spot in the Activity Log. Do you want to continue?',
    ui.ButtonSet.YES_NO);

  if (result == ui.Button.YES) {
    delDocProps();
  }
}

function delDocProps() {
  PropertiesService.getDocumentProperties().deleteAllProperties();
  sh.clearContents();
  // scriptInit();
  ss.toast('Document Properties deleted.')
}