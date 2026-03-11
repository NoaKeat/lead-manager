# lead-manager# Lead Manager (React)

A simple **Lead Management dashboard** built with **React + Vite** as part of a frontend coding assignment.

The application fetches leads from a public API, displays them in a responsive table, allows archiving leads without refreshing the page, and includes a validated form for adding manual leads.

The goal of the project is to demonstrate **React state management, form validation, and preparation for webhook integration**.

---

# Features

• Fetch leads from a public API  
• Display leads in a responsive table (desktop) and card layout (mobile)  
• Archive leads without refreshing the page (React state management)  
• Add manual leads through a validated form  
• Client-side validation for name, email, and phone  
• Print a JSON payload to the console ready for webhook integration  
• Loading and error handling for API requests  

---

# Tech Stack

React  
Vite  
TailwindCSS  
Framer Motion  
Radix UI Components  

---

# API Used

https://jsonplaceholder.typicode.com/users

The application uses this public API to simulate **lead data**.

Example fields used from the API:

- `name`
- `email`
- `phone`

These fields are mapped into the internal lead structure used by the application.

---

# Lead Data Structure

All leads are normalized into the following structure:

```json
{
  "id": 171284823,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0501234567",
  "source": "manual"
}

Explanation:

id – unique identifier
name – lead name
email – lead email
phone – lead phone number
source – indicates whether the lead came from the API or manual entry

Note:

The manual lead form internally uses a field called full_name, which is converted to name before being stored in the application state.

Application Flow
1. Fetch Leads

When the page loads, the application fetches data from:

https://jsonplaceholder.typicode.com/users

The response is transformed into a simplified structure and stored in React state.

Example mapping:

{
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  source: "api"
}
2. Display Leads

Leads are displayed using a responsive layout.

Desktop:

table view

Mobile:

card list view

3. Archive Lead

Each lead row includes an Archive button.

When clicked:

the lead is removed from React state

the UI updates immediately

the page does not refresh

Example implementation:

setLeads(prevLeads =>
  prevLeads.filter(lead => lead.id !== id)
)
4. Add Manual Lead

Users can add a lead manually using a form.

Fields:

Full Name

Email

Phone

The form opens when clicking Add Lead.

5. Form Validation

The form includes client-side validation.

Full Name

Required

Minimum 2 characters

Email

Required

Must match a valid email format

Example regex:

/^[^\s@]+@[^\s@]+\.[^\s@]+$/
Phone

Required

Digits only

Example validation:

/^\d+$/

If validation fails, the form prevents submission and displays an error message.

6. Webhook Payload Simulation

When a new lead is saved, the application prints a JSON payload to the console.

This simulates sending data to external automation tools such as:

Make

Monday.com

Zapier

Example console output:

{
  "id": 171284823,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "0501234567",
  "source": "manual"
}

Implementation example:

console.log("Webhook payload:", newLead)
Project Structure
src
 ├ components
 │   ├ leads
 │   │   ├ LeadForm.jsx
 │   │   ├ LeadTable.jsx
 │   │   ├ LeadRow.jsx
 │   │   ├ MobileLeadList.jsx
 │   │   └ MobileLeadCard.jsx
 │   └ ui
 ├ pages
 │   └ Home.jsx
 ├ App.jsx
 └ main.jsx
Running the Project

Install dependencies:

npm install

Run the development server:

npm run dev

Open the application in your browser:

http://localhost:5173