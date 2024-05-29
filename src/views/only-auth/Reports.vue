<script>
import Wrapper from "../../components/ui/Wrapper.vue";
import reportService from "../../service/report-service/report-service";
import { RouterLink } from "vue-router";
import { toast } from "vue3-toastify";
import { errorCatch } from "../../api/api.helpers";
export default {
  components: {
    Wrapper,
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      data: [],
    };
  },

  methods: {
    async getData() {
      try {
        const res = await reportService.getReports();
        this.data = res.reports;
      } catch (e) {
        console.log(e);
      }
    },
    async deleteReport(id) {
      try {
        const res = await reportService.deleteReport(id);
        toast.success(res.message);
        this.getData();
      } catch (e) {
        console.log(e);
        toast.error(errorCatch(e));
      }
    },
  },
};
</script>

<template>
  <Wrapper>
    <div :class="{ content: true, empty: !data.length }">
      <div v-if="!data.length">Отчетов пока нет</div>
      <div class="order" v-for="(item, index) in data">
        <RouterLink :to="`/d/reports/${item._id}`"
          >{{ item.name }}</RouterLink
        >
        <div class="buttons">
          <RouterLink :to="`/d/reports/edit/${item._id}`">edit</RouterLink>
          <p @click="() => deleteReport(item._id)">remove</p>
        </div>
      </div>
    </div>
  </Wrapper>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  .order {
    width: 100%;
    height: 50px;
    border-radius: 20px;
    background-color: #fff;
    padding: 5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // box-sizing: border-box;
    font-size: 20px;
    cursor: pointer;
    font-weight: 500;
    transition: box-shadow 0.5s;
    p {
      text-decoration: none;
      color: #000;
    }
    .buttons {
      display: flex;
      align-items: center;
      gap: 10px;
      p {
        padding: 3px 5px;
        border-radius: 10px;
        transition: background-color 0.3s;
      }
      p:hover {
        background-color: #cbcbcb8d;
      }
    }
  }
  .order:hover {
    box-shadow: 0 10px 20px #e7e7e7;
  }
}
.empty {
	height: 80vh;
  align-items: center;
	font-size: 30px;
}
</style>
