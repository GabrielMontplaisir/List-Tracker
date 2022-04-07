# List Tracker
A Google Apps Script designed to timestamp when checkboxes are (un)checked in a Google Sheet. I created this script during the COVID-19 pandemic as schools in our board needed to keep track of when students entered or left the classroom in case our local health unit needed to do some contact tracing. Teachers complained about the long process of writing things on paper or completing Google Forms, so I created the *List Tracker*. The feedback I received was very positive. What started as a favour to my school quickly became a personal project to see how far I could push Google Apps Script. This script automates when you modify a sheet (usually via tapping a checkbox), and outputs it into the `Activity Log` for your reference.

I've done my best to make this script as user-friendly as possible. Below, you will find an explanation about all the features this script has to offer! No need to go play in the Script Editor! Feel free to use it in new and creative ways, and don't forget to share some feedback if you like it, or if you think it could be improved in any way.

## Installation

1. Create a Google Sheet you plan to use as your List Tracker. If you plan on using this as a school, share this document with the staff. Create a tab in your Google Sheet called `Activity Log`. This is important for the script to work! If you would like to be able to check Document Properties at any point, create an additional tab called `Document Properties`. However, this last one is not necessary for the script to work.

2. Create a new tab, and name it as the Homeroom teacher, group name, or list name. Row 1 (Starting with B1) are the names of the lists that you want. You can have as many lists as you want. For example, you can have a list for going to the bathroom, the water fountain, the office, Student Success, etc. Be creative!

3. Column A (starting w/ A2) should have the student names, or items. You can have unlimited items or students per class. Then, place some checkboxes beside their name in the second column, below the list titles you've created in Step 2.

4. Navigate to *Extensions* > Google Apps Script. Copy & Paste the contents of all these files into the Google Apps Script screen.

**You can also create a copy template for yourself by clicking the website link to the right.**

## Usage

You will find a new menu titled *List Tracker* when the document opens. You can find all the functions the script has to offer conveniently in this nifty menu. Let's go through the options. This script was created with adaptability amd flexibility in mind.

When a student needs to leaves the classroom, check the appropriate box in the list beside their name. The script triggers and will generate the Student's Name, their Class Name, the List Name and the Time Out in the Activity Log. That student's spot in the Activity Log is then saved in the document's keys and values. This is why it's important not to clear the document's properties. If the properties were cleared, then the student's spot would also be deleted.

When a student comes back, uncheck the box. The document will retrieve the student's spot in the log, then input their time back in class in the Activity Log beside their name. It's that simple!

**Please Note:** Google Apps Script has certain limitations, particularly how often events trigger in short periods (This is true for most Google Apps). For example, if two people check a box at the same time, the script doesn't know which to interpret first. I've done my best to mitigate this issue by implemeting the Lock system. At this time, the script can queue about 7-8 actions at once before it starts generating errors. At our school, with a staff of about 40, this has never been an issue. For good meaure, you will receive an alert when the script returns an error with the tab name, the row and the column, indicating that the action wasn't logged, and to try again.

### Export Log

Export the `Activity Log` to a new Google Sheet in your Google Drive. It will create a new folder under your Root Google Drive titled `List Tracker`. It will then export the Activity Log into a new spreadsheet under the name 'yyyy-MM-dd, HH:mm - Sheets List Tracker Report'. Feel free to place this new folder wherever you want in your Drive. 
If you already have a folder named 'List Tracker', it will not create a duplicate. It will simply place the new spreadsheet into that folder.

### Email Report

*Send Email Report* does the same thing as *Export Log* (and will also create a folder if necessary). Additionally, it will send you a PDF copy of the current Activity Log to your email straight away. To clarify as to why it does the same function as *Export Log* (and why both options are available), Google Sheets does not allow a user to export a single tab from a document. In order to do so, you must create a new spreadsheet, then copy the data from the Activity Log into this new spreadsheet. Afterwards, you can save that new spreadsheet as a PDF, and send it as an email.

You may also opt into `Email Notifications` to automate the Email Report process. For now, you may receive either daily or weekly notifications (at this time, I've not coded it in such a way that you can receive both). The emails are sent between 5pm and 6pm, either daily or on Friday. If multiple users plan on using this document (such as sharing this with your school or organisation), **anyone** can opt into email notifications.

You may also stop receiving email notifications at any point by selecting `Unsubscribe`.

### Document Properties

You will find options to generate the document properties, to delete document properties and deelete the Activity Log. Clearing the log and properties will affect how information is generated in the Activity Log. As a preventative measure, you will receive a confirmation box to confirm your decision. Clearing the Activity Log will also uncheck all the boxes.

By toggling `Reset Log Daily`, you can have the log reset at the end of every day. It will uncheck all the boxes, clear the Activity Log and Delete the Document Properties for you.

## Coming Soon

- Allow the script to create the tabs for you
- Create a dedicated folder for the logs. At this time, it will add the logs to any folder named *List Tracker*. This can be problematic to know which one it actually goes into.