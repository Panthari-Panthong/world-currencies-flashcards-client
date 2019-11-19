<template>
  <div id="cardBottom">
    {{ countDown }}
    <p>SCORE : {{score}}</p>
    <p>All Question : {{countQuestion}}</p>
    <p :percentag="percentag()">Percent : {{percent}}</p>
    <Card
      :front="question.country"
      :back="question.currency"
      v-on:click="showReply"
      :isQuestion="isQuestion"
    />
    <div class="answer" v-show="countDown === 0 ? !showButtons: showButtons">
      <p>Did you get it right?</p>
      <button class="yes" v-on:click="nextQuestion(true)">Yes</button>
      <button class="no" v-on:click="nextQuestion(false)">No</button>
    </div>

    <div class="reset" v-show="showResetButtons">
      <button v-on:click="resetGame()">Reset</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";

import { url } from "../constants";
import random from "../randomQues";
import Card from "./Card";

export default {
  name: "CardBottom",
  components: { Card },
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
      showResetButtons: false
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
      let randomNext = random(this.allQuestions);
      // console.log("THIS", randomNext);
      let nextQues = randomNext.shift();
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
      }
    },

    resetGame: function() {
      let questions = random(this.allQuestions);
      let newQuestion = questions.shift();

      this.question = newQuestion;
      this.percent = 0;
      this.score = 0;
      this.countQuestion = 0;
      this.countDown = 10;
      this.showResetButtons = false;
      this.isQuestion = true;
      this.countDownTimer();
      this.showButtons = false;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
