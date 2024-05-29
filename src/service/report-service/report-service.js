// Импорт функции accessApi из модуля axios.api
import { accessApi } from '../../api/axios.api'

// Определение объекта reportService
const reportService = {
  // Метод для получения всех отчетов
	async getReports() {
    // Выполнение GET-запроса к конечной точке '/report/all'
		const { data } = await accessApi.get('/report/all')
    // Возвращение полученных данных
		return data
	},

  // Метод для получения отчета по его идентификатору
	async getById(id){
    // Выполнение GET-запроса к конечной точке '/report/by-id/:id'
		const { data } = await accessApi.get(`/report/by-id/${id}`)
    // Возвращение полученных данных
		return data
	},

  // Метод для создания нового отчета
	async createReport(p) {
    // Выполнение POST-запроса к конечной точке '/report/create' с переданными данными
		const { data } = await accessApi.post("/report/create", p);
    // Возвращение данных ответа
		return data
	}, 

  // Метод для обновления существующего отчета
	async updateReport(p) {
    // Выполнение PUT-запроса к конечной точке '/report/update/:id' с переданными данными
		const { data } = await accessApi.put(`/report/update/${p.id}`, p);
    // Возвращение данных ответа
		return data
	}, 

  // Метод для удаления отчета по его идентификатору
	async deleteReport(id) {
    // Выполнение DELETE-запроса к конечной точке '/report/delete/:id' для удаления отчета
		const { data } = await accessApi.delete(`/report/delete/${id}`);
    // Возвращение данных ответа
		return data
	}
}

// Экспорт объекта reportService для использования в других модулях
export default reportService
