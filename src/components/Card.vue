<template>
  <div class="cards">
    <!-- Front card -->
    <div
      @click="handleClick"
      v-bind:style="{backgroundColor: colorFront, color: colorTextFront}"
      v-show="isQuestion"
      class="animation flip3D flashcard"
    >
      <div class="card-top" style="padding-bottom: 15px; fontSize:1.5em">{{frontCardTitle}}</div>
      <div class="content text-center">
        <p :style="{fontSize: textSize,fontWeight: 'bold'}">{{front}}?</p>
      </div>
      <div class="card-bottom">{{frontCardFooter}}</div>
    </div>

    <!-- Back card -->
    <div
      @click="handleClick"
      v-bind:style="{backgroundColor: colorBack, color: colorTextBack}"
      v-show="!isQuestion"
      class="animation flip3D flashcard"
    >
      <div class="card-top" style="padding-bottom: 15px; fontSize:1.5em">{{backCardTitle}}</div>
      <div class="content text-center">
        <p :style="{fontSize: textSize, fontWeight: 'bold'}">{{back}}</p>
      </div>
      <div class="card-bottom">{{backCardFooter}}</div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleClick: function(event) {
      this.$emit("click");
    }
  },
  props: {
    isQuestion: {
      type: Boolean,
      default: true
    },
    textSize: {
      type: String,
      default: "3em"
    },
    // Front card
    front: {
      type: String,
      default: ""
    },
    colorTextFront: {
      type: String,
      default: "black"
    },
    colorFront: {
      type: String,
      default: "white"
    },
    frontCardTitle: {
      type: String,
      default: "What is the currency of"
    },
    frontCardFooter: {
      type: String,
      default: "Click to show answer"
    },
    //Back card
    back: {
      type: String,
      default: ""
    },
    colorTextBack: {
      type: String,
      default: "white"
    },
    colorBack: {
      type: String,
      default: "#8E44AD"
    },
    backCardTitle: {
      type: String,
      default: "Answer"
    },
    backCardFooter: {
      type: String,
      default: "Click to review question"
    }
  }
};
</script>
<style scoped>
.flashcards {
  margin: 0 auto;
}

.flashcard {
  cursor: pointer;
  border-radius: 10px;
  width: 70%;
  margin: auto;
  padding: 50px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.3);
}

.flashcard::before {
  border-radius: 10px;
  content: " ";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  box-shadow: 0 0px 7px rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 500ms;
}

.flashcard:hover::before {
  opacity: 1;
}

.animation {
  animation-duration: 1.5s;
  animation-fill-mode: both;
}

@keyframes flip3D {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }
  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }
  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }
  to {
    transform: perspective(400px);
  }
}

.flip3D {
  backface-visibility: visible !important;
  animation-name: flip3D;
}
</style>
