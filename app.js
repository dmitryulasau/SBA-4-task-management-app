const taskInput = document.getElementById("task-name");
const categorySelect = document.getElementById("category");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.querySelector(".btn");
const tbody = document.getElementById("table-body");

tbody.className = "divide-y divide-neutral-200 max-[768px]:block";

const categories = {
  no_category: { label: "No Category", icon: "icon-category", color: "bg-neutral-200" },
  health: { label: "Health", icon: "icon-health", color: "bg-red-200" },
  personal: { label: "Personal", icon: "icon-shopping", color: "bg-purple-200" },
  study: { label: "Study", icon: "icon-study", color: "bg-amber-200" },
  travel: { label: "Travel", icon: "icon-travel", color: "bg-green-200" },
  work: { label: "Work", icon: "icon-job", color: "bg-sky-200" },
};

const statuses = {
  progress: { icon: "icon-progress", color: "border-amber-400 bg-amber-100" },
  completed: { icon: "icon-completed", color: "border-green-400 bg-green-100" },
  overdue: { icon: "icon-info", color: "border-red-400 bg-red-100" },
};

const statusClasses = "status-select h-10 w-full rounded-xl border text-sm select pl-11 pr-10";

function updateStatus(select) {
  const status = statuses[select.value];
  const icon = select.parentElement.querySelector(".status-use");

  console.log(select);
  console.log(select.parentElement);
  console.log(select.parentElement.querySelector(".status-use"));

  icon.setAttribute("href", `./assets/sprite.svg#${status.icon}`);
  select.className = `${statusClasses} ${status.color}`;
}

// TABLE ROW
function createRow(taskText, categoryValue, deadlineValue) {
  const category = categories[categoryValue];

  const deadlineHtml = deadlineValue
    ? `<time datetime="${deadlineValue}">${deadlineValue}</time>`
    : `<span class="text-neutral-400">No deadline</span>`;

  const tr = document.createElement("tr");
  tr.className =
    "max-[768px]:grid max-[768px]:grid-cols-[auto_1fr_auto] max-[768px]:items-center max-[768px]:gap-x-3 max-[768px]:gap-y-2 max-[768px]:p-4 hover:bg-neutral-50";

  tr.innerHTML = `
    <!-- CHECKBOX -->
    <td class="px-4 py-3 max-[768px]:p-0 max-[768px]:justify-end">
      <input type="checkbox" class="size-5 cursor-pointer rounded-md border border-neutral-400" />
    </td>

    <!-- TASK (text is added below with textContent) -->
    <td class="task-text px-4 py-3 text-lg font-bold max-w-xl max-[768px]:p-0 max-[768px]:break-words"></td>

    <!-- CATEGORY -->
    <td class="px-4 py-3 text-lg font-bold max-[768px]:col-span-2 max-[768px]:col-start-2 max-[768px]:p-0 max-[768px]:text-base">
      <span class="inline-flex items-center gap-2 ${category.color} rounded-lg px-2 py-1">
        <svg class="icon" aria-hidden="true">
          <use href="./assets/sprite.svg#${category.icon}" />
        </svg>
        ${category.label}
      </span>
    </td>

    <!-- DEADLINE -->
    <td class="px-4 py-3 text-lg font-bold max-[768px]:col-span-2 max-[768px]:col-start-2 max-[768px]:p-0 max-[768px]:text-base">
      <span class="inline-flex items-center gap-2 px-2 py-1">
        <svg class="icon max-[1280px]:hidden" aria-hidden="true">
          <use href="./assets/sprite.svg#icon-calendar" />
        </svg>
        ${deadlineHtml}
      </span>
    </td>

    <!-- STATUS -->
    <td class="px-4 py-3 text-lg font-bold max-[768px]:col-span-2 max-[768px]:col-start-2 max-[768px]:p-0">
      <div class="relative w-40">
        <svg class="icon pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2" aria-hidden="true">
          <use class="status-use" href="./assets/sprite.svg#icon-progress" />
        </svg>
        <select name="filter-status" class="status-select">
          <option value="progress" selected>In Progress</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
        </select>
        <svg class="icon pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" aria-hidden="true">
          <use href="./assets/sprite.svg#icon-chevron-down" />
        </svg>
      </div>
    </td>

    <!-- ACTIONS -->
    <td class="px-4 py-3 w-32 max-[768px]:col-start-3 max-[768px]:row-start-1 max-[768px]:w-auto max-[768px]:p-0">
      <div class="flex items-center justify-between">
        <button type="button" aria-label="Edit task"
          class="hidden cursor-pointer hover:text-blue-400 px-2 py-1 bg-neutral-100 rounded-lg">
          <svg class="icon size-5" aria-hidden="true"><use href="./assets/sprite.svg#icon-edit" /></svg>
        </button>
        <button type="button" aria-label="Delete task"
          class="btn-delete cursor-pointer hover:text-red-600 px-2 py-1 bg-neutral-100 rounded-lg">
          <svg class="icon size-5" aria-hidden="true"><use href="./assets/sprite.svg#icon-delete" /></svg>
        </button>
      </div>
    </td>
  `;

  tr.querySelector(".task-text").textContent = taskText;

  updateStatus(tr.querySelector(".status-select"));

  return tr;
}

addTaskButton.addEventListener("click", (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim()[0].toUpperCase() + taskInput.value.trim().slice(1);
  if (taskText === "") return;

  const row = createRow(taskText, categorySelect.value, deadlineInput.value);
  tbody.appendChild(row);

  taskInput.value = "";
  deadlineInput.value = "";
  taskInput.focus();
});

// DELETE TASK
tbody.addEventListener("click", (e) => {
  const deleteButton = e.target.closest(".btn-delete");
  deleteButton.closest("tr").remove();
});

tbody.addEventListener("change", (e) => {
  if (e.target.matches(".status-select")) updateStatus(e.target);
});
