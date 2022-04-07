function onEdit(e) {
  
  // Variable to establish spreadsheet and range selected.
  var ss = SpreadsheetApp.getActive();
  var lock = LockService.getDocumentLock();
  var wait = lock.tryLock(10000);
  var sh = ss.getActiveSheet();
  var r = ss.getActiveRange();
  var row = r.getRow();
  var col = r.getColumn();

  if (sh.getName() != "Activity Log" && col != 1 && row != 1 && lock.hasLock() == true) {

    // Variable to call on the 'Activity Log' spreadsheet.
    var aL = ss.getSheetByName("Activity Log");

    // Variable to swap to the next row in the Activity Log every time a box is checked.
    var spot = aL.getLastRow() + 1;

    // The next few variables were just created to be more efficient when coding. Typically turning repeated commands into variables also makes the code more optimized.
    // Variable for the timestamp.
    var CurrentDate = new Date();

    // Variable for the student's name.
    var sn = sh.getRange(row, 1).getValue();
    // Variable for the homeroom. Ideally the sheet name should be in cell A1.
    var hr = sh.getName();
    // Variable for the list name. Will check the first row of any column with checkboxes
    var ln = sh.getRange(1,col).getValue();

    var Student = [sn,hr,ln];

    // The Cells to be populated in the Activity Log. These cells will be pushed down a row every time a box is checked.
    var StudentName = aL.getRange(spot,1);
    var Homeroom = aL.getRange(spot,2);
    var List = aL.getRange(spot,3);
  
    var Log = [StudentName,Homeroom,List];

    if (r.getValue() == true) {
      for (var i = 0; i < Student.length ; i++){
          Log[i].setValue(Student[i])
      };
      aL.getRange(spot,4).setValue(CurrentDate);
      let psObj = PropertiesService.getDocumentProperties().getProperties();
      psObj[Student.map(re => re).join()] = spot;//this saves the current row number in the user properties so that it will be available for their return.
      PropertiesService.getDocumentProperties().setProperties(psObj);
    
    }
    
    if (r.getValue() == false) {
      let oldspot = parseInt(PropertiesService.getDocumentProperties().getProperties()[Student.map(re => re).join()]);//This gets the last row used in the log sheet
      aL.getRange(oldspot, 5).setValue(CurrentDate);
    }

    SpreadsheetApp.flush();
    lock.releaseLock();
  }
  if (!wait){
    e.source.toast("Could Not Log information at "+sh.getName()+", Row "+row+", Column "+col+". Please try Again.");
  }
}