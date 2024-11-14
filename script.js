// Unique ID generator for comments and replies
let commentIdCounter = 1;

// Function to add a new comment
function addComment() {
  const commentInput = document.getElementById("commentInput");
  const commentText = commentInput.value.trim();

  if (commentText) {
    const commentId = `comment-${commentIdCounter++}`;
    const commentElement = createCommentElement(commentId, commentText);
    document.getElementById("commentSection").appendChild(commentElement);

    commentInput.value = "";
  }
}

// Function to create comment or reply element
function createCommentElement(id, text, isReply = false) {
  const container = document.createElement("div");
  container.className = isReply ? "reply comment" : "comment";
  container.id = id;

  const content = document.createElement("p");
  content.textContent = text;

  const replyButton = document.createElement("button");
  replyButton.className = "text-blue-500 text-sm mt-2";
  replyButton.textContent = "Reply";
  replyButton.onclick = () => showReplyInput(id);

  container.appendChild(content);
  container.appendChild(replyButton);

  return container;
}

// Function to show input field for replies
function showReplyInput(parentId) {
  const existingInput = document.getElementById(`input-${parentId}`);
  if (!existingInput) {
    const replyInput = document.createElement("input");
    replyInput.id = `input-${parentId}`;
    replyInput.className = "border p-1 w-full rounded mt-2";
    replyInput.placeholder = "Write a reply...";

    const submitButton = document.createElement("button");
    submitButton.className = "bg-blue-500 text-white p-1 mt-2 rounded";
    submitButton.textContent = "Reply";
    submitButton.onclick = () => addReply(parentId, replyInput.value);

    const container = document.getElementById(parentId);
    container.appendChild(replyInput);
    container.appendChild(submitButton);
  }
}

// Function to add a reply to a specific comment
function addReply(parentId, replyText) {
  if (replyText.trim()) {
    const replyId = `reply-${commentIdCounter++}`;
    const replyElement = createCommentElement(replyId, replyText, true);
    document.getElementById(parentId).appendChild(replyElement);

    // Clear the input field after reply is added
    document.getElementById(`input-${parentId}`).remove();
  }
}
