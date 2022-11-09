<template>
    <div class="citem" @click="clickItem(parentObj)">
        <div class="citem-left">
            <img :src="imgurl">
        </div>
        <div class="citem-right">
            <!-- <div>Number: {{parentObj.id}}</div> -->
            <div>Name: {{parentObj.name}} </div>
            <div>Status: jfjskjdf </div>
            <!-- <div>users: jfjskjdf </div> -->
            <div>Deadlines: 10minutes </div>
        </div>

    </div>
</template>

<script>
export default {
  props: {
    parentObj: {},
    // parentMessage: {
    //   type: String,
    //   default: '默认显示的信息'
    //   // require: true // 必填
    // },
    imgurl: {
      type: String,
      default: 'https://www.ghi888.com/wp-content/uploads/2021/05/%E6%B3%B0%E5%9B%BD%E8%B5%8C%E5%8D%9A-1200x889.jpg'
    }
  },
  methods: {
    clickItem (data) {
      console.log('child click', data)
      this.$emit('clickItemEvent', data)
    }
  }
}
</script>
<style>
.citem {
    display: flex;
    flex-direction: row;
    background-color: rgb(66, 66, 58);
    /* border: 1px solid rgb(231, 219, 219); */
    /* border: 1px solid rgb(238, 238, 17); */
    width: 530px;
    /* height: 150px; */
}

.citem-left img {
    width: 180px;
    height: 180px;
    /* border: 1px solid rgb(238, 238, 17); */
}

.citem-right {
    display: flex;
    flex-direction: column;
    color: rgb(233, 233, 218);
    margin-top: 10px;
    margin-left: 20px;
    font-size: 18px;
}

.citem-right >  div {
  margin-top: 10px;
}
</style>
