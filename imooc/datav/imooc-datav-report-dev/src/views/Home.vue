<template>
  <div class="home">
    <top-view />
    <sales-view />
    <bottom-view />
    <map-view />
  </div>
</template>

<script>
import TopView from "../components/TopView";
import SalesView from "../components/SalesView";
import BottomView from "../components/BottomView";
import MapView from "../components/MapView";
import { wordcloud, screenData, mapScatter } from "../api";
import axios from "axios";

export default {
  name: "Home",
  components: {
    TopView,
    SalesView,
    BottomView,
    MapView,
  },
  data() {
    return {
      reportData: null,
      wordCloud: null,
      mapData: null,
    };
  },
  methods: {
    
    getReportData() {
      return this.reportData;
    },
    getWordCloud() {
      return this.wordCloud;
    },
    getMapData() {
      return this.mapData;
    },
  },
  provide() {
    return {
      // 直接传值的话，会在子组件接收不到。传的是一个函数
      getReportData: this.getReportData,
      getWordCloud: this.getWordCloud,
      getMapData: this.getMapData,
    };
  },
  mounted() {
    axios({
      method: "get",
      url: "./wordcloud.json",
    }).then((data) => {
      this.wordCloud = data.data;
    });
    axios({
      method: "get",
      url: "./scatter.json",
    }).then((data) => {
      this.mapData = data.data;
    });
    axios({
      method: "get",
      url: "./data.json",
    }).then((data) => {
      this.reportData = data.data;
    });
    // screenData().then(data => { this.reportData = data })
    // wordcloud().then(data => { this.wordCloud = data })
    // mapScatter().then(data => { this.mapData = data })
  },
};
</script>

<style>
.home {
  width: 100%;
  padding: 20px;
  background: #eee;
  box-sizing: border-box;
}
</style>
