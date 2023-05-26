<template>
    <div>
        <CMSHeader></CMSHeader>
        <router-view></router-view>
    </div>
</template>

<script>
import CMSHeader from '@/components/CMSHeader.vue';

export default {
    name:"CMSPage",
    components:{CMSHeader}

}
</script>