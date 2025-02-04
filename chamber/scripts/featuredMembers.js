// import data from "../data/members.json" with {type: "json"};

const cards = document.querySelector(".featured-members");

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
  members.slice(0, 3).forEach((member) => {
    let card = document.createElement("section");
    card.className = "featured-member";

    let title = document.createElement("h5");
    title.textContent = member.name;
    card.appendChild(title);

    let memberData = document.createElement("div");
    memberData.className = "member-data";
    let portrait = document.createElement("img");
    portrait.setAttribute("src", member.logo);
    portrait.setAttribute("alt", `Logo of ${member.name}`);
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "100");
    portrait.setAttribute("height", "100");
    memberData.appendChild(portrait);

    card.appendChild(memberData);

    let info = document.createElement("div");
    let phone = document.createElement("p");
    phone.innerHTML = `<b>Phone:</b> ${member.phone}`;
    let website = document.createElement("p");
    website.innerHTML = `<b>Website:</b> <a href="${member.website}">${member.website}</a>`;
    info.appendChild(phone);
    info.appendChild(website);
    memberData.appendChild(info);
    cards.appendChild(card);
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
