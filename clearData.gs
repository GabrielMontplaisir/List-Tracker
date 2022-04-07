var ss = SpreadsheetApp.getActive();

function uncheckBoxes() {
  var sss = ss.getSheets();

  sss.forEach(function(uncheckBox) {
    if (uncheckBox.getName() != 'Activity Log' && uncheckBox.getName() != 'Document Properties' && uncheckBox.getName() != 'Instructions') {
      uncheckBox.getRange(2,2,uncheckBox.getLastRow()+1, uncheckBox.getLastColumn()+1).uncheck();
    }  
  });
}

function activityLogMenu() {
  var ui = SpreadsheetApp.getUi();

  var result = ui.alert(
    'Delete the Activity Log?',
    'We encourage you send yourself an email report or export the Activity Log first. Do you want to continue?',
    ui.ButtonSet.YES_NO);

  if (result == ui.Button.YES) {
    uncheckBoxes();
    delActivityLog();
  }
}

function delActivityLog() {
  var aL = ss.getSheetByName('Activity Log');
  aL.getRange(2,1,aL.getLastRow(),aL.getLastColumn()).clear();
  ss.toast('Activity Log deleted.')
}

function resetDay() {
  uncheckBoxes();
  delActivityLog();
  delDocProps();
}