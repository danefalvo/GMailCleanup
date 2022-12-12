// creating an array containing all the search strings matching the emails we want to be treated automatically
// What are we searching for, bud?
var searches = [
  'label:lifecycles-ultra-short-lifecycle', 
  ];
var toDelete = 50; // how many emails to delete? This was for testing, so I could just do a couple at a time.
var lifeCycleDays = 3; // will only impact emails more than 72h old
var newbody = ""; // Empty email
var trashed = 0; // Count of the deleted
var stillvalid = 0;  // Count of emails still within the date range


// This code fetches grabs a random image and and sends the email
function sendEmail() {
  var randomPicUrl = "https://picsum.photos/50";
  var date = Utilities.formatDate(new Date(), "GMT+1", "dd/MM/yyyy");
  var body = Logger.getLog()
  var randomPicBlob = UrlFetchApp
                         .fetch(randomPicUrl)
                         .getBlob()
                         .setName("randomPicBlob");
  MailApp.sendEmail({
    to: "danefalvo@gmail.com",
    subject: "Email Cleanup: " + trashed + " Emails Deleted",
    htmlBody: "<img src='cid:randomPic'><br><h3><b>Deleted Email Summary for " + date + "</b><br>Emails Checked: " + toDelete + "<br>Moved to Trash: " + trashed + "<br>Within Date Range ("+lifeCycleDays+" Days):" + stillvalid + "<br><br><b>Trashed Emails<br></b></h3>" +
              newbody + "<br><sub><a href=\"https://paypal.me/DAFCZ?country.x=CZ&locale.x=en_US\">buy me a coffee</a></sub>",
    inlineImages:
      {
        randomPic: randomPicBlob
      }
  });
}

function gmailCleaningRobot() {

  var maxDate = new Date();
  maxDate.setDate(maxDate.getDate()-lifeCycleDays); // what was the date at that time?
  

  
  // creating an array containing all the threads matching the searches above
  var threads = [];
  for (var i = 0; i <= searches.length; i++) {
    var tmp_threads = GmailApp.search(searches[i], 0, toDelete);
    var threads = threads.concat(tmp_threads);
  }
  
Logger.log("Deleting anything which matches : " + searches[0] + " Received Before " + maxDate + "<br>");

Logger.log("Threads : " + threads.length);

  // we archive all the threads if they're older than the time limit we set in lifeCycleDays
  for (var i = 0; i < threads.length; i++) {
    if (threads[i].getLastMessageDate()<maxDate)
    {
      var message = threads[i].getMessages()[0]


      Logger.log("Moving to Trash: " + (message.getSubject()) + " from Sender " + (message.getFrom()) + "<br>");
      const replacement = {'<':'','>':''}
      newbody = newbody + "<b>" + (message.getSubject()) + "</b>   |  <i> "+ ((message.getFrom()).replace(/[<>]/g, m => replacement[m])) +"</i><br>"
      threads[i].moveToTrash();
      trashed = trashed + 1
    } else
    {
      var message = threads[i].getMessages()[0]
      Logger.log("Within Date Range: \"" + (message.getSubject()) + "\" from Sender " + (message.getFrom())+ "<br>");
      stillvalid = stillvalid + 1
    }
  }
sendEmail()
}



