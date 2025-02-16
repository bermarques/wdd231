const applicationDiv = document.querySelector(".suggestion");

const showApplicationDetails = () => {
  const everything = window.location.href.split("?");
  const formData = new URLSearchParams(everything[1]);

  applicationDiv.innerHTML = "";
  applicationDiv.innerHTML = `<h2>Your Suggestion ticket:</h2>
  <p><strong>Name</strong>: ${formData.get("name")} ${formData.get("name")}</p>
  <p><strong>Email</strong>: ${formData.get("email")}</p>
  <p><strong>Suggestion</strong>: ${formData.get("description")}</p>
  <p><strong>Ticket time</strong>: ${new Date(
    +formData.get("timestamp")
  ).toLocaleString()}</p>
  `;
};

showApplicationDetails();
