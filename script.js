"use strict";

const searchBtn = document.querySelector(".search__btn");
const inputSearch = document.querySelector(".search__input");
const ProfileImg = document.querySelector(".content__profile-img");
const ProfileName = document.querySelector(".content__profile-name");
const userName = document.querySelector(".content__user-name");
const day = document.querySelector(".day");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const bio = document.querySelector(".content__bio");
const repos = document.querySelector(".content__stats-number--repo");
const followers = document.querySelector(".content__stats-number--followers");
const following = document.querySelector(".content__stats-number--following");
const locationName = document.querySelector(".content__location-name");
const twitter = document.querySelector(".content__info-link--twitter");
const website = document.querySelector(".content__info-link--website");
const company = document.querySelector(".content__info-link--company");
const themeToggle = document.querySelector(".header__theme-switcher");
const themeText = document.querySelector(".header__theme-text");
const error = document.querySelector(".search__error");

// CLASS
class GitSearch {
  constructor() {
    this.month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    this.getData("ameer005");
  }

  setColor(input) {
    input.parentNode.style.color = "var(--color-txt-low-contrast)";
    input.parentNode.style.fill = "var(--color-txt-low-contrast)";
  }

  async getData(username) {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) {
        error.style.display = "block";
        throw new Error("Invalid username");
      }
      error.style.display = "none";

      const data = await res.json();
      const date = new Date(data.created_at);

      // setting profile box value
      ProfileImg.src = data.avatar_url;
      ProfileName.textContent = data.name;
      userName.textContent = data.login;
      userName.href = data.html_url;
      day.textContent = date.getDay();
      month.textContent = this.month[date.getMonth()];
      year.textContent = date.getFullYear();

      // Setting bio value
      if (!data.bio) {
        bio.textContent = "This profile has no bio";
        this.setColor(bio);
      } else bio.textContent = data.bio;

      // Setting stats values
      repos.textContent = data.public_repos;
      followers.textContent = data.followers;
      following.textContent = data.following;

      // Setting links values
      // location
      if (!data.location) {
        locationName.textContent = "No location";
        this.setColor(locationName);
      } else locationName.textContent = data.location;

      // twitter
      if (!data.twitter_username) {
        twitter.textContent = "Not Available";
        this.setColor(twitter);
      } else {
        twitter.textContent = data.twitter_username;
        twitter.href = `https://twitter.com/${data.twitter_username}/`;
      }

      // website
      if (!data.blog) {
        website.textContent = "Not Available";
        this.setColor(website);
      } else {
        website.textContent = data.blog;
        website.href = data.blog;
      }

      // company
      if (!data.company) {
        company.textContent = "No Company";
        this.setColor(company);
      } else {
        company.textContent = data.company;
        company.href = data.company;
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Theme switch
  themeSwitch() {
    document.body.classList.toggle("light");

    if (document.body.classList.contains("light"))
      themeText.textContent = "Dark";
    else themeText.textContent = "Light";
  }
}

const searchUser = new GitSearch();

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  searchUser.getData(inputSearch.value.toLowerCase().trim());
});

themeToggle.addEventListener("click", function () {
  searchUser.themeSwitch();
});
