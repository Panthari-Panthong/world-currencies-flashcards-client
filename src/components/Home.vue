<template>
  <div id="home">
    <h1>The World Currency Quiz</h1>
    <router-link :to="{ name: 'CardsBottom'}" class="start">
      <button class="start">
        <p class="start-txt">Start</p>
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  // name: "home"
  // data() {
  //   return { msg: "Welcome to Your Vue.js App" };
  // }
};
</script>

<style>
/* @import "https://www.w3schools.com/w3css/4/w3.css"; */

#home {
  width: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -50%);
  overflow: hidden;
  text-align: center;
  border-style: solid;
  border-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 2%;
}
/* h1 {
  color: white;
  margin-bottom: 10%;
} */

.start-txt {
  font-weight: bold;
  font-size: 25px;
}

.start {
  width: 250px;
  height: 80px;
  border: none;
  outline: none;
  color: #fff;
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 10px;
}

.start:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowing 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 10px;
}

.start:active {
  color: #000;
}

.start:active:after {
  background: transparent;
}

.start:hover:before {
  opacity: 1;
}

.start:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #111;
  left: 0;
  top: 0;
  border-radius: 10px;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>