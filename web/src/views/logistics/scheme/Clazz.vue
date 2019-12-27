<template>
  <div class="pack_clazz">
    <div v-if="classObj.childCatas.length > 0">
      <div
        v-for="(clazz, index) in classInfo.childCatas"
        :style="{ 'margin-top': index > 0 ? '30px' : '0' }"
        :ref="clazz.catId"
        :key="clazz.catId">
        <row-title
          style="margin-bottom: 32px; margin-left: -12px;"
          :cnFontSize="18"
          :underlineGap="10"
          :title-cn="clazz.catName"
          :title-en="clazz.titleEn"></row-title>

        <div class="class-flex-container title-class-gap">
          <ClassCard
            @goodsClick="handleGoodClick(good)"
            v-for="(good, index) in clazz.goods"
            :style="{ marginRight: index % 4 === 3 ? '0' : '18px', marginTop: index < 4 ? '0' : '18px'}"
            :key="good.id"
            :good="good">
          </ClassCard>
        </div>
      </div>

    </div>

    <div v-if="classInfo.childCatas === undefined || classInfo.childCatas.length === 0" style="height: 60vh; width: 100%; margin-top: 12px; background-color: white;">
      <div style="height: 60vh;" class="center-column-flex-container">
        <img src="../../../assets/scheme/bg_empty.png" alt="暂时没有方案">
        <span class="empty-text">暂时没有方案</span>
      </div>
    </div>
  </div>
</template>

<script>
  import RowTitle from '../../../components/RowTitle'
  import ClassCard from '../../../components/ClassCard'

  export default {
    components: {
      RowTitle,
      ClassCard
    },
    name: 'Clazz',
    computed: {
      classObj() {
        let c = this.$store.state.menu.find(clazz => clazz.catId === this.classId)
        return c ? c : {childCatas: []};
      }
    },
    data() {
      return {
        classId: '',
        childrenId: '',
        classInfo: {
          childCatas: []
        }
      }
    },
    beforeRouteUpdate(to, from, next) {
      // just use `this`
      console.log('Clazz beforeRouteUpdate: ', 'from: ', from)
      console.info('Clazz beforeRouteUpdate: ', 'to.params: ', to.params)
      this.getRouteData(to.params)
      next()
    },
    created() {
      // console.log('Clazz created', this.classInfo)
      this.getRouteData(this.$route.params)
    },
    methods: {
      getRouteData(params) {
        // this.classId = this.$route.params.id
        console.log('params: ', params)
        // if (params.childrenId) {
        //   console.log('childrenId: ', params.childrenId)
        // }
        this.classId = params.id
        this.childrenId = params.childrenId
        console.log('childrenId: ', this.childrenId)

        if (this.$store.state.menu) {
          console.table('class: ', this.$store.state.menu)
          this.classInfo = Object.assign({}, this.$store.state.menu.find(clazz => clazz.catId === this.classId))
          console.table('classInfo: ', this.classInfo)


          this.$nextTick(() => {
            // document.documentElement.scrollTop = 300

            if (this.$refs[this.childrenId]) {
              const classDiv = this.$refs[this.childrenId][0]
              console.log('refs: ', this.$refs[this.childrenId])
              console.log('classDiv: ', classDiv)
              console.log('classDiv.offsetTop: ', classDiv.offsetTop)
              // documentElement.scrollTop = classDiv.offsetTop - 34
              // scrollTo(0, classDiv.offsetTop - 34)
              setTimeout(() => document.documentElement.scrollTop = classDiv.offsetTop - 80, 0)
              // document.documentElement.scrollTop = classDiv.offsetTop - 34
              // classDiv.scrollIntoViewIfNeeded()
            }
          })
        }
        // console.log('Clazz classInfo: ', this.classInfo)
      },

      handleGoodClick(good) {
        console.log('good: ', good)
        this.$router.push(
          {
            name: 'PackGood',
            params: {
              goodId: good.id,
              name: good.name
            }
          }
        )
      }
    }
  }
</script>

<style scoped>
  .class-flex-container {
    display: flex;
    flex-wrap: wrap;
  }

  .title-class-gap {
    margin-top: 20px;
  }

  .empty-text {
    font: 24px 'Microsoft YaHei';
    color: rgba(0, 0, 0, 0.2);
  }
</style>
