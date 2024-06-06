<template>
  <!--搜索栏-->
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <!--已选标签分割线-->
  <van-divider content-position="left">已选标签</van-divider>
  <div v-if="activeIds.length === 0" @click="GetDoctor1">请选择标签</div>
  <!--tag标签-->
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag  closeable size="small" type="primary" @close="doclose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>
  <!--选择标签分割线-->
  <van-divider content-position="left">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="tagList"
      @click-item="handleDepartmentSelect"
  />
  <div style="padding: 16px">
    <!--<van-button block type="primary" @click="doSearchResult"> 搜索</van-button>-->
  </div>

</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import MyAxios from "../../config/myAxios.js";
const router =useRouter();

const searchText = ref('');

//已选中的标签
const activeIds = ref([]);
const activeIndex = ref(0);
const selectedDepartmentName = ref(null); // 科室名称引用
//标签列表
const originTagList = [{
  text: '科室',
  children: [
    { text: '皮肤科', id: '皮肤科' },
    { text: '内科', id: '内科' },
    { text: '骨科', id: '骨科' },
    { text: '儿童科', id: '儿童科' },
    // { text: '药房', id: '药房' },

  ],
}, {
  text: '医生',
  children: [
    { text: '大一', id: '大一' },
    { text: '大二', id: '大二' },
    { text: '大三', id: '大三' },
    { text: '大四', id: '大四' },
    { text: '大五', id: '大五' },
    { text: '大六', id: '大六' },
  ],
},
];
//标签列表
let tagList = ref(originTagList);
onMounted(() => {
  GetRoom()  // 页面加载时获取科室信息
  GetDoctorAll() //页面加载时获取医生信息
});
/**
 *  搜索过滤
 * @param val
 */
const onSearch = (val) => {
  tagList.value = originTagList.map(parentTag =>{
    const tempChildren =  [...parentTag.children];
    const tempParentTag =  {...parentTag};
    tempParentTag.children = tempChildren.filter(item => item.text.includes(searchText.value))
    return tempParentTag;
  })
};
/**
 * 获取科室内容
 * @returns {Promise<void>}
 * @constructor
 */
const GetRoom = async () => {
  try {
    const response = await MyAxios.get('/api/v1/department/selectAllDepartment');
    console.log(response.data.data,"这个是科室")
    const datalog=response.data.data
    tagList.value[0].children=datalog.map(item=>({text:item.departmentName,id: item.departmentName }))
  } catch (error) {
    console.error('Fetching error:', error);
  }
};
console.log(tagList.value,":11")
// 科室选择事件处理函数
const handleDepartmentSelect = async (index) => {
  // 正则表达式匹配最后一个字是否为'科'或'房'
  const regex = /(科|房)$/;

  console.log(index)
  if (regex.test(index.text)) {
    selectedDepartmentName.value = index.text; // 选择科室时，设置科室名称
    // console.log(selectedDepartmentName.value)
    await GetDoctor(); // 根据选择的科室ID获取医生信息
  }else{
    await router.push({
      path: '/index/doctorInfo',
      query: {
        tags: index.text
      }
    })
  }
};
/**
 * 获取医生内容
 * @returns {Promise<void>}
 * @constructor
 */
const GetDoctor = async () => {
  try {
    const res1 = await MyAxios.get( `/api/v1/doctor/selectDoctorInfoByDepartment/${selectedDepartmentName.value}`);
    console.log(res1.data.data,"这个是医生")
    const datalog=res1.data.data
    tagList.value[1].children=datalog.map(item=>({text:item.doctorName,id: item.doctorName }))
  } catch (error) {
    console.error('Fetching error:', error);
  }
};
// const doSearchResult=()=>{
//   router.push({
//     path:'/index/doctorInfo',
//     query:{
//       tags:activeIds.value
//     }
//   })
//   console.log(activeIds.value)
// }
/**
 * 取消  清空
 */
const onCancel = () => {
  searchText.value = '';
  tagList.value = originTagList;
};

/**
 * 关闭标签
 */
const  doclose = (tag) =>{
  activeIds.value = activeIds.value.filter(item =>{
    return item !== tag;
  })

}
/**
 * 获取医生内容
 * @returns {Promise<void>}
 * @constructor
 */
const GetDoctorAll = async () => {
  try {
    const res1 = await MyAxios.get( '/api/v1/doctor/selectAllDoctorInfo');
    // console.log(res1.data.data,"这个是医生")
    const datalog=res1.data.data
    tagList.value[1].children=datalog.map(item=>({text:item.doctorName,id: item.doctorName }))
  } catch (error) {
    console.error('Fetching error:', error);
  }
};
</script>

<style scoped>

</style>