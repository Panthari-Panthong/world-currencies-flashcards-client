<template>
  <div id="cardBottom">
    <div class="card" v-show="showCard">
      <nav class="navbar">
        <div class="nav-links">All Question : {{countQuestion}}</div>
        <div class="nav-links" :percentag="percentag()">Percent : {{percent}}</div>
        <div class="nav-links">{{ countDown }}</div>
        <div class="nav-links">Right : {{score}}</div>
        <div class="nav-links">Wrong : {{wrong}}</div>
      </nav>

      <Card
        :front="question.country"
        :back="question.currency + ' ' + '(' + question.iso_code + ')'"
        v-on:click="showReply"
        :isQuestion="isQuestion"
      />
      <div class="answer" v-show="countDown === 0 ? !showButtons: showButtons">
        <p>Did you get it right?</p>
        <button class="yes" v-on:click="nextQuestion(true)">Yes</button>
        <button class="no" v-on:click="nextQuestion(false)">No</button>
      </div>
    </div>

    <div class="reset" v-show="showResetButtons">
      <Results :score="score" :countQuestion="countQuestion" :percent="percent" :wrong="wrong" />
      <button v-on:click="resetGame()" class="reset-btn">Start over</button>
      <router-link :to="{ name: 'Home'}">
        <button class="home-btn">Back to home</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";

import { url } from "../constants";
import Card from "./Card";
import Results from "./Results";
import "../loading-bar/loading-bar";

export default {
  name: "CardBottom",
  components: { Card, Results },
  data() {
    return {
      allQuestions: {},
      question: {},
      isQuestion: true,
      showButtons: false,
      countQuestion: 0,
      score: 0,
      percent: 0,
      countDown: 10,
      showResetButtons: false,
      showCard: true,
      wrong: 0
    };
  },

  methods: {
    getQuestion: function() {
      axios
        .get(`${url}/cards`)
        .then(response => {
          // console.log("Respone", response.data);
          this.question = response.data.random;
          this.allQuestions = response.data.cards;
          // console.log(response.data.cards);
        })
        .catch(error => console.log(error));
    },

    showReply: function() {
      if (this.isQuestion === true) {
        this.showButtons = true;
      }
      this.isQuestion = !this.isQuestion;
    },

    nextQuestion: function(answer) {
      let randomNext = Math.floor(Math.random() * this.allQuestions.length);
      // console.log("THIS", randomNext);
      let nextQues = this.allQuestions[randomNext];
      // console.log("nextQues", nextQues);
      this.countQuestion += 1;
      this.question = nextQues;
      this.isQuestion = true;
      this.showButtons = false;
      if (answer === true) {
        return (this.score += 1);
      }
      return null;
    },

    percentag: function() {
      // console.log("ALL", this.countQuestion);
      // console.log("ANS", this.score);
      if (this.countQuestion !== 0 || this.score !== 0) {
        return (this.percent = Math.floor(
          (this.score / this.countQuestion) * 100
        ));
      }
      return (this.percent = 0);
    },

    countDownTimer: function() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else if (this.countDown === 0) {
        this.showResetButtons = true;
        this.showButtons = true;
        this.showCard = false;
      }
      this.wrong = this.countQuestion - this.score;
    },

    resetGame: function() {
      let randomQues = Math.floor(Math.random() * this.allQuestions.length);
      // console.log("THIS", randomQues);
      let newQuestion = this.allQuestions[randomQues];
      // console.log("nextQues", newQuestion);

      this.question = newQuestion;
      this.percent = 0;
      this.score = 0;
      this.countQuestion = 0;
      this.countDown = 10;
      this.wrong = 0;
      this.showResetButtons = false;
      this.isQuestion = true;
      this.countDownTimer();
      this.showButtons = false;
      this.showCard = true;
    }
  },
  mounted() {
    this.getQuestion();
  },

  created() {
    this.countDownTimer();
  }
};
</script>


<style scoped>
@import "../loading-bar/loading-bar.css";

.reset {
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  padding: 2%;
}

.home-btn,
.reset-btn {
  width: 100%;
  background-color: #8e44ad;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.home-btn:hover,
.reset-btn:hover {
  background-color: #9b50ba;
}

.navbar {
  font-size: 18px;
  background-image: linear-gradient(260deg, #2376ae 0%, #c16ecf 100%);
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding-bottom: 10px;
  text-align: center;
  margin: 15px auto;
}

.nav-links {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
}
</style>
