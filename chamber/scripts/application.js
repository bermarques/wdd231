const applicationDiv = document.querySelector(".application");

const showApplicationDetails = () => {
  const everything = window.location.href.split("?");
  const formData = new URLSearchParams(everything[1]);

  applicationDiv.innerHTML = "";
  applicationDiv.innerHTML = `<h2>Your application:</h2>
  <p><strong>Name</strong>: ${formData.get("firstname")} ${formData.get(
    "lastname"
  )}</p>
  <p><strong>Email</strong>: ${formData.get("email")}</p>
  <p><strong>Phone</strong>: ${formData.get("phone")}</p>
  <p><strong>Organization</strong>: ${formData.get("business-name")}</p>
  <p><strong>Applied at</strong>: ${new Date(
    +formData.get("timestamp")
  ).toLocaleString()}</p>
  `;
};

showApplicationDetails();
