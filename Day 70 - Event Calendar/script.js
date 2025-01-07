// Function to call generate calendar on load
window.onload = function () {
    generateCalendar();
};

// Function to generate the calendar
function generateCalendar() {
    const calendar = document.getElementById('calendar');

    // Create a new Date object to get the current date, month, and year
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    // Calculate the first and last day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    // Calculate the day of the week of the first day of the month
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    // Add blank div elements for the days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
        let blankDay = document.createElement("div");
        calendar.appendChild(blankDay);
    }

    // Add div elements for each day of the month
    for (let day = 1; day <= totalDays; day++) {
        let daySquare = document.createElement("div");
        daySquare.className = "calendar-day";
        daySquare.textContent = day;
        daySquare.id = `day-${day}`;
        calendar.appendChild(daySquare);
    }
}

// Function to show the add task modal
function showAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'block';
}

// Function to close the add task modal
function closeAddTaskModal() {
    document.getElementById('addTaskModal').style.display = 'none';
}

// Function to delete a task
function deleteTask(taskElement) {
    // Confirmation dialog to confirm deletion
    if (confirm("Are you sure you want to delete this task?")) {
        // If user confirms, remove the task element from its parent
        taskElement.parentNode.removeChild(taskElement);
    }
}

// Function to edit a task
function editTask(taskElement) {
    // Prompt user to edit the task description, with current description as default
    const newTaskDesc = prompt("Edit your task:", taskElement.textContent);
    // Check if user entered a new task description and it's not empty
    if (newTaskDesc !== null & newTaskDesc.trim() !== "") {
        // Update task element's text content with the new description
        taskElement.textContent = newTaskDesc;
    }
}

// Function to add a task
function addTask() {
    // Get task date and description from input fields
    const taskDate = new Date(document.getElementById('task-date').value);
    const taskDesc = document.getElementById('task-desc').value.trim();

    // Validate task date and description
    if (taskDesc && !isNaN(taskDate.getDate())) {
        // Get calendar days
        const calendarDays = document.getElementById('calendar').children;
        // Iterate through calendar days
        for (let i = 0; i < calendarDays.length; i++) {
            const day = calendarDays[i];
            // Check if day matches task date
            if (parseInt(day.textContent) === taskDate.getDate()) {
                // Create task element
                const taskElement = document.createElement("div");
                taskElement.className = "task";
                taskElement.textContent = taskDesc;

                // Add event listener for right-click to delete task
                taskElement.addEventListener("contextmenu", function (event) {
                    event.preventDefault(); // Prevent default context menu
                    deleteTask(taskElement); // Call deleteTask function
                });

                // Add event listener for regular click to edit task
                taskElement.addEventListener('click', function () {
                    editTask(taskElement); // Call editTask function
                });

                // Append task element to day element
                day.appendChild(taskElement);
                break;
            }
        }
        closeAddTaskModal(); // Close add task modal
    } else {
        // Alert if invalid date or task description
        alert("Please enter a valid date and task description!");
    }
}