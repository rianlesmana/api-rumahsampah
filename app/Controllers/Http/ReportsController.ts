import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Report from 'App/Models/Report'

export default class ReportsController {
    public async index({ request, response }: HttpContextContract) {
        const filter = request.qs().id

        if (!filter) {
            const report = await Report.all()
            return response.ok({ allReport: report })
        } else {
            const reportFiltered = await Report.find(filter)
            return response.ok({ reportFiltered: reportFiltered })
        }

    }

    public async store({ request, response }: HttpContextContract) {
        const report = new Report()
        report.name = request.input('name')
        report.report = request.input('report')
        const newReport = await report.save()

        return response.created({ message: 'Success create new report!', newReport })
    }

    public async show({ params, response }: HttpContextContract) {
        const Id = params.id
        const reportFiltered = await Report.find(Id)
        return response.ok({ reportFiltered })
    }

    public async update({ params, response, request }: HttpContextContract) {
        const Id = params.id
        const reportFiltered = await Report.findOrFail(Id)
        reportFiltered.name = request.input('name')
        reportFiltered.report = request.input('report')
        const newReport = await reportFiltered.save()
        return response.ok({ message: 'Success edit report!', newReport })
    }

    public async destroy({ params, response }: HttpContextContract) {
        const Id = params.id
        const reportFiltered = await Report.findOrFail(Id)
        reportFiltered.delete()
        return response.ok({ message: 'Success delete report!' })
    }
}
