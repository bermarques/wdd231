const modal = document.querySelector("#modal");

const displayMembershipDetails = async (level) => {
  const data = await getMembershipDetails();
  const membership = data.find((membership) => membership.level === level);
  modal.innerHTML = "";
  modal.innerHTML = `
      <button id="close-modal">❌</button>
      <h2>${membership.name} - $${membership.price}/year</h2>
      <p>${membership.description}</p>
      <ul>
        ${membership.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
      </ul>
  `;

  modal.showModal();

  const closeModal = document.querySelector("#close-modal");
  closeModal.addEventListener("click", () => {
    modal.close();
  });
};

getMembershipDetails = async () => {
  try {
    const res = await fetch("./data/movieDetails.json");
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Error loading JSON file");
  }
};
