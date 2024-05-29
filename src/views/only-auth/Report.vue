<script>
import Wrapper from "../../components/ui/Wrapper.vue";
import { RouterLink } from "vue-router";
import Button from "../../components/ui/Button.vue";
import reportService from "../../service/report-service/report-service";
import orderService from "../../service/order-service/order.service";
import protocolService from "../../service/protocol-service/protocol.service";
import { errorCatch } from "../../api/api.helpers";
import { toast } from "vue3-toastify";
let selected = 0;

export default {
  components: {
    Wrapper,
    Button,
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      selected,
      report: {
        title: {
          company: "",
          subCompany: "",
          object: "",
          addressObject: "",
					dateLicense: this.dateLicense,
          dateOverLicense: this.dateOverLicense,
        },
      },
      order: {},
      protocol: {
        columns: [],
        rows: [],
      },
    };
  },
  methods: {
    setSelected(i) {
      this.selected = i;
    },
    async getData() {
      try {
        const res = await reportService.getById(this.$route.params.id);
        console.log(res.report);
        this.report = res.report;
        const res2 = await orderService.getById(this.report.orderId);
        this.order = res2.order;
      } catch (error) {
        console.log(error);
      }
    },
    async getProtocol() {
      try {
        const res = await protocolService.getById(
          this.report.protocols[this.selected - 1]._id
        );
        this.protocol = res.protocol;
      } catch (error) {
        console.log(error);
      }
    },
    async saveChange() {
      try {
        const res = await protocolService.updateProtocol({
          id: this.report.protocols[this.selected - 1]._id,
          columns: this.protocol.columns,
          rows: this.protocol.rows,
        });
        toast.success(res.message);
      } catch (error) {
        toast.error(errorCatch(error));
        console.log(error);
      }
    },
    async generateTable() {
      try {
        const res = await protocolService.generateTable({
          id: this.report.protocols[this.selected - 1]._id,
        });
        toast.success(res.message);
      } catch (error) {
        toast.error(errorCatch(error));
        console.log(error);
      }
    },
    formatDate(dateString) {
      if (!dateString) return "";
      const datePart = dateString.split("T")[0];
      const [year, month, day] = datePart.split("-");
      return `${day}.${month}.${year}`;
    },
    changeRowCol(i, itemsIndex, value, arr) {
      const newArr = [];
      for (let j = 0; j < arr.length; j++) {
        if (i == j) newArr.push(value);
        else newArr.push(arr[j]);
      }
      this.protocol.rows[itemsIndex] = newArr;
    },
  },
};
</script>

<template>
  <Wrapper>
    <div class="content">
      <div class="header">
        <div class="items">
          <div
            :class="{ 'header-item': true, active: 0 === selected }"
            @click="() => setSelected(0)"
          >
            Общая
          </div>
          <div
            :class="{ 'header-item': true, active: index + 1 === selected }"
            @click="
              () => {
                setSelected(index + 1);
                getProtocol();
              }
            "
            v-for="(i, index) in report.protocols"
          >
            ПРОТОКОЛ № {{ index + 1 }}
          </div>
          <RouterLink
            :to="`/d/new-protocol/${report._id}`"
            :class="{ 'header-item': true }"
            >Добавить</RouterLink
          >
        </div>
        <div v-if="selected" class="save">
          <Button :click="saveChange">Сохранить</Button>
          <Button :click="generateTable">Создать файл</Button>
        </div>
      </div>
      <div class="basic-info" v-if="selected === 0">
        <div class="title">Основная информация</div>
        <div class="list">
          <div>Отчет название и номер - {{ report.name }}</div>
          <div>Дата - {{ formatDate(report.date) }}</div>
          <div>ФИО заказчика - {{ order.fullName }}</div>
          <div>Адресс заказчика - {{ order.address }}</div>
          <div>Компания(Титул) - {{ report.title.company }}</div>
          <div>Подкомпания(Титул) - {{ report.title.subCompany }}</div>
          <div>Обьект(Титул) - {{ report.title.object }}</div>
          <div>Адресс обьект(Титул) - {{ report.title.addressObject }}</div>
					<div>Дата регистрации лицензии - {{ report.title.dateLicense }}</div>
          <div>Дата окончания лицензии - {{ report.title.dateOverLicense }}</div>
        </div>
      </div>
      <div class="table" v-if="selected > 0">
        <div class="row">
          <textarea
            disabled
            class="col"
            v-for="col in protocol.columns"
            :value="col"
          />
        </div>
        <div class="row" v-for="(row, j) in protocol.rows">
          <textarea
            @change="(e) => changeRowCol(i, j, e.target.value, row)"
            class="col"
            v-for="(col, i) in row"
            :value="col"
          />
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
  .header {
    width: 100%;
    // overflow-x: scroll;
    .items {
      display: flex;
      width: 100%;
      overflow-x: scroll;
      scrollbar-width: none;
      @media (max-width: 600px) {
        width: 600px;
        max-width: 100%;
      }
    }
    .items::-webkit-scrollbar {
      width: 0;
      display: none;
    }
    .items::-ms-scrollbar {
      display: none;
    }
    .header-item {
      padding: 5px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2px;
      border-right: 2px solid #858585;
      color: #000;
      text-decoration: none;
      white-space: nowrap;
      cursor: pointer;
    }
    .header-item:first-child {
      padding-left: 0;
    }
    .header-item:last-child {
      border-right: none;
    }
    .active {
      font-weight: bold;
    }
    .save {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
      button {
        width: 200px;
      }
    }
  }
  .basic-info {
    width: 100%;
    .title {
      font-size: 35px;
    }
    .list {
      margin-top: 20px;
      border: 2px solid #858585;
      background-color: #fff;
      border-radius: 20px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      div {
        font-size: 20px;
      }
    }
  }
  .table {
    width: 100%;
    .row {
      width: 100%;
      border: 2px solid #858585;
      border-bottom: none;
      display: flex;
      overflow-x: scroll;
      scrollbar-width: none;
      .col {
        text-align: center;
        height: 100px;
        flex-grow: 1;
        border-right: 2px solid #858585;
        background-color: #fff;
        outline: none;
        font-size: 20px;
      }
      .col:last-child {
        border-right: none;
      }
    }
    .row:last-child {
      border-bottom: 2px solid #858585;
    }
    .row::-webkit-scrollbar {
      width: 0;
      display: none;
    }
    .row::-ms-scrollbar {
      display: none;
    }
  }
}
</style>
