var ss = SpreadsheetApp.getActive();

function resetTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  var resetTriggerExists = false;

  triggers.forEach(function (trigger) {
    if(trigger.getEventType() === ScriptApp.EventType.CLOCK && trigger.getHandlerFunction() === "resetDay") {
      resetTriggerExists = true;
      ScriptApp.deleteTrigger(trigger);
      // PropertiesService.getDocumentProperties().setProperty('RESET_TRIGGER', 'false');
      ss.toast("The log will not reset.");
    }
  });
  
  if (!resetTriggerExists) {
      ScriptApp.newTrigger("resetDay")
        .timeBased()
        .atHour(0)
        .everyDays(1)
        .create();
      // PropertiesService.getDocumentProperties().setProperty('RESET_TRIGGER', 'true');
      ss.toast("The log will reset daily.");
    }
}

function dailyEmail() {

  delEmailTrigger();

  ScriptApp.newTrigger("emailReport")
    .timeBased()
    .atHour(17)
    .everyDays(1)
    .create();

  ss.toast("You are now opted into daily email notifications.");
}

function weeklyEmail() {

  delEmailTrigger();

  ScriptApp.newTrigger("emailReport")
    .timeBased()
    .atHour(17)
    .onWeekDay(ScriptApp.WeekDay.FRIDAY)
    .everyWeeks(1)
    .create();

  ss.toast("You are now opted into weekly email notifications.");
}

function delEmailTrigger() {
  var triggers = ScriptApp.getUserTriggers(ss);

  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "emailReport") {
      ScriptApp.deleteTrigger(triggers[i]);
      ss.toast("You have unsubscribed from notifications.");
      break;
    }
  }
}