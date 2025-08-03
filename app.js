async function getUser() {
  const username = document.getElementById("username").value;
  const profile = document.getElementById("profile");

  if (!username) {
    alert("Please enter a GitHub username!");
    return;
  }

  const url = `https://api.github.com/users/${username}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("User not found");

    const data = await res.json();

    profile.innerHTML = `
      <img src="${data.avatar_url}" alt="${data.login}" />
      <h2>${data.name || "No name"}</h2>
      <p><strong>@${data.login}</strong></p>
      <p>${data.bio || "No bio provided"}</p>
      <p>Followers: ${data.followers} | Following: ${data.following}</p>
      <p>Public Repos: ${data.public_repos}</p>
    `;

    profile.classList.remove("hidden");
  } catch (err) {
    profile.innerHTML = `<p>User not found. Please try again.</p>`;
    profile.classList.remove("hidden");
  }
}
