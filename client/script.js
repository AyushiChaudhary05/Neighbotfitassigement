// Dark Mode Toggle
document.getElementById("darkModeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark", this.checked);
});

// Form Submission Logic
document.getElementById("preferenceForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const greenery = parseInt(form.greenery.value);
  const traffic = parseInt(form.traffic.value);
  const budget = form.budget.value;
  const temple = form.temple.value;
  const park = form.park.value;
  const roadSize = parseInt(form.roadSize.value);
  const gym = form.gym.value;

  const resultEl = document.getElementById("result");
  const loaderEl = document.getElementById("loader");

  // Reset result and show loader
  resultEl.className = "d-none";
  loaderEl.classList.remove("d-none");

  try {
    const response = await fetch("https://neighbotfitassigement.onrender.com/api/match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        greenery,
        traffic,
        budget,
        temple,
        park,
        roadSize,
        gym
      }),
    });

    const data = await response.json();

    loaderEl.classList.add("d-none");

    if (data.name) {
      resultEl.className = "alert alert-success fade show";
      resultEl.innerText = `✅ Best match: ${data.name}`;

      // Show toast
      const toastBody = document.getElementById("toast-body");
      toastBody.innerText = `🎉 Best match: ${data.name}`;
      const toast = new bootstrap.Toast(document.getElementById("toast"));
      toast.show();
    } else {
      resultEl.className = "alert alert-warning fade show";
      resultEl.innerText = "❌ No match found.";
    }
  } catch (err) {
    loaderEl.classList.add("d-none");
    resultEl.className = "alert alert-danger fade show";
    resultEl.innerText = "Something went wrong!";
    console.error("Error:", err);
  }
});

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}
