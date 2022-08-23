---
section: Patterns
title: Native Forms
order: 2
---

<h1>Native Form Styles</h1>

<form action="/form/submit" method="post">
  <fieldset>
    <legend>Personal information</legend>
    <label for="name"> First name: </label>
    <input id="name" type="text" name="firstname" placeholder="First name" required>
    <label for="last">Last name:</label>
    <input id="last" type="text" name="lastname" placeholder="Last name" required>
    <br>
    <br>
    <label for="age">Age:</label>
    <input id="age" type="number" min="10" max="100" step="1" name="number-of-colors">
    <label for="website">Website:</label>
    <input id="website" type="url" multiple>
    <br>
    <br>
    <label for="address">Email address:</label>
    <input id="address" type="email" name="email" placeholder="YourEmail@example.com" required>
    <label for="tel">Tel.:</label>
    <input id="tel" type="tel" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
    <br>
    <br>
  </fieldset>
  <fieldset>
    <legend>Getting to know YOU</legend>
    <label for="color">Favourite color:</label>
    <input id="color" type="color" name="color" value="#1c87c9" />
    <br>
    <p>Motivation level:</p>
    <input type="range" min="0" max="10" value="4">
    <br>
    <p>Favourite season:</p>
    <input type="radio" name="season" value="winter"> Winter
    <br>
    <input type="radio" name="season" value="autumn"> Autumn
    <br>
    <input type="radio" name="season" value="summer"> Summer
    <br>
    <input type="radio" name="season" value="spring"> Spring
    <br>
    <p>Favourite music:</p>
    <input type="radio" name="music" value="jazz"> Jazz
    <br>
    <input type="radio" name="music" value="blues"> Blues
    <br>
    <input type="radio" name="music" value="pop"> Pop
    <br>
    <input type="radio" name="music" value="rock"> Rock
    <br>
  </fieldset>
  <fieldset>
    <legend>Availability</legend>
    <label for="project">When you will be ready to start the Project?</label>
    <input id="project" type="date" name="date" value="2018-01-01" min="2018-01-01" max="2018-04-01">
    <br>
    <label for="hours">Mention your preferred working hours:</label>
    <input id="hours" type="time" name="time" value="09:00" />
    <label for="time">To </label>
    <input id="time" type="time" name="time" value="18:00" />
    <br>
    <label for="password"> Enter your password:</label>
    <input id="password" type="password" name="password" minlength="6" required placeholder="6 characters minimum" />
    <br>
    <br>
    <input type="submit" value="Send">
    <input type="reset" value="Reset">
  </fieldset>
</form>
