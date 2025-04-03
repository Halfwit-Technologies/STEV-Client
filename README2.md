# Assistant STEV
## Description

The Email Simplification Tool enhances email management by intelligently categorizing recent emails into two distinct groups based on user interaction patterns:

- **Important Emails:** Typically read and replied to by the user.
- **Ignored Emails:** Typically ignored or marked as read without interaction.

### Categorization Dependencies

The sorting mechanism considers the following dependencies to categorize emails accurately:

- **Frequency of Interaction:** How often the user engages with emails from specific senders.
- **Sender Information:** Historical interaction patterns with individual senders.
- **Content Analysis:** Body content relevance determined through AI-driven semantic analysis.

### Desktop Overlay Notification

Upon detecting new emails when the user starts their computer, the tool provides a desktop overlay notification about these new emails. This notification includes a button to open a detailed desktop overlay bar for quick email management.

### Desktop Overlay Bar

The overlay bar contains three main blocks:

#### Important Emails Block

Displays key information for immediate attention:

- **Sender**
- **Subject**
- **AI-generated Brief Summary**

Available actions:

- **Mark as Read** Marks email as read.
- **Ignore:** Does nothing to the emails.
- **Mark as important:** Sends email to the important/starred category.
- **Show Full Text:** Opens a pop-up window displaying the complete email content.
- **Reply:** Opens a pop-up window for typing and sending a quick response.
- **Reply in Client:** Opens the email directly in the default email client.

**Special Functionality:**  
Emails suggesting meeting schedules include an additional button:
- **Add to Calendar:** Automatically schedules the meeting in the user's calendar.

#### Ignored Emails Block

Provides an overview of less critical emails:

- **Sender**
- **Subject**

Available batch actions:

- **Ignore All:** Collectively ignores all listed emails.
- **Mark All as Read:** Collectively marks all listed emails as read.

Individual actions (available next to each email):

- **Ignore**
- **Mark as Read**

### Quick Access Buttons

- **Open Email Client:** Direct access to the user's default email client.


## Getting Started

### Dependencies

* Works on Windows 10 or later versions. 
* Works on MacOS 14: Sonoma or later versions.

### Installing

* Install an .exe file and run
* No modifications in files/folders needed to be done

### Executing program

## Help

## Authors

Developed by Halfwit Technologies (https://halfwit.tech, contact@halfwit.tech)

## Version History

## License

## Acknowledgments

