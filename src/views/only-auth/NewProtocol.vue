<script>
// Страница для создания нового протокола
// Импорт компонента Wrapper из соответствующего файла
import Wrapper from "../../components/ui/Wrapper.vue";
// Импорт компонента Button из соответствующего файла
import Button from "../../components/ui/Button.vue";

export default {
  // Регистрация компонентов в локальном компоненте
  components: {
    Wrapper,
    Button,
  },

  // Определение данных компонента
  data() {
    return {
      countCol: "", // Количество столбцов
      countRow: "", // Количество строк
      columns: [], // Столбцы таблицы
      rows: [], // Строки таблицы
      metaRow: "", // Метаданные по строкам
      metaCol: "", // Метаданные по столбцам
      metaArray: [], // Массив метаданных
      title: "", // Название протокола
      goal: "", // Цель протокола
      description: "", // Описание протокола
      result: "", // Заключение
    };
  },

  // Определение методов компонента
  methods: {
    // Метод для наблюдения за изменениями названий столбцов
    watch: {
      columnsNames: function (newVal) {
        this.range(newVal);
        this.rangesFullTable(this.countRow);
      },
      countRow: function (newVal) {
        this.rangesFullTable(newVal);
      },
      metaCol: function (e) {
        this.rangesMeta({ e, v: "col" });
      },
      metaRow: function (e) {
        this.rangesMeta({ e, v: "row" });
      },
    },
    // Метод для создания диапазона значений столбцов
    range(e) {
      if (!e.target.value > 50) return;
      this.countCol = e.target.value;
      return (this.columns = Array.from(
        { length: this.countCol },
        (v, k) => k
      ));
    },
    // Метод для создания диапазона значений строк
    rangesFullTable(e) {
      if (!e.target.value > 50) return;
      this.countRow = e.target.value;
      const col = Array.from({ length: this.countCol }, (v, k) => k);
      const row = [];
      for (let i = 1; i <= this.countRow; i++) {
        row.push(col);
      }
      return (this.rows = row);
    },
    // Метод для создания диапазона метаданных
    rangesMeta({ e, v }) {
      if (this.metaRow > 12 && this.metaCol > 5) return;
      if (v == "row") this.metaRow = e.target.value;
      else this.metaCol = e.target.value;
      const col = Array.from({ length: this.metaCol }, (v, k) => k);
      const row = [];
      for (let i = 1; i <= this.metaRow; i++) {
        row.push(col);
      }
      return (this.metaArray = row);
    },
    // Метод для изменения столбца
    changeCol(i, value, arr) {
      const newArr = [];
      for (let j = 0; j < arr.length; j++) {
        if (i == j) newArr.push(value);
        else newArr.push(arr[j]);
      }
      this.columns = newArr;
    },

    // Метод для изменения строки и столбца
    changeRowCol(i, itemsIndex, value, arr) {
      const newArr = [];
      for (let j = 0; j < arr.length; j++) {
        if (i == j) newArr.push(value);
        else newArr.push(arr[j]);
      }
      this.rows[itemsIndex] = newArr;
    },
    // Метод для изменения метаданных по столбцам
    changeMetaCol(i, itemsIndex, value, arr) {
      const newArr = [];
      for (let j = 0; j < arr.length; j++) {
        if (i == j) newArr.push(value);
        else newArr.push(arr[j]);
      }
      this.metaArray[itemsIndex] = newArr;
    },
    // Метод для создания протокола
    async createProtocol() {
      try {
        // Вызов метода createProtocol для создания протокола
        const res = await protocolService.createProtocol({
          reportId: this.$route.params.reportId,
          columns: this.columns,
          rows: this.rows,
          methodology: this.metaArray,
          title: this.title,
          goal: this.goal,
          description: this.description,
          result: this.result
        });
        // Вывод сообщения об успешном создании протокола
        toast.success(res.message);
        // Перенаправление на страницу с отчетами
        this.$router.push('/d/reports')
      } catch (error) {
        // Вывод сообщения об ошибке
        toast.error(errorCatch(error));
      }
    },
  },
};
</script>

<template>
  <!-- Обертка для контента -->
  <Wrapper>
    <!-- Основное содержимое -->
    <div class="content">
      <!-- Заголовок и кнопка для создания протокола -->
      <div class="header">
        <h1>Новый протокол</h1>
        <Button :click="createProtocol">Создать</Button>
      </div>
      <!-- Поля ввода для названия, цели, описания и результата протокола -->
      <input
        v-model="title"
        placeholder="Название и номер протокола"
        class="form-input"
      />
      <input v-model="goal" placeholder="Цель протокола" class="form-input" />
      <textarea
        placeholder="Описание протокола"
        v-model="description"
        class="form-input"
      ></textarea>
      <input v-model="result" placeholder="Заключение" class="form-input" />
      <!-- Поля для ввода метаданных -->
      <div class="meta-input">
        <input
          :value="metaCol"
          @change="
            (e) =>
              rangesMeta({
                e: e,
                v: 'col',
              })
          "
          type="number"
          placeholder="Количество столбцов для методологии"
          class="form-input"
        />
        <input
          :value="metaRow"
          @change="
            (e) =>
              rangesMeta({
                e: e,
                v: 'row',
              })
          "
          type="number"
          placeholder="Количество строк для методологии"
          class="form-input"
        />
      </div>
      <!-- Таблица для отображения метаданных -->
      <div class="table">
        <div class="row" v-for="(items, i) in metaArray" :key="i">
          <textarea
            class="col"
            v-for="(name, index) in items"
            :value="name"
            @change="(e) => changeMetaCol(index, i, e.target.value, items)"
            :key="index"
          ></textarea>
        </div>
      </div>
      <!-- Поля для ввода количества столбцов и строк -->
      <input
        :value="countCol"
        type="number"
        @change="(e) => range(e)"
        placeholder="Количество столбцов"
        class="form-input"
      />
      <div class="table">
        <div class="row">
          <textarea
            class="col"
            v-for="(name, index) in columns"
            :value="name"
            @change="(e) => changeCol(index, e.target.value, columns)"
            :key="index"
          ></textarea>
        </div>
      </div>
      <input
        :value="countRow"
        type="number"
        @change="(e) => rangesFullTable(e)"
        placeholder="Количество Строк"
        class="form-input"
      />
      <div class="table">
        <div class="row" v-for="(items, i) in rows" :key="i">
          <textarea
            class="col"
            v-for="(name, index) in items"
            :value="name"
            @change="(e) => changeRowCol(index, i, e.target.value, items)"
            :key="index"
          ></textarea>
        </div>
      </div>
    </div>
  </Wrapper>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 10px;
  width: 100%;
  height: 80vh;
  overflow-y: scroll;
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  @media (max-width: 600px) {
    padding: 5px;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    button {
      width: 200px;
    }
    h1 {
      margin-top: 0;
    }
  }
  .form-input {
    margin-top: 20px;
    width: 100%;
    outline: none;
    border: none;
    background-color: #f2f2f2;
    padding: 15px 22px;
    font-size: 18px;
    border-radius: 10px;
    color: #000;
    box-sizing: border-box;
  }
  .meta-input {
    display: flex;
    gap: 20px;
  }
  .table {
    margin-top: 20px;
    width: 100%;
    .row {
      width: 100%;
      border: 2px solid #858585;
      border-bottom: none;
      display: flex;
      overflow-x: scroll;	
      scrollbar-width: none;
      .col {
        display: flex;
        text-align: center;
        height: 50px;
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
