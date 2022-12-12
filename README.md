# GMailCleanup

**What does the Script do?**
- Looks for emails with a label that are older than _x_ days
- Moves the email to trash
- Sends an email to your inbox with a summary of what has been moved to trash



**How to get this script setup?**

- Head to [https://script.google.com](https://script.google.com/)

- Open the Editor:

![image](https://user-images.githubusercontent.com/5361797/206978918-8d683724-27c0-477d-b045-57d1a94b08a6.png)

- Paste the contents of [code.gs](https://github.com/danefalvo/GMailCleanup/blob/main/Code.gs)

At this point, you will likely be asked to give permission for Google Scripts to have access to GMail (Send/Read/Delete) and also the permission to Send email as you. Provide the permission.

- Set up a Trigger.

![image](https://user-images.githubusercontent.com/5361797/206979592-1724f8cd-9633-4dde-94ad-2cf0a2e03649.png)
It's important to select the function _GmailCleaningRobot_.

**Ongoing**

This script searches for anything with the label - 'lifecycle/lifecycles-ultra-short-lifecycle'. You can edit this easily in the code.

```
var searches = [
 'label:lifecycles-ultra-short-lifecycle',
 ];
```  
  
  
 - Setup a filter in Gmail. 
 Make sure to select all matching conversations as well.

![image](https://user-images.githubusercontent.com/5361797/206981224-2e114c80-f94d-4f35-93be-4b1e54bd1786.png)

![image](https://user-images.githubusercontent.com/5361797/206981380-fd684229-fa77-447d-8d75-892307685a43.png)


You can run the script from within Google Scripts to test - or just wait for it to run at the time setup on your trigger. Again, make sure you select the correct function
