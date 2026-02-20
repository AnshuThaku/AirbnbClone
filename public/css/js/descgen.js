console.log("AI script loaded ✅");

document.getElementById("aiBtn").addEventListener("click", async () => {
  const prompt = document.getElementById("aiPrompt").value;

  if (!prompt) {
    alert("Please enter a prompt");
    return;
  }

  console.log("Sending prompt:", prompt);

  try {
    const res = await fetch("/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || `Server error: ${res.status}`);
    }

    const data = await res.json();
    console.log("AI response:", data);

    document.getElementById("title").value = data.title;
    document.getElementById("description").value = data.description;
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to generate content: " + error.message);
  }
});
