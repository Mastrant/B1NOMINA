<template>
  <div>
    <input type="checkbox" id="check" v-model="value">    
    <label for="check">Checkbox</label>
  </div>
  
</template>

<script>
export default {
    name: 'Input-checkBox',
    props: {
        userId: String,
    },
    data() {
        return {
            value: false,
        }
    },
}
</script>

<style scoped>
  
[type="checkbox"] {
  opacity: 0;
}

[type="checkbox"] + label{
  position: relative;
  padding-left: 30px;
  cursor: pointer;
  display: inline-block;
  color:#12013D;
  line-height: 25px;
}

[type="checkbox"] + label::before{
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  outline: 1px solid #CDE0f1;
  background: red;
}
</style>