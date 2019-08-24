$(document).ready(() => {
    $("#add-task-form").on("submit", (e) => {
        addTask(e);
    });

    $("#edit-task-form").on("submit", (e) => {
       editTask(e);
    });

    displayTasks();
});

let tasks = JSON.parse(localStorage.getItem("tasks"));

function addTask(e) {
    let newDate = new Date();
    id = newDate.getTime();
    let task = $("#task");
    let taskPriority = $("#priority");
    let date = $("#date");
    let time = $("#time");
    let is1 = inputAlert(time, e);
    let is2 = inputAlert(date, e);
    let is3 = inputAlert(task, e);
    
    if(is1 && is2 && is3) {
        if(tasks == null) {
            tasks = [];
        }
        let taskList = JSON.parse(localStorage.getItem("tasks"));
        let newTask = {
            "id": id,
            "task": task.val(),
            "taskPriority": taskPriority.val(),
            "taskDate": date.val(),
            "taskTime": time.val()
        }
        tasks.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function editTask(e) {
    let id = $("#task_id").val();
    let task = $("#task");
    let taskPriority = $("#priority");
    let date = $("#date");
    let time = $("#time");
    let is1 = inputAlert(time, e);
    let is2 = inputAlert(date, e);
    let is3 = inputAlert(task, e);
    
    if(is1 && is2 && is3) {
        let taskList = JSON.parse(localStorage.getItem("tasks"));

        for(let i = 0; i < taskList.length; i++) {
            if(taskList[i].id == id) {
                taskList.splice(i, 1);
            }
        }
        localStorage.setItem("tasks", JSON.stringify(taskList));
        let newTask = {
            "id": id,
            "task": task.val(),
            "taskPriority": taskPriority.val(),
            "taskDate": date.val(),
            "taskTime": time.val()
        }
        taskList.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }
}

function inputAlert(inpt, e) {
    if(inpt.val() == "") {
        $("#alertText").text(capitalize(inpt.attr("id")) + " is required!");
        e.preventDefault()
        return false;
    } else {
        return true;
    }
}

function capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

function displayTasks() {
    let taskList = JSON.parse(localStorage.getItem("tasks"));
    if(taskList != null) {
        taskList = taskList.sort(sortByTime);
    }
    let i = 0;
    if(localStorage.getItem("tasks") != null) {
        $.each(taskList, (key, value) => {
            $("#task-table").append("<tr id=\"" + value.id + "\">" +
                                    "<td>" + value.task + "</td>" +
                                    "<td>" + value.taskPriority + "</td>" +
                                    "<td>" + value.taskDate + "</td>" +
                                    "<td>" + value.taskTime + "</td>" + 
                                    "<td><a href=\"edit.html?id=" + value.id + "\">Edit</a> | " +
                                    "<a href=\"#\">Remove</a></td>" +
                                    "</tr>");
        });
    }
}

function sortByTime(a, b) {
    let aTime = a.taskTime;
    let bTime = b.taskTime;
    return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0));
}



function getTask() {
    let $_GET = getQueryParams(document.location.search);
    id = $_GET["id"];

    let taskList = JSON.parse(localStorage.getItem('tasks'));

    for(let i = 0; i < taskList.length; i++) {
        if(taskList[i].id == id) {
            
            $("#edit-task-form #task_id").val(taskList[i].id);
            $("#edit-task-form #task").val(taskList[i].task);
            $("#edit-task-form #priority").val(taskList[i].taskPriority);
            $("#edit-task-form #date").val(taskList[i].taskDate);
            $("#edit-task-form #time").val(taskList[i].taskTime);
        }
    }
}

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    let params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while(tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }
    return params;
}