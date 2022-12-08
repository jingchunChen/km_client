<template>
    <el-button size="small" circle class="revert" @click="$router.back()">
        <i class="el-icon-back"></i>
    </el-button>
</template>

<script>
    export default {
        name: "Revert"
    }
</script>

<style scoped>
    .revert {
        position: fixed;
        top: 20px;
        left: 20px;
        font-size: 22px;
    }
</style>
