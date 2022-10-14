import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateUserValidator from 'App/Validators/CreateUserValidator'
import User from 'App/Models/User';

export default class UsersController {
    public async index({ auth, response, request }: HttpContextContract){
        await auth.use('api').authenticate()

        let userName = request.qs().username
        if (!userName) {
            let users = await User.query().preload('activity')
            return response.ok({ users })
        } else {
            let userFiltered = await User.query().preload('activity').where('username', userName)
            return response.ok({ userFiltered })
        }
    }

    public async store({ auth, request, response }: HttpContextContract){
        await auth.use('api').authenticate()

        try {
            await request.validate(CreateUserValidator);
            const newUser = new User()
            newUser.username = request.input('username')
            newUser.nik = request.input('nik')
            newUser.password = request.input('password')
            newUser.fullName = request.input('fullName')
            newUser.phoneNumber = request.input('phoneNumber')
            newUser.address = request.input('address')
            newUser.village = request.input('village')
            newUser.subdistrict = request.input('subdistrict')
            newUser.city = request.input('city')
            newUser.count = request.input('count')
            if ( newUser.count == null || "" ) {
                newUser.count = "0"
            }
            newUser.about = request.input('about')
            newUser.authority = request.input('authority')
            if (newUser.authority == null || ""){
                newUser.authority = "Member"
            }

            const user = await newUser.save()

            return response.created({ message: 'Success to create new user!', users: user.fullName})
        } catch (error) {
            return response.unprocessableEntity({ message: error.messages })
        }
    }

    public async show({ auth, params, response }: HttpContextContract){
        await auth.use('api').authenticate()
        const username = params.id
        const userFiltered = await User.query().preload('activity').where('username', username)
        return response.ok({ userFiltered })
    }

    public async update({ auth, params, request, response }: HttpContextContract){
        await auth.use('api').authenticate()
        const username = params.id
        const userFiltered = await User.findByOrFail('username', username)
        userFiltered.username = request.input('username')
        userFiltered.nik = request.input('nik')
        userFiltered.password = request.input('password')
        userFiltered.fullName = request.input('fullName')
        userFiltered.phoneNumber = request.input('phoneNumber')
        userFiltered.address = request.input('address')
        userFiltered.village = request.input('village')
        userFiltered.subdistrict = request.input('subdistrict')
        userFiltered.city = request.input('city')
        let userCount = parseFloat(userFiltered.count)
        userFiltered.count = String(userCount + parseFloat(request.input('count')))
        userFiltered.about = request.input('about')

        const newUserData = await userFiltered.save()
        return response.ok({ newUserData })
    }

    public async destroy({ auth, params, response }: HttpContextContract){
        await auth.use('api').authenticate()
        const username = params.id
        const users = await User.findByOrFail('username', username)
        await users.delete()
        return response.ok({ message: 'Succes delet user!' })
    }

    public async register({ request, response }: HttpContextContract){
        try {
            await request.validate(CreateUserValidator);
            const newUser = new User()
            newUser.username = request.input('username')
            newUser.nik = request.input('nik')
            newUser.password = request.input('password')
            newUser.fullName = request.input('fullName')
            newUser.phoneNumber = request.input('phoneNumber')
            newUser.address = request.input('address')
            newUser.village = request.input('village')
            newUser.subdistrict = request.input('subdistrict')
            newUser.city = request.input('city')
            newUser.count = request.input('count')
            if ( newUser.count == null || "" ) {
                newUser.count = "0"
            }
            newUser.about = request.input('about')
            newUser.authority = request.input('authority')
            if (newUser.authority == null || ""){
                newUser.authority = "Member"
            }

            const user = await newUser.save()
            return response.created({ message: 'Success to register new User!', users: user.fullName})
        } catch (error) {
            return response.unprocessableEntity({ message: error.messages })
        }
    }

    public async login({ auth, response, request }: HttpContextContract){
        const username = request.input('username')
        const password = request.input('password')

        try {
            const token = await auth.use('api').attempt(username, password)
            return response.ok({ token: token })
        } catch (error) {
            return response.unauthorized({ message: error.messages })
        }
    }

    public async logout({ auth }: HttpContextContract){
        await auth.use('api').revoke()
        return {
            revoked: true
        }
    }

    public async landing({ response }: HttpContextContract) {
        const user = await User.all()
        const userLength = user.length
        return response.ok({ users: userLength })
    }

    public async userLogin({ auth, response }: HttpContextContract) {
        const user = await auth.use('api').authenticate()
        const userData = await User.query().preload('activity').where('id', user.id)

        return response.ok({ user: userData })
    }
}
