let commentIdCounter = 1;

function addComment(parentId = null) {
  // Get the correct input field based on whether it's a new comment or a reply
  const usernameField = document.getElementById(`usernameInput-${parentId}`);
  const commentField = document.getElementById(`replyInput-${parentId}`);

  const userName = usernameField.value.trim();
  const commentText = commentField.value.trim();

  // Validate inputs
  if (!userName || !commentText) {
    alert("Both username and comment are required.");
    return;
  }

  // Create a comment object
  const comment = {
    id: commentIdCounter++,
    text: commentText,
    userName: userName,
    replies: []
  };

  // Determine where to add the comment in the DOM
  const commentSection = parentId ? document.getElementById(`replies-${parentId}`) : document.getElementById("commentSection");
  const commentElement = createCommentElement(comment, parentId);
  commentSection.appendChild(commentElement);

  // Clear input fields
  usernameField.value = '';
  commentField.value = '';

  // Hide reply input if it's a reply
  if (parentId) {
    document.getElementById(`replyInputContainer-${parentId}`).classList.add("hidden");
  }
}

function createCommentElement(comment, parentId = null) {
  const commentDiv = document.createElement("div");
  commentDiv.classList.add("bg-gray-200", "p-4", "rounded", "shadow", "mb-4", parentId ? "ml-12" : "");

  // Profile Picture and User Info
  commentDiv.innerHTML = `
    <div class="flex space-x-4">
      <img class="w-10 h-10 rounded-full" src="https://via.placeholder.com/40" alt="User Profile Picture">
      <div>
        <div class="font-semibold">${comment.userName}</div>
        <p class="text-gray-700 mt-1">${comment.text}</p>
        <button onclick="showReplyInput(${comment.id})" class="text-sm text-blue-500 mt-2">Reply</button>
      </div>
    </div>

    <!-- Reply Input Section -->
    <div id="replyInputContainer-${comment.id}" class="hidden mt-4 ml-12">
      <input type="text" id="usernameInput-${comment.id}" class="border p-2 w-full rounded mb-2" placeholder="Your name">
      <input type="text" id="replyInput-${comment.id}" class="border p-2 w-full rounded mb-2" placeholder="Write a reply...">
      <div class="flex space-x-2">
        <button onclick="addComment(${comment.id})" class="bg-blue-500 text-white p-1 rounded">Post</button>
        <button onclick="hideReplyInput(${comment.id})" class="text-gray-500 p-1">Cancel</button>
      </div>
    </div>

    <!-- Container for nested replies -->
    <div id="replies-${comment.id}" class="ml-8 mt-4 space-y-4"></div>
  `;

  return commentDiv;
}

function showReplyInput(commentId) {
  document.getElementById(`replyInputContainer-${commentId}`).classList.remove("hidden");
}

function hideReplyInput(commentId) {
  document.getElementById(`replyInputContainer-${commentId}`).classList.add("hidden");
}
