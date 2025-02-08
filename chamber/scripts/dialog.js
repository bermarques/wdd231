const membershipModal = document.querySelector("#membership-modal");
const npButton = document.querySelector(".np-btn");
const bronzeButton = document.querySelector(".bronze-btn");
const silverButton = document.querySelector(".silver-btn");
const goldButton = document.querySelector(".gold-btn");

npButton.addEventListener("click", () => {
  displayMembershipDetails(1);
});

bronzeButton.addEventListener("click", () => {
  displayMembershipDetails(2);
});

silverButton.addEventListener("click", () => {
  displayMembershipDetails(3);
});

goldButton.addEventListener("click", () => {
  displayMembershipDetails(4);
});

const displayMembershipDetails = async (level) => {
  const data = await getMembershipDetails();
  const membership = data.find((membership) => membership.level === level);
  membershipModal.innerHTML = "";
  membershipModal.innerHTML = `
      <button id="close-modal">❌</button>
      <h2>${membership.name} - $${membership.price}/year</h2>
      <p>${membership.description}</p>
      <ul>
        ${membership.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}
      </ul>
  `;

  membershipModal.showModal();

  const closeModal = document.querySelector("#close-modal");
  closeModal.addEventListener("click", () => {
    membershipModal.close();
  });
};

getMembershipDetails = async () => {
  try {
    const res = await fetch("./data/memberships.json");
    const data = await res.json();
    return data;
  } catch (err) {
    throw new Error("Error loading JSON file");
  }
};

let timestampField = document.querySelector("#timestamp");

addEventListener("submit", (event) => {
  timestamp.value = Date.now();
});
