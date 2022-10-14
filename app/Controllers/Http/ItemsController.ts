import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Item from 'App/Models/Item'

export default class ItemsController {
    public async index({ auth, response, request }: HttpContextContract) {
        await auth.use('api').authenticate()
        const itemFilter = request.qs().itemName
        if (!itemFilter) {
            const items = await Item.all()
            return response.ok({ items })
        } else {
            const itemsFilter = await Item.findBy('itemName', itemFilter)
            return response.ok({ itemsFilter })
        }
    }

    public async store({ auth, request, response }: HttpContextContract) {
        await auth.use('api').authenticate()
        const items = new Item()
        items.itemName = request.input('itemName')
        items.itemPrice = request.input('itemPrice')
        const newItem = await items.save()
        return response.ok({ newItem })
    }

    public async show({ auth, response, params }: HttpContextContract) {
        await auth.use('api').authenticate()
        const id = params.id 
        const itemFiltered = await Item.find(id)
        return response.ok({ itemFiltered })
    }

    public async update({ auth, params, request, response }: HttpContextContract) {
        await auth.use('api').authenticate()
        const id = params.id
        const itemFiltered = await Item.findOrFail(id)
        itemFiltered.itemName = request.input('itemName')
        itemFiltered.itemPrice = request.input('itemPrice')
        const newItem = await itemFiltered.save()
        return response.ok({ newItem })
    }

    public async destroy({ auth, params, response }: HttpContextContract) {
        await auth.use('api').authenticate()
        const id = params.id
        const itemFiltered = await Item.findOrFail(id)
        await itemFiltered.delete()
        return response.ok({ message: 'Succes to delete item!' })
    }
}
