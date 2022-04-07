function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("List Tracker")
    .addItem("Export Log", "exportLog")
    .addSubMenu(ui.createMenu("Email Report")
      .addItem("Send Email Report", "emailReport")
      .addSeparator()
      .addItem("Receive Daily Notifications", "dailyEmail")
      .addItem("Receive Weekly Notifications", "weeklyEmail")
      .addItem("Unsubscribe", "delEmailTrigger"))
    .addSubMenu(ui.createMenu("Document Properties")
      .addItem("Generate Properties", "getDocProps")
      .addItem("Delete Properties", "docPropsMenu")
      .addItem("Delete Activity Log", "activityLogMenu")
      .addItem("Reset Log Daily", "resetTrigger"))
  .addToUi();
}