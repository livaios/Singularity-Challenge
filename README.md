# Singularity-Challenge
A web application that manages calendar entries


**Available Functionalities:**
View your calendar
Create a calendar entry displaying a certain event
Edit available entries
Specify a recurring entry whether monthly or yearly


**Website Walkthrough: a guideline through various libraries**

Mongoose: is used primarily for database interactions such as
 	filtering and retrieving specific data from the database and adding new records to it. 
Joi: responsible for handling data validations making sure that no missing values are saved and that the entries have the correct format.
Moment: handles date and time format unification to avoid any errors regarding different date/time definitions.
React-big-calendar: contains the calendar format and calendar functionalities. Was used to facilitate user interactions such creating and editing entries by selecting the available slots.
React-bootstrap: was used for various styling of the website components.
