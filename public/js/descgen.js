document.getElementById("aiBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("aiPrompt").value;

  if (!prompt.trim()) {
    alert("Please enter a prompt");
    return;
  }

  try {
    const response = await fetch("/ai/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    document.getElementById("title").value = data.title;
    document.getElementById("description").value = data.description;
  } catch (error) {
    console.error("Error generating content:", error);
    alert("Failed to generate content. Please try again.");
  }
});
