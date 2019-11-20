<template>
  <div id="cardBottom" class="container mt-5">
    <div class="full-card" v-show="showCard">
      <div class="row text-center d-flex justify-content-center pt-5 mb-3">
        <div class="nav-links">
          <h6 class="text-uppercase font-weight-bold">All Question : {{countQuestion}}</h6>
        </div>
        <div class="nav-links" :percentag="percentag()">Percent : {{percent}}</div>
        <div class="nav-links">Right : {{score}}</div>
      </div>

      <div class="progress">
        <div
          class="progress-bar progress-bar-striped bg-danger progress-bar-animated"
          :style="{width:  countDown +'%'}"
        ></div>
      </div>

      <div class="col mt-5">
        <Card
          :front="question.country"
          :back="question.currency + ' ' + '(' + question.iso_code + ')'"
          v-on:click="showReply"
          :isQuestion="isQuestion"
        />
      </div>
      <div class="row mt-5">
        <div
          class="col-md-6 offset-md-3 text-center"
          v-show="countDown === 0 ? !showButtons: showButtons"
        >
          <h3 class="text-white font-weight-bold">Did you know the answer?</h3>
          <button
            class="btn btn-labeled btn-success btn-primary btn-lg"
            v-on:click="nextQuestion(true)"
          >
            <span class="btn-label">✅ &nbsp; &nbsp;</span>Yes
          </button>
          <button
            type="button"
            class="btn btn-labeled btn-danger btn-secondary btn-lg"
            v-on:click="nextQuestion(false)"
          >
            <span class="btn-label">❎&nbsp;&nbsp;No</span>
          </button>
        </div>
      </div>
    </div>

    <div class="reset" v-show="showResetButtons">
      <Results :score="score" :countQuestion="countQuestion" :percent="percent" :wrong="wrong" />
      <button v-on:click="resetGame()" class="btn btn-primary btn-lg btn-block mt-3">Start over</button>
      <router-link :to="{ name: 'Home'}">
        <button class="btn btn-secondary btn-lg btn-block mt-3">Back to home</button>
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
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
      countDown: 30,
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
      this.countDown = 30;
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
</style>
