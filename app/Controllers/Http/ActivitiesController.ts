import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Activity from 'App/Models/Activity'

export default class ActivitiesController {
    public async index({ auth, request, response }: HttpContextContract) {
        await auth.use('api').authenticate()

        let filter = request.qs().id
        if(!filter) {
            const activity = await Activity.all()
            return response.ok({ activity })
        } else {
            let activityFiltered = await Activity.find(filter)
            return response.ok({ activityFiltered })
        }
    }

    public async store({ auth, request, response }: HttpContextContract) {
        const user = await auth.use('api').authenticate()
        let activity = new Activity()
        activity.itemName = request.input('itemName')
        activity.unit = request.input('unit')
        activity.price = request.input('price')
        activity.totalPrice = activity.unit * activity.price
        activity.userId = user.id

        const newActivity = await activity.save()
        return response.created({ message: 'Success add new activity', activity: newActivity })
    }

    public async show({ auth, params, response }: HttpContextContract) {
        await auth.use('api').authenticate()
        const Id = params.id
        const ActivityFiltered = await Activity.find(Id)

        return response.ok({ ActivityFiltered })
    }

    public async update({ auth, request, response, params }: HttpContextContract) {
        const user = await auth.use('api').authenticate()
        const Id = params.id
        let activity = await Activity.findOrFail(Id)
        activity.itemName = request.input('itemName')
        activity.unit = request.input('unit')
        activity.price = request.input('price')
        activity.totalPrice = activity.unit * activity.price
        activity.userId = user.id

        const newActivity = await activity.save()
        return response.created({ newActivity })
    }

    public async destroy({ auth, response, params }: HttpContextContract) {
        await auth.use('api').authenticate()
        const Id = params.id
        const activity = await Activity.findOrFail(Id)
        await activity.delete()
        return response.ok({ message: "Succes delete activity!" })
    }
}
