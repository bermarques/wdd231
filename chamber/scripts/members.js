// import data from "../data/members.json" with {type: "json"};

const cards = document.querySelector("#members");

const getMembershipLevel = (level) => {
  switch (level) {
    case 1:
      return "Member";
    case 2:
      return "Silver";
    case 3:
      return "Gold";
  }
};

const displayMembers = (members) => {
  members.forEach((member) => {
    let card = document.createElement("section");
    card.className = "member";
    let imageContainer = document.createElement("div");

    let title = document.createElement("h5");
    title.textContent = member.name;

    let level = document.createElement("p");
    level.textContent = "Membership level: " + getMembershipLevel(member.level);

    let portrait = document.createElement("img");
    portrait.setAttribute("src", member.logo);
    portrait.setAttribute("alt", `Logo of ${member.name}`);
    portrait.setAttribute("loading", "lazy");

    imageContainer.appendChild(portrait);
    imageContainer.appendChild(title);
    imageContainer.appendChild(level);

    card.appendChild(imageContainer);

    cards.appendChild(card);

    let info = document.createElement("div");
    let phone = document.createElement("p");
    phone.textContent = member.phone;
    let address = document.createElement("p");
    address.textContent = member.address;
    let website = document.createElement("a");
    website.setAttribute("href", member.website);
    website.textContent = member.website;

    info.appendChild(phone);
    info.appendChild(address);
    info.appendChild(website);

    card.appendChild(info);
  });
};

const getMembersData = async () => {
  try {
    const res = await fetch("./data/members.json");
    const data = await res.json();
    displayMembers(data);
  } catch (err) {
    throw new Error("Error loading JSON file");
  }
};

getMembersData();
