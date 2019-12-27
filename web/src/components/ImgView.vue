<template>
  <div class="imgMask">
    <img class="prev" src="../assets/demand/arrow_left_hover.png" @click="changeImage(1)"
         v-if="showIndex>0">
    <img class="prev" src="../assets/demand/arrow_left.png" v-else>
    <div class="showImg" @click="closeImgView">
      <img class="close" src="../assets/demand/picture_close.png" @click="closeImgView"
           v-if="showIndex>=0">
      <img class="bigImg" :src="showImgList[showIndex]" style="cursor: pointer">
      <div class="imgPage" v-if="showFormImgList.length>1">
        <a class="image-unchecked" :class="{ 'image-checked': showIndex == index }" @click.stop="switchImage(index)" v-for="(item,index) in showFormImgList" :key="index" ></a>
      </div>
    </div>
    <img class="next" src="../assets/demand/arrow_right_hover.png" @click="changeImage(2)"
         v-if="showIndex < showImgList.length-1">
    <img class="next" src="../assets/demand/arrow_right.png" v-else>
  </div>
</template>

<script>
  export default {
    name: "ImgView",
    props: [ 'index', 'imgList', 'formImgList', 'imageVisible' ],
    data(){
      return {
        showIndex: this.index,
        showImgList: this.imgList,
        showFormImgList: this.formImgList,
        imgVisible: this.imageVisible
      }
    },
    methods: {
      changeImage(type) {
        switch (type) {
          case 1://左移
            this.showIndex--
            break
          case 2://右移
            this.showIndex++
            break
        }
      },
      switchImage(index) {
        this.showIndex = index
      },
      closeImgView() {
        this.imgVisible = false
        this.$emit('childByValue', this.imgVisible)
        console.log(this.imgVisible)
      }
    }
  }
</script>

<style scoped>
  .imgMask {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: auto !important;
  }
  .showImg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 20px;
  }
  .bigImg {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
  .prev {
    position: absolute;
    cursor: pointer;
    top: 50%;
    left: 100px;
    width: 60px;
    height: 60px;
    transform: translate(10px, -50%);
    -ms-transform: translate(10px, -50%); /* IE 9 */
    -moz-transform: translate(10px, -50%); /* Firefox */
    -webkit-transform: translate(10px, -50%); /* Safari 和 Chrome */
    -o-transform: translate(10px, -50%);
  }
  .next {
    position: absolute;
    cursor: pointer;
    top: 50%;
    right: 120px;
    width: 60px;
    height: 60px;
    transform: translate(10px, -50%);
    -ms-transform: translate(10px, -50%); /* IE 9 */
    -moz-transform: translate(10px, -50%); /* Firefox */
    -webkit-transform: translate(10px, -50%); /* Safari 和 Chrome */
    -o-transform: translate(10px, -50%);
  }
  .close {
    cursor: pointer;
    position: absolute;
    right: -20px;
    top: -20px;
    width: 40px;
    border-radius: 20px;
    box-shadow: 0 4px 15.04px 0.96px rgba(43, 199, 198, 0.72);
  }
  .imgPage {
    margin-top: 30px;
    margin-bottom: 16px;
    text-align: center;
  }
  .image-unchecked {
    height: 8px;
    width: 10px;
    display: inline-block;
    margin-right: 10px;
    background-image: url(../assets/demand/unchecked.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center center;
  }
  .image-checked {
    width: 40px;
    background-image: url(../assets/demand/checked.png);
  }
</style>