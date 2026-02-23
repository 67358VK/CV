# Portfolio Website – Viktoriia Kyrylishyna

A responsive and fully functional personal portfolio website built with **HTML**, **CSS**, and **JavaScript**.  
The website showcases skills, projects, and professional background, and includes an interactive contact form integrated with **Google Sheets** via **Google Apps Script**.  

The project is deployed online using **Netlify**.

---

## Live Demo

- **Netlify Deployment:** [https://YOUR-NETLIFY-LINK.netlify.app](https://vkyrylishynaportfolio.netlify.app/)  

---

## Features

### Responsive Navigation Menu
- Mobile-friendly hamburger menu  
- Slide-in sidebar navigation on small screens  
- Smooth hover animations and active link indicators  

### Hero Section
- Full-screen background image  
- Introduction including your name and role  
- Clean and modern typography  

### About Section
Includes:  
- Profile image  
- Personal background and summary  
- Interactive tab system displaying:  
  - Experience  
  - Education  
  - Languages  

**JavaScript functionality:**  
- The `opentab()` function switches content dynamically  
- Tabs visually update to show active and inactive states  

### Skills Section
A dynamic two-part skills system:  
- Hard Skills  
- Soft Skills  

Features:  
- Buttons toggle between the two categories  
- Each category expands or collapses with "See more" / "See less" functionality  
- Smooth transitions using CSS animations  
- Responsive grid layout for all devices  

**JavaScript handles:**  
- Active state buttons  
- Expanding lists  
- Display switching between skill types  

### Projects Section
A structured project gallery displaying recent work.  

Features:  
- Image-based project cards  
- Hover animation revealing:  
  - Project title  
  - Short description  
  - GitHub repository link  
- Smooth scaling image effects during hover  

### Contact Section
Includes:  
- Email and phone number  
- LinkedIn and Instagram links  
- Downloadable CV (PDF)  
- Functional contact form  

---

## Contact Form Functionality
- Connected to a **Google Apps Script backend**  
- Submissions are saved directly into a **Google Sheet**  
- Success message displays for five seconds  
- Form automatically resets  

---

## Google Sheets Integration
- Uses a deployed Google Apps Script endpoint  https://docs.google.com/spreadsheets/d/1Wvwt2a4z0cq1EXd74BOCwWn-w-9C_Li6ihruCxIacIg/edit?gid=0#gid=0
- Sends a POST request via `fetch()` API in JavaScript  
- Automatic timestamping and row creation on the sheet

```var sheetName = 'Sheet1'
var scriptProp = PropertiesService.getScriptProperties()

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  scriptProp.setProperty('key', activeSpreadsheet.getId())
}

function doPost (e) {
  var lock = LockService.getScriptLock()
  lock.tryLock(10000)

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'))
    var sheet = doc.getSheetByName(sheetName)

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    var nextRow = sheet.getLastRow() + 1

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header]
    })

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow])

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  finally {
    lock.releaseLock()
  }
}
```

**Apps Script features:**  
- Spreadsheet lock prevents concurrent write issues  
- Retrieves sheet headers dynamically  
- Returns a JSON success or error response  

---

## Technologies Used

**Frontend**  
- HTML5  
- CSS3  
- JavaScript (ES6)  
- FontAwesome  
- Google Fonts (Poppins)  

**Backend**  
- Google Apps Script  
- Google Sheets  
- Fetch API  

**Deployment**  
- Netlify (automatic hosting and SSL)  

---

## Running the Project Locally

1. Clone the repository:  

git clone  https://github.com/Kyrylishyna/portfolio.git


2. Open the project folder  
3. Launch the site by opening `index.html` in a browser  
4. Ensure your Apps Script endpoint is active if you want the contact form to work locally  

---

## Deployment on Netlify

1. Push your project to GitHub  
2. Log in to Netlify  
3. Select **New site from Git**  
4. Choose your GitHub repository  
5. Deploy  

> Netlify automatically rebuilds the site on every commit if linked to your repository.

