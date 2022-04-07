function createFolder() {
  var userFolders = DriveApp.getFolders();
  var sltFolderExists = false;
  var sltFolderName = 'List Tracker';
  var sltFolderID = '';
  
  // Check if folder already exists.
  while(userFolders.hasNext()){
    var folder = userFolders.next();

    //If the name exists return the id of the folder
    if(folder.getName() === sltFolderName){
      sltFolderExists = true;
      sltFolderID = folder;
      return sltFolderID.getId();
    };
  };

  //If the name doesn't exists, then create a new folder
  if(!sltFolderExists){
    sltFolderID = DriveApp.createFolder(sltFolderName);
    return sltFolderID.getId();
  };
}

var ss = SpreadsheetApp.getActive();
var CurrentDate = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd, HH:mm");
var subject = ""+CurrentDate+" - List Tracker Report"

function exportLog() {
  var aL = ss.getSheetByName('Activity Log');

  var ssNew = SpreadsheetApp.create(subject);
  var sltFolderID = DriveApp.getFolderById(createFolder());
  DriveApp.getFileById(ssNew.getId()).moveTo(sltFolderID);

  aL.copyTo(ssNew);
  ssNew.getSheetByName('Sheet1').activate();
  ssNew.deleteActiveSheet();
  ssNew.renameActiveSheet(subject);

  ss.toast("Log exported successfully in folder \'List Tracker\'");
  return ssNew.getId();
}

function emailReport() {
  var emailAddress = Session.getActiveUser().getEmail();

  var message = "You are receiving this email because you requested an email report from the List Tracker.\nYou can find a report of the Activity Log in the PDF attached to this email.";

  var pdf = DriveApp.getFileById(exportLog()).getAs('application/pdf').getBytes();
  var attach = {fileName: subject+".pdf", content:pdf, mimeType:'application/pdf'};

  MailApp.sendEmail(emailAddress, subject, message, {
    name: "List Tracker",
    noReply: true,
    attachments:[attach]
  });
  ss.toast("Email sent successfully.");
}