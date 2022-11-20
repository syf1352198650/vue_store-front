<template>
  <div class="title">
    <slot>
        <span>爆款推荐</span>
    </slot>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.title{
   padding:0.266666rem 0;
	width: 100%;
	text-align: center;
	font-size: 0.426666rem;
}
.title span{
	position: relative;
}
.title span::after{
	content: "";
	display: block;
	position: absolute;
	right: -0.5rem;
	top: 50%;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: #d4c0a7;
	    margin-top: -4px;
}
.title span::before{
    content:'';
    height:8px;
    width: 8px;
    position: absolute;
    background:#d4c0a7 ;
    border-radius: 50%;
    left: -0.5rem;
    top: 50%;
    margin-top: -4px;
}
</style>